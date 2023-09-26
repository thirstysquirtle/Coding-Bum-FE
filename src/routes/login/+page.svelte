<script lang="ts">
    import { PUBLIC_API_ENDPOINT } from "$env/static/public";
    import Footer from "$lib/components/Footer.svelte";
    import { getCookie } from "$lib/cookieFuncs";
    import { onMount } from "svelte";

    let showPassword = false;
    let passwordInput: HTMLInputElement;
    let loginError = false;
    let waitingForServer = false;

    onMount(() => {
        if (getCookie("loggedIn")) {
            window.location.href = "/super-cool-kids"
        }
    })


    function fetchPromise(url, requestOptions) {
        return new Promise((resolve, reject) => {
            fetch(url, requestOptions)
                .then((response) => {
                    if (!response.ok) {
                        reject("Network response was not ok");
                    }
                    return response.json(); // Parse the response as JSON
                })
                .then((data) => {
                    resolve(data);
                })
                .catch((error) => {
                    reject(
                        `There was a problem with the fetch operation: ${error}`
                    );
                });
        });
    }
    async function handleSubmit(e) {
        const formDat = new FormData(e.target)
        if (formDat.get("password") == "" || !/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(formDat.get("email"))) return loginError = true;        
        loginError = false;    
        const url = `${PUBLIC_API_ENDPOINT}/login`
        const requestOptions = {
            method: "POST",
            credentials: "include",
            headers: {
            'Content-Type': "application/json",
            },
            body: JSON.stringify({
                "email": formDat.get("email"),
                "password": formDat.get("password"),
            }),
        } 
        waitingForServer = true
        const loginResult = await fetchPromise(url, requestOptions)
       if (loginResult["error"]) {
            loginError = true;
            waitingForServer = false;
       } else if (loginResult["go-to"] != undefined) {
        window.location.href = loginResult["go-to"]
       }

    }
    function disableEnter(e) {
        if (e.key == "Enter") {
            if (e.target.type == "checkbox") {
                showPassword = !showPassword
            }
            if (e.target.type == "text") {
                passwordInput.focus()
            }
            return e.preventDefault()
        }
    } 
</script>
<main>
<section>
    <form on:submit|preventDefault={handleSubmit}>
        <input on:keydown={disableEnter} type="text" name="email" id="email" placeholder="Email" />
        <input
            bind:this={passwordInput}
            type={showPassword ? "text" : "password"}
            name="password"
            id="password"
            placeholder="Password"
        />
        <div class="show-pass">
            <input
            on:keydown={disableEnter}
                bind:checked={showPassword}
                type="checkbox"
                name="showPass"
                id="showPass"
            />
            <label for="showPass">Show Password</label>
        </div>
        {#if loginError }
            <div class="error">
                <p>Credentials do not match</p>
            </div>
        {/if}

        <button type="submit">Login</button>
    </form>
    <a data-sveltekit-reload href="/reset-password">Forgot Your Password?</a>
</section>

<div class="footer"><Footer></Footer>
</div>
</main>
<style>
    main {
        display: grid;
        grid-template-rows: fit-content 1fr;
        height: 87vh;
    }
    .footer {
        align-self: flex-end;
    }
    div.error {
        padding: 0.5em;
        background-color: rgba(216, 75, 75, 0.49);
        border: 1px dashed red;
        border-radius: 0.25em;
    }

    button[type="submit"] {
        width: 100%;
        font-size: 1.25rem;
    }

    section {
        display: flex;
        flex-direction: column;
        align-items: center;
        padding: clamp(0.05rem, 1vw, 2rem) clamp(0.1rem, 4vw, 3rem);
    }
    .show-pass {
        height: max-content;
        display: flex;
        gap: 2ch;
        align-items: center;
    }
    form {
        display: grid;
        gap: 0.5em;
        margin: 1em 0.25em;
        width: min(100%, 1400px);
    }

    label {
        margin: 0;
        padding: 0;
    }
    a {
        color: rgb(215, 216, 216);
    }
</style>
