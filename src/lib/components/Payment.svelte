<script lang="ts">
    import { onMount } from "svelte";
    import {paymentFlowStore, paymentFlowStep} from "$lib/paymentFlowStore";

    // This is your test publishable API key.
    let stripe: any;
    let emailAddress = "";
    let name = "";
    let elements: any;
    let messageContainer: Element;
    let loading = true;
    let pi;
    export let price: number;

    type myPaymentIntent = {
        id: string;
        amount: number;
    };
    // The items the customer wants to buy
    // #region logic
    onMount(() => {
        stripe = Stripe(
            "pk_test_51NXI07EcYmsYVNOje5HMFh6hFo03lyFd0UYPT62VZHnjSb23HcvO3jQuwe0RUwRY4496ZlCenBX2ZDAwvGGeTUWr000cx3JGMU"
        );
        initialize();
    });

    // Fetches a payment intent and captures the client secret
    async function initialize() {
        const response = await fetch(
            "http://localhost:3000/create-payment-intent",
            {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    donationAmt: price * 100,
                    productId: "prod_OcF13vLlooHkz2",
                }),
            }
        );
        const { clientSecret } = await response.json();
        const appearance = {
            theme: "night",
            variables: {
                fontFamily: "Inconsolata, sans-serif,monospace",
                fontWeightNormal: "600",
                borderRadius: "8px",
                colorBackground: "#0A2540",
                colorPrimary: "#EFC078",
                colorPrimaryText: "#1A1B25",
                colorText: "white",
                colorTextSecondary: "white",
                colorTextPlaceholder: "#727F96",
                colorIconTab: "white",
                colorLogo: "dark",
            },
            rules: {
                ".Input, .Block": {
                    backgroundColor: "rgba(0,0,0,0.4)",
                    border: "1.5px solid #FCD46C",
                },
            },
        };
        elements = stripe.elements({
            appearance,
            clientSecret,
            fonts: [
                {
                    cssSrc: "https://fonts.googleapis.com/css2?family=Inconsolata:wght@500;600;700&display=swap",
                },
            ],
        });

        const paymentElementOptions = {
            layout: "tabs",
        };

        const paymentElement = elements.create(
            "payment",
            paymentElementOptions
        );
        paymentElement.mount("#payment-element");

        loading = false;
    }

    async function handleSubmit(e: Event) {
        e.preventDefault();
        // setLoading(true);
        loading = true;

        const { error, paymentIntent } = await stripe.confirmPayment({
            elements,
            confirmParams: {
                // Make sure to change this to your payment completion page
                return_url: `http://localhost:3000/account-creation-success?email=${emailAddress}&username=${name}`,
                receipt_email: emailAddress,
            },
            redirect: "if_required",
        });

        if (paymentIntent && paymentIntent.status === "succeeded") {
            console.log("succ");
            pi = paymentIntent;
            showMessage("Payment succeeded!");
            storePayment(pi)
        }

        // This point will only be reached if there is an immediate error when
        // confirming the payment. Otherwise, your customer will be redirected to
        // your `return_url`. For some payment methods like iDEAL, your customer will
        // be redirected to an intermediate site first to authorize the payment, then
        // redirected to the `return_url`.
        if (error) {
            if (
                error.type === "card_error" ||
                error.type === "validation_error"
            ) {
                showMessage(error.message);
            } else {
                showMessage("An unexpected error occurred.");
            }
        }
    }

    async function storePayment(paymentIntent: myPaymentIntent) {
        const url = "http://localhost:3000/payment-success";
        const requestOptions = {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(paymentIntent),
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
                if (data.Status == "success") {
                    $paymentFlowStore = paymentFlowStep.SetPassword
                }
                else {
                    $paymentFlowStore = paymentFlowStep.Fail
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
    // #region uselessfunc
    // Fetches the payment intent status after payment submission
    // async function checkStatus() {
    //     const clientSecret = new URLSearchParams(window.location.search).get(
    //         "payment_intent_client_secret"
    //     );

    //     if (!clientSecret) {
    //         return;
    //     }

    //     const { paymentIntent } = await stripe.retrievePaymentIntent(
    //         clientSecret
    //     );
    //     pi = paymentIntent

    //     switch (paymentIntent.status) {
    //         case "succeeded":
    //             showMessage("Payment succeeded!");
    //             break;
    //         case "processing":
    //             showMessage("Your payment is processing.");
    //             break;
    //         case "requires_payment_method":
    //             showMessage(
    //                 "Your payment was not successful, please try again."
    //             );
    //             break;
    //         default:
    //             showMessage("Something went wrong.");
    //             break;
    //     }
    // }
    // #endregion

    // ------- UI helper ------
    function showMessage(messageText: string) {
        messageContainer?.classList.remove("hidden");
        messageContainer.textContent = messageText;

        setTimeout(function () {
            messageContainer?.classList.add("hidden");
            messageContainer.textContent = "";
        }, 4000);
    }
    // #endregion
</script>

<!-- Display a payment form -->
<form on:submit|preventDefault={handleSubmit} id="payment-form">
    <h2>${price.toFixed(2)} -- No Refunds 😈</h2>
    <label for="email">Email</label>
    <input
        bind:value={emailAddress}
        type="text"
        name="email"
        id="email"
        placeholder="Email"
        required
        autocomplete="off"
    />
    <label for="name">Name</label>
    <input
        bind:value={name}
        type="text"
        name="name"
        id="name"
        placeholder="Your Peers Shall Call you..."
        required
        autocomplete="off"
    />
    <div id="payment-element">
        <!--Stripe.js injects the Payment Element-->
    </div>
    <button id="submit" disabled={loading}>
        <div class="spinner {loading ? '' : 'hidden'}" id="spinner" />
        <span id="button-text" class={loading ? "hidden" : ""}>Pay now</span>
    </button>
    <div bind:this={messageContainer} id="payment-message" class="hidden" />
</form>
<button
    on:click={() => {
        console.log(pi);
    }}>test</button
>

<style lang="scss">
    form {
        width: min(100%, 600px);
        align-self: center;
        text-align: start;
        box-shadow: 0px 0px 0px 0.5px rgba(50, 50, 93, 0.1),
            0px 2px 5px 0px rgba(50, 50, 93, 0.1),
            0px 1px 1.5px 0px rgba(0, 0, 0, 0.07);
        border-radius: 7px;
        padding: 40px;
        background-color: $second-bg;
    }

    #payment-message {
        color: rgb(236, 237, 238);
        font-size: 16px;
        line-height: 20px;
        padding-top: 12px;
        text-align: center;
    }
    #payment-element {
        margin-bottom: 24px;
    }
    button {
        background: $accent-color;
        font-family: var(--big-font);
        color: rgb(31, 31, 31);
        border-radius: 4px;
        border: 0;
        padding: 12px 16px;
        font-size: 16px;
        font-weight: 600;
        cursor: pointer;
        display: block;
        transition: all 0.2s ease;
        box-shadow: 0px 4px 5.5px 0px rgba(0, 0, 0, 0.07);
        width: 100%;
    }

    .hidden {
        display: none;
    }

    button:hover {
        filter: contrast(115%);
    }
    button:disabled {
        opacity: 0.5;
        cursor: default;
    }
    /* spinner/processing state, errors */
    .spinner,
    .spinner:before,
    .spinner:after {
        border-radius: 50%;
    }
    .spinner {
        color: #ffffff;
        font-size: 22px;
        text-indent: -99999px;
        margin: 0px auto;
        position: relative;
        width: 20px;
        height: 20px;
        box-shadow: inset 0 0 0 2px;
        -webkit-transform: translateZ(0);
        -ms-transform: translateZ(0);
        transform: translateZ(0);
    }
    .spinner:before,
    .spinner:after {
        position: absolute;
        content: "";
    }
    .spinner:before {
        width: 10.4px;
        height: 20.4px;
        background: $accent-color;
        border-radius: 20.4px 0 0 20.4px;
        top: -0.2px;
        left: -0.2px;
        -webkit-transform-origin: 10.4px 10.2px;
        transform-origin: 10.4px 10.2px;
        -webkit-animation: loading 2s infinite ease 1.5s;
        animation: loading 2s infinite ease 1.5s;
    }
    .spinner:after {
        width: 10.4px;
        height: 10.2px;
        background: $accent-color;
        border-radius: 0 10.2px 10.2px 0;
        top: -0.1px;
        left: 10.2px;
        -webkit-transform-origin: 0px 10.2px;
        transform-origin: 0px 10.2px;
        -webkit-animation: loading 2s infinite ease;
        animation: loading 2s infinite ease;
    }

    @-webkit-keyframes loading {
        0% {
            -webkit-transform: rotate(0deg);
            transform: rotate(0deg);
        }
        100% {
            -webkit-transform: rotate(360deg);
            transform: rotate(360deg);
        }
    }
    @keyframes loading {
        0% {
            -webkit-transform: rotate(0deg);
            transform: rotate(0deg);
        }
        100% {
            -webkit-transform: rotate(360deg);
            transform: rotate(360deg);
        }
    }
</style>
