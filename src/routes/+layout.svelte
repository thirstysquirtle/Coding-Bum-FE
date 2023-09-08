<script lang="ts">
    import "$lib/style.scss";
    import headerStore from "$lib/headerStore";
    import { onNavigate } from "$app/navigation";
    import { fade } from "svelte/transition";
    import cssSnapStore from "$lib/cssSnapStore";    
    // onNavigate((navigation) => {
    //     if (!document.startViewTransition) return;

    //     return new Promise((resolve) => {
    //         document.startViewTransition(async () => {
    //             resolve();
    //             await navigation.complete;
    //         });
    //     });
    // });
    
</script>

<div id="header-ghost" class={$cssSnapStore ? "snap" : ""}>
    <h1>The Coding Bum</h1>
    <button>Join Now</button>
</div>

<header bind:this={$headerStore}>
    <a href="/"><h1>The Coding Bum</h1></a>
    <button>Join Now</button>
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
        // visibility: hidden;
        margin-bottom: 0.5vh;
    }

    header {
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
