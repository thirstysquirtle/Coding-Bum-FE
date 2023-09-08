<script lang="ts">
    export let test: Boolean;

    function testButton() {
        console.log(test);
    }
</script>

<slot />
<button on:click={testButton}>Test</button>

<style>
    button {
        position: fixed;
        bottom: 1rem;
        background-color: coral;
        padding: 0.5em;
    }
</style>
