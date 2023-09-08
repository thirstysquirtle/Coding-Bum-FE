<script>
    import cssSnapStore from "$lib/cssSnapStore";
    import headerStore from "$lib/headerStore";
    import { onMount } from "svelte";
    onMount(() => {
        $cssSnapStore = false;
        document.body.style.backgroundColor = "#1E1E1E";
        $headerStore.style.backgroundColor = "#1E1E1E";
    });
</script>

<section>
    <h1>Terms of Service</h1>
    <p>
        At all times, nothing is guaranteed to work. You agree to not hold The
        Coding Bum liable for any issues involved with the website.
    </p>
    <p>
        We reserve the right to terminate or suspend your access to the Website
        at our sole discretion, with or without cause, and without notice.
    </p>
</section>

<style lang="scss">
    section {
        padding-top: 3ch;
        // min-height: 200vh;
        display: flex;
        flex-direction: column;
        gap: 1ch;
        align-items: center;
        h1 {
            color: $accent-color;
        }
        p {
            max-width: 60ch;
            letter-spacing: 0.15ch;
        }
    }
</style>
