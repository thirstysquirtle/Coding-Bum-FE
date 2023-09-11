<script lang="ts">
    import showModalStore from "$lib/showModalStore";
    import { onMount } from "svelte";
    import Payment from "./Payment.svelte";

    /**
     * An object representing different steps in a process.
     * @readonly
     * @enum {string}
     */
    const Steps = {
        SettingPrice: "SettingPrice",
        Checkout: "Checkout",
    };
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

    let currentStep: any;
    $: if ($showModalStore) {
        currentStep = Steps.SettingPrice;
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

    function closeModal() {
        $showModalStore = false;
    }
    function goCheckout() {
        if (Number(donationAmount.slice(1)) >= 1) currentStep = Steps.Checkout; else {
            shakeThis.classList.add("shake")
            setTimeout(()=>shakeThis.classList.remove("shake"), 250)
        }
    }
</script>

{#if $showModalStore}
    <!-- svelte-ignore a11y-click-events-have-key-events -->
    <!-- svelte-ignore a11y-no-static-element-interactions -->
    <div id="modal" on:click|self={closeModal}>
        <section id="content">
            {#if currentStep == Steps.SettingPrice}
                <div id="setPriceForm">
                    <p>Very well. <br /> Your ascent now commences.</p>
                    <p>But first, how much will you pledge to the Bum?</p>
                    <input
                        bind:this={shakeThis}
                        bind:value={donationAmount}
                        on:keydown={validateDonation}
                    />
                    <button on:click={goCheckout}>Donate</button>
                </div>
            {:else if currentStep == Steps.Checkout}
                <Payment price={Number(donationAmount.slice(1))} />
            {/if}
        </section>
    </div>
{/if}

<style lang="scss">
    #setPriceForm {
        text-align: center;
        border-radius: 1em;
        padding: 3ch 5ch;
        background-color: $second-bg;
        width: min(30em, 100%);
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
