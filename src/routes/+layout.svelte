<script lang="ts">
    import "$lib/style.scss"
    import { onMount, setContext } from "svelte";
    let pageScrolled: boolean = false; 
    import headerStore from "$lib/headerStore";
 
    
</script>
<header bind:this={$headerStore} class="{pageScrolled ? "header-scrolled" : ""}">
    <h1>The Coding Bum</h1>
    <button>Join Now</button>
</header>
<slot></slot>

<style lang="scss">

   
    header {
        z-index: 10;

        padding: clamp(0.05rem, 1vw, 2rem) clamp(0.1rem, 4vw, 3rem);
        // height: 5rem;
        position: sticky;
        top: 0;
        display: flex;
        justify-content: space-between;
        align-items: center;
        width: 100%;
        transition: background-color 100ms ease-in;
    }
</style>