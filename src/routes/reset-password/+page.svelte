<script>
    import { PUBLIC_API_ENDPOINT } from "$env/static/public";
    import Footer from "$lib/components/Footer.svelte";

    let requestReceived = false;
    let error = false;
    let email;
    let loading = false;
    function resetPassword(e) {
        if (!/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email)) return;
        loading = true;
        const url = `${PUBLIC_API_ENDPOINT}/forgot-password`
        const requestOptions = {
            method: "POST",
            headers: {
                "Content-type": "application/json"
            },
        }
        fetch(url, requestOptions).then((response) => {
            if (response.ok) {
                requestReceived = true
                loading= false
            }
            else {
                error = true
                loading= false
            }
        }).catch((error) => {
            error = true;
            console.log(error)
            loading= false
        })
 }
</script>
<main>
<section>
    <div class="left-text">
        <h2>Forgot your password?</h2>
        <p>
            Not a problem! Just submit your email address and you'll receive a
            link to reset your password if your email is indeed associated with
            an account.
        </p>
    </div>
    <form on:submit|preventDefault={resetPassword}>
        <label for="email" />
        <input bind:value={email} type="text" name="email" id="email" placeholder="Email" />
        <button type="submit" disabled={loading}>
            <div class="spinner {loading ? '' : 'hidden'}" id="spinner" />
        <span class={loading ? "hidden" : ""}>Submit</span>
        </button>
    </form>
    {#if requestReceived}
        <div class="success">
            <p>Your request has been received. If an account is associated with your email, you will receive a link to reset your password.</p>
        </div>
    {:else if error}
        <div class="error">
            <p>There was an error sending your request. Please try again.</p>
        </div>
    {/if}
</section>
<div class="footer">
<Footer></Footer>
</div>
</main>
<style lang="scss">
    main {
        display: flex;
        align-items: center;
        flex-direction: column;
        height: 87vh;
    }
    .footer {
        flex-grow: 1;
        display: flex;
        align-items: flex-end;
    }
    button {
        font-size: 1.25rem;
    }
    .hidden {
        display: none;
    }
    button:disabled {
        opacity: 0.85;
    }
    button:disabled:hover {
        scale: 1;
        cursor: not-allowed;
    }
    section > * {
        margin: 1em 0.25em;
    }
    .left-text {
        gap: 0.5ch;
        width: 100%;
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        text-align: start;
    }
    button {
        width: 100%;
    }
    section {
        padding: clamp(0.05rem, 1vw, 2rem) clamp(0.1rem, 4vw, 3rem);
        width: min(100%, 1400px);
        display: flex;
        flex-direction: column;
        align-items: stretch;
    }
    form {
        display: grid;
        gap: 0.5em;
        margin: 1em 0.25em;
    }

    label {
        margin: 0;
        padding: 0;
    }


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
