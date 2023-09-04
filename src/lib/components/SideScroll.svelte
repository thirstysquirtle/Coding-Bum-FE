<script>
</script>

<div id="cards-container">
    <div id="ranking-card" class="card">
        <h2>Ranking</h2>
        <p >
            You have already proven yourself to be among the finest. However,
            within the embrace of our exclusive club, your stature ascends to
            unprecedented heights. <br /> Here, you shall discover your esteemed
            place amidst the illustrious elite, for your position in the list shall
            be forever secured, a testament to your magnificence.
        </p>
    </div>
    <div id="elites-card" class="card">
        <h2>The Names Of your Fellow Elites</h2>
        <p>
            You shall be granted exclusive access to a venerable compendium of
            names from the crème de la crème of your ilk. This veritable
            treasure trove of nomenclature shall prove itself an invaluable
            asset for naming progeny, beloved pets, esteemed businesses,
            illustrious clans, and beyond. No longer shall hesitation cloud your
            path, for this curated anthology of superlative names shall be your
            beacon of assurance.
        </p>
    </div>
    <div id="boasting-card" class="card">
        <h2>Boasting Privileges</h2>
        <p>
            No longer shall you heed the opinions of lesser souls, for your
            ascendancy to this hallowed group transcends the mundane. You shall
            walk with unyielding confidence, knowing that you have attained an
            echelon of magnificence that others can only dream of.
        </p>
    </div>
</div>

<style lang="scss">
    #cards-container::-webkit-scrollbar {
        height: 0.75rem;
    }

    #cards-container::-webkit-scrollbar-track {
        background-color: rgba(202, 202, 202, 0); /* Set the background color of the track */
        border-radius: 1rem;
    }

    #cards-container::-webkit-scrollbar-thumb {
        background-color: $main-bg; /* Set the color of the thumb */
        border-radius: 4px; /* Add rounded corners to the thumb */
    }

    #cards-container::-webkit-scrollbar-thumb:hover {
        background-color: transparentize($color: $main-bg, $amount: 0.4);
    }

    #cards-container {
        padding: clamp(0.2rem, 3vw,2rem);
        width: 99%;
        display: grid;
        grid-auto-flow: column;
        grid-template-rows: 1fr;
        // align-content: stretch;
        // align-items: center;
        flex-grow: 1;
        // align-content: stretch;
        // flex-direction: column;
        // height: 100;
        overflow: auto;
        gap: 5vw;
        scroll-snap-type: x mandatory;

        #ranking-card {
            background-image: url("$lib/images/ranking_dark.png");
            background-position: 50% 40%;
        }

        #elites-card {
            background-image: url("$lib/images/names_dark.png");
            background-position: 50% 20%;
        }

        #boasting-card {
            background-image: url("$lib/images/boasting_rights_dark.png");
            background-position: 50% 40%;
        }

        .card {
            scroll-snap-align: center;
            // min-height: fit-content;
            background-repeat: no;
            background-size: cover;
            // background-blend-mode: multiply;
            // background-color: transparentize($color: $second-bg, $amount: 0.5);

            padding: clamp(0.5rem, 1vw, 2rem) clamp(1rem, 2vw, 4rem);
            border-radius: 1.25em;
            border: 1px solid rgba(167, 166, 166, 0.491);
            box-shadow: 1px 3px 7px rgba(0, 0, 0, 0.387);
            display: grid;
            width: min(80vw, 1500px);
            // height: min(55vh, 700px);
            height: 90%;

            h2 {
                justify-self: start;
                align-self: flex-start;
            }
            p {
                justify-self: end;
                align-self: flex-end;
                text-align: end;
                max-height: 50%;
                overflow: hidden;
            }
        }
    }
</style>
