<script>
    import { PUBLIC_API_ENDPOINT } from "$env/static/public";
    import Footer from "$lib/components/Footer.svelte";
    import headerStore from "$lib/headerStore";
    import { onMount } from "svelte";

    let coolKids = [];
    let you = null;
    let totalPages = 0;
    let currentPage = 0;
    onMount(async () => {
        $headerStore.style.backgroundColor="#1E1E1E";
        $headerStore.style.borderBottom = "1px dashed black";
        const url = `${PUBLIC_API_ENDPOINT}/super-cool-kids-list`;
        const requestOptions = {
            method: "GET",
            credentials: "include",
        };
        const data = await promiseFetch(url, requestOptions)
        coolKids = data.coolKids;
        you = data.you;
        currentPage = data.currentPage;
        totalPages = data.totalPages;
    });

    async function changePage(direction) {
        const nextPage = direction + currentPage;
        if (nextPage > totalPages || nextPage < 1) return;
        const url = `${PUBLIC_API_ENDPOINT}/super-cool-kids-page?page=${nextPage}`
        const options = {method: "GET", credentials: "include"}
        const data = await promiseFetch(url,options);
        coolKids = data.coolKids;
        currentPage = nextPage
        // you = data.you;
        // currentPage = data.currentPage;
        // totalPages = data.totalPages;


    }

    function promiseFetch(url, options) {
        return new Promise((resolve, reject)=>{
            fetch(url, options)
            .then((response) => {
                if (!response.ok) {
                    reject(`{"error":"response error"}`)
                    throw new Error("Network response was not ok");
                }
                return response.json(); // Parse the response as JSON
            })
            .then((data) => {
                if (data["go-to"] != undefined) {
                    console.log(data["go-to"])
                    window.location.href = data["go-to"];
                    resolve(`{"error":"unauthenticated"}`)
                }
                resolve(data)
            })
            .catch((error) => {
                reject(`{"error":"${error}"}`)
                // console.error("There was a problem with the fetch operation:", error);
            });
        })
    }
</script>

<section>
    <div class="table">
        <div class="mobile-hidden row">
            <h2>Rank</h2>
            <h2>Name</h2>
            <h2>Donation</h2>
            <h2>Initiated</h2>
        </div>
        <ol>
            {#each coolKids as coolKid}
                <li class="row" id={coolKid.RowNumber == you ? "you" : ""}>
                    <div>
                        <h2 class="desktop-hidden">Rank</h2>
                        <h3>{coolKid.RowNumber}</h3>
                    </div>
                    <div>
                        <h2 class="desktop-hidden">Name</h2>
                        <h3>{coolKid.Username}</h3>
                    </div>
                    <div>
                        <h2 class="desktop-hidden">Donation</h2>
                        <h3>${(coolKid.DonationInCents / 100).toFixed(2)}</h3>
                    </div>
                    <div>
                        <h2 class="desktop-hidden">Initiated</h2>
                        <h3>{coolKid.CreatedDate}</h3>
                    </div>
                </li>
            {/each}
        </ol>
    </div>
</section>
<div id="paginator">
    <button
        on:click={() => {
            changePage(-1);
        }}>&lt;</button
    >
    <p>{currentPage}/{totalPages}</p>
    <button
        on:click={() => {
            changePage(1);
        }}>&gt;</button
    >
</div>

<Footer />

<style lang="scss">
    .desktop-hidden {
        display: none;
    }
    .mobile-hidden {
        display: initial;
    }
    #paginator {
        gap: 0.35em;
        padding: 1rem;
        font-size: 1.5rem;
        display: flex;
        width: 100%;
        justify-content: center;
    }
    button {
        font-size: 1.25rem;
        border-radius: 0.3em;
        padding: 0.25em;
    }

    .table {
        width: 95%;
    }
    h2 {
        font-size: clamp(1.1rem, 3vw, 1.5rem);
        margin: 0;
        letter-spacing: normal;
        padding: 0;
    }
    .row {
        word-break: break-all;

        width: 100%;
        display: grid;
        grid-template-columns: 6.5rem 1fr 0.5fr 8rem;
    }
    .row > * {
        padding: 0.5rem;
        justify-self: stretch;
        align-self: stretch;
        display: flex;
        justify-content: flex-start;
        border: 1px solid white;
    }
    #you {
        outline: 3px solid $accent-color;
        outline-offset: -1px;
    }

    section {
        width: 100%;
        display: flex;
        justify-content: center;
    }

    @media screen and (max-width: 650px) {
        .mobile-hidden {
            display: none;
        }
        .desktop-hidden {
            display: initial;
        }
        .row {
            grid-template-columns: 1fr 1fr;
            padding: 0.25rem 0.5rem;
        }
        .row > * {
            border: none;
            display: flex;
            flex-direction: column;
            align-items: flex-start;
        }
        li {
            border: 1px solid white;
        }
    }
</style>
