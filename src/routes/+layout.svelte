<script lang="ts">
    import "$lib/style.scss";
    import headerStore from "$lib/headerStore";
    import { onNavigate } from "$app/navigation";
    import { fade } from "svelte/transition";
    import cssSnapStore from "$lib/cssSnapStore";    
    import Payment from "$lib/components/Payment.svelte";
    import Modal from "$lib/components/Modal.svelte";
    import showModalStore from "$lib/showModalStore";
    import { onMount } from "svelte";
    import { getCookie, deleteCookie, setCookie} from "$lib/cookieFuncs"
    import type { Element } from "svelte/types/compiler/interfaces";

    let loggedIn = "nah";
    let headerGhost: HTMLDivElement;
    $:if(!$cssSnapStore) {
            headerGhost?.classList.remove("snap")
    }else  {
            headerGhost?.classList.add("snap")
    }
    onMount(() => {
        loggedIn = getCookie("loggedIn")
    })

    function showModal () {
        $showModalStore = true
    }
</script>

<Modal/>
<div bind:this={headerGhost}  id="header-ghost" class="snap">
    <h1>The Coding Bum</h1>
    {#if loggedIn == "true"}
        <button>Enter</button>
    {:else if !loggedIn}
    <button>Join Now</button>

    {/if}
</div>

<header bind:this={$headerStore}>
    <div class="banner">This website is non-functional. The backend has been taken down to save a few dollars.</div>
    <a href="/"><h1>The Coding Bum</h1></a>
    {#if loggedIn}
        <button on:click={() => {window.location.href ="/super-cool-kids"}}> Enter</button>
    {:else}
    <button on:click={showModal}>Join Now</button>

    {/if}
</header>
<slot />
<style lang="scss">
    a {
        all: unset;
        cursor: pointer;
    }

    .snap {
        scroll-snap-align: start;
    }

    #header-ghost {
        display: flex;
        opacity: 0;
        width: 100%;
        padding: clamp(0.05rem, 1vw, 2rem) clamp(0.1rem, 4vw, 3rem);
        visibility: hidden;
        margin-bottom: 0.5vh;
    }

    .banner {
        position: fixed;
        top: 1ch;
        left: 50%;
        translate: -50%;
        text-align: center;
        font-family: var(--inconsolata);
        grid-area: banner;
        justify-self: center;
        width: 35%;
        background-color: rgba(255, 0, 0, 0.451);
        border: 1px dashed red;
    }

    header {
        user-select: none;
        z-index: 10;
        padding: clamp(0.05rem, 1vw, 2rem) clamp(0.1rem, 4vw, 3rem);
        // height: 5rem;
        position: fixed;
        top: 0;
        display: flex;
        justify-content: space-between;
        align-items: center;
        width: 100%;
        // transition: background-color 100ms ease-in;
    }

    @keyframes fade-in {
        from {
            opacity: 0;
        }
    }

    @keyframes fade-out {
        to {
            opacity: 0;
        }
    }
</style>
