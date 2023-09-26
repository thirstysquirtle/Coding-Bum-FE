<script>
    import { onMount } from "svelte";
    import { getCookie, deleteCookie } from "$lib/cookieFuncs";
    let loggedIn;
    onMount(() => {
        loggedIn = getCookie("loggedIn");
        // deleteCookie("ses")
    });
</script>

<footer>
    <a href="/terms-of-service"
        ><button class="small-button italic underline">Terms of Service</button>
    </a>
    {#if loggedIn}
        <button
            on:click={() => {
                deleteCookie("loggedIn");
                window.location.reload();
            }}
            class="small-button">Logout</button
        >
    {:else}
        <a href="/login"><button class="small-button">Login</button></a>
    {/if}
</footer>

<style>
    footer {
        width: 100%;
        align-self: flex-end;
        display: flex;
        gap: 2rem;
        justify-content: center;
        padding: 2ch;
    }
</style>
