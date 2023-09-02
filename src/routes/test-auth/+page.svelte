<script lang="ts">
    import { onMount } from "svelte";

    let form: Element;
    let formChildren: Element[];
    let authResponse: any;

    onMount(() => {
        formChildren = Array.from(form.children);
        enterToTab(formChildren);
    });

    function enterToTab(formChildren: Element[]) {
        formChildren.forEach((child, index) => {
            if (index == formChildren.length - 1) return;
            child.addEventListener("keydown", (e) => {
                if (e.key == "Enter") {
                    e.preventDefault();
                    return formChildren[index + 1]?.focus();
                }
            });
        });
    }

    async function handleSubmit(e: Event) {
        const formData = new FormData(e.target);

     
        const url = "http://localhost:3000/auth/custom/login";
        const data = await fetch(url, {
            method: "POST",
            mode: "cors",
            credentials: "include",
            // headers: {
            //     "Content-Type": "application/x-www-form-urlencoded",
            // },
            body: formData,
        });

        const dataJson = await data.json();
        authResponse = dataJson;
        return;
    }
</script>

<form bind:this={form} on:submit|preventDefault={handleSubmit}>
    <input type="text" name="email" id="email" placeholder="email" />
    <input type="text" name="password" id="password" placeholder="password" />
    <button type="submit">submit</button>
</form>
{#if authResponse != ""}
    <h1>{JSON.stringify(authResponse)}</h1>
{/if}

<style>
    * {
        zoom: 1.4;
    }
    h1 {
        word-wrap: break-word;
    }
</style>
