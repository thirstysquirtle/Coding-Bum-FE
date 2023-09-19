<script>
    import Footer from "$lib/components/Footer.svelte";
import { deleteCookie } from "$lib/cookieFuncs";
    import { onMount } from "svelte";

    let coolKids = [];
    let you = null;
    onMount(() => {
        let responseClone;
        const url = "https://api.thecodingbum.com/super-cool-kids-list";
        const requestOptions = {
            method: "GET",
        };
        fetch(url, requestOptions)
            .then((response) => {
                if (!response.ok) {
                    throw new Error("Network response was not ok");
                }
                console.log(response)
                responseClone = response.clone()
                return response.json(); // Parse the response as JSON
            })
            .then((data) => {
                // Handle the response data here
                console.log(data);
                // if (data.coolKids == undefined) {
                //     window.location.href = "/login"
                // }
                coolKids = data.coolKids;
                you = data.you;
            })
            .catch((error) => {
                console.log(responseClone)
                // Handle any errors that occurred during the fetch
                console.error(
                    "There was a problem with the fetch operation:",
                    error
                );
            });
    });
</script>

<section>
    <ol>
        {#each coolKids as coolKid}
            <li id="{coolKid.RowNumber == you ? "you" :""}">
                <h2>{coolKid.RowNumber}</h2>
                <h3>{coolKid.Username}</h3>
                <h3>{coolKid.DonationInCents}</h3>
                <h3>{coolKid.CreatedDate}</h3>
            </li>
        {/each}
    </ol>
</section>
<Footer/>

<style lang="scss">
    #you {
        outline: 2px solid $accent-color;
    }

    section {
        width: 100%;
        display: flex;
        justify-content: center;
    }

    li {
        padding: 4px;
        text-align: start;
        display: grid;
        width: min(700px, 100%);
        column-gap: 3ch;
        grid-template-columns: repeat(4, 1fr);
        justify-content: space-between;
    }
</style>
