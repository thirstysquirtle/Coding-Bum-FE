<script lang="ts">
    import showModalStore from "$lib/showModalStore";
    import { onMount } from "svelte";
    import Payment from "./Payment.svelte";
    import { paymentFlowStep, paymentFlowStore } from "$lib/paymentFlowStore";
    import { redirect } from "@sveltejs/kit";

    const NAV_KEYS = new Set([
        "Backspace",
        "ArrowLeft",
        "ArrowRight",
        "Delete",
        "Redo",
        "Undo",
        "Control",
        "Shift",
    ]);
    const ALLOWED_INPUTS = new Set([
        "0",
        "1",
        "2",
        "3",
        "4",
        "5",
        "6",
        "7",
        "8",
        "9",
        ".",
    ]);

    $: if ($showModalStore) {
        $paymentFlowStore = paymentFlowStep.SetPrice;
        password = ""
    }
    $: if (donationAmount[0] !== "$") {
        donationAmount = "$";
    }
    let donationAmount = "$1.0";
    let shakeThis: Element;

    function validateDonation(e: KeyboardEvent) {
        if (e.metaKey == true && e.key == "a") {
            return;
        }
        if (e.key === "Enter") {
            return goCheckout();
        }
        const inputLength = e.target.value.length;
        if (
            !NAV_KEYS.has(e.key) &&
            inputLength >= 3 &&
            e.target.value[inputLength - 3] == "."
        ) {
            e.preventDefault();
            return;
        } else if (!ALLOWED_INPUTS.has(e.key) && !NAV_KEYS.has(e.key)) {
            e.preventDefault();
            return;
        } else if (e.target.value.includes(".") && e.key == ".") {
            e.preventDefault();
            return;
        }
    }

    let showPass = false;
    let password = "";
    let paymentId: string;
    function setPassword() {
        const url = "/api/init-password";
        const requestOptions = {
            method: "POST",
            credentials: "include",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ assword: password, paymentId: paymentId  }),
        };
        fetch(url, requestOptions)
            .then((response) => {
                if (!response.ok) {
                    throw new Error("Network response was not ok");
                }
                return response.json(); // Parse the response as JSON
            })
            .then((data) => {
                // Handle the response data here
                console.log(data);
                if (data.status == "success") {
                    // $paymentFlowStore = paymentFlowStep.SetPrice;
                    // $showModalStore = false;
                    window.location.href = "/super-cool-kids";
                    
                } else {
                    $paymentFlowStore = paymentFlowStep.Fail;
                }
            })
            .catch((error) => {
                // Handle any errors that occurred during the fetch
                console.error(
                    "There was a problem with the fetch operation:",
                    error
                );
            });
    }
    function closeModal() {
        console.log(paymentFlowStep, $paymentFlowStore);

        $showModalStore = false;
    }
    function goCheckout() {
        if (Number(donationAmount.slice(1)) >= 1)
            $paymentFlowStore = paymentFlowStep.Checkout;
        else {
            shakeThis.classList.add("shake");
            setTimeout(() => shakeThis.classList.remove("shake"), 250);
        }
    }
</script>

{#if $showModalStore}
    <!-- svelte-ignore a11y-click-events-have-key-events -->
    <!-- svelte-ignore a11y-no-static-element-interactions -->
    <div id="modal" on:click|self={closeModal}>
        <section id="content">
            {#if $paymentFlowStore == paymentFlowStep.SetPrice}
                <div class="form" id="setPrice">
                    <div>
                    <p>Very well. <br /> Your ascent now commences.</p>
                    <p>But first, how much will you pledge to the Bum?</p>
                </div>
                    <input
                    type="text"
                        bind:this={shakeThis}
                        bind:value={donationAmount}
                        on:keydown={validateDonation}
                    />
                    <button on:click={goCheckout}>Donate</button>
                </div>
            {:else if $paymentFlowStore == paymentFlowStep.Checkout}
                <Payment bind:paymentId={paymentId} price={Number(donationAmount.slice(1))} />
            {:else if $paymentFlowStore == paymentFlowStep.SetPassword}
                <div id="setPass" class="form">
                    <h2>Set Your Password</h2>
                    <p>Your account has been created.</p>
                    <input type="{showPass ? "text":"password"}"
                        on:keydown={(e) => {
                            if (e.key == "Enter") setPassword();
                            password = e.target.value;
                        }}
                    />
                    <div class="show-pass-checkbox">
                    <input bind:checked={showPass} type="checkbox" name="showPass" id="showPass">
                    <label for="showPass">show password</label>
                </div>
                    <button on:click={setPassword}>Submit</button>
                </div>
            {:else if $paymentFlowStore == paymentFlowStep.Fail}
                <h2>Something went wrong with your payment. Contact placeholder@placeholder.com</h2>
            {/if}
        </section>
    </div>
{/if}

<style lang="scss">
    .show-pass-checkbox {
        margin: 0.5ch;
        display: flex;
        align-items: center;
        gap: 1ch;
        label {
            cursor: pointer;
            user-select: none;
            padding: 0;
            margin: 0;
        }
    }
    #setPrice {
        width: min(30em, 98%);
    }
    #setPass {
        width: min(55em, 98%);
        
    }
    .form {
        display: grid;
        gap: 0.5rem;
        text-align: center;
        border-radius: 1em;
        padding: 3ch 5ch;
        background-color: $second-bg;
        p {
            margin-bottom: 0.5em;
        }
    }
    button {
        width: 100%;
        font-size: 16px;
        padding: 12px 16px;
    }
    #modal {
        z-index: 99;
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        min-height: 100vh;
        height: fit-content;
        background-color: transparentize($color: black, $amount: 0.2);
        backdrop-filter: blur(6px);
        display: flex;
        justify-content: center;
        flex-direction: column;
    }
    #content {
        display: flex;
        flex-direction: column;
        align-items: center;
        // justify-content: center;
    }

    :is(.shake) {
        animation-name: tilt-shaking;
        animation-duration: 200ms;
        animation-timing-function: ease-out;
    }

    @keyframes tilt-shaking {
        0% {
            transform: rotate(0deg);
        }
        25% {
            transform: rotate(5deg);
        }
        50% {
            transform: rotate(0eg);
        }
        75% {
            transform: rotate(-5deg);
        }
        100% {
            transform: rotate(0deg);
            background-color: rgba(255, 0, 0, 0.227);
        }
    }
</style>
