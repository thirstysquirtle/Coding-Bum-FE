<script>
    import gangIMG from "$lib/images/gang2_up_trans.png";
    import SideScroll from "$lib/components/SideScroll.svelte"
</script>

<header>
    <h1>The Coding Bum</h1>
    <button>Join Now</button>
</header>
<section id="hero">
    <div id="copy-wrapper">
        <div id="hero-copy">
            <h2>Indulge in the Pinnacle of Generosity</h2>
            <p class="trans-card">
                Dear souls, a unique opportunity awaits you. To partake in an
                act of benevolence that befits the elite. <br /><br /> Simply donate
                a dollar - a trivial sum for the likes of you - and gain exclusive
                access to a distinguished catalogue of kindred spirits.
            </p>
            <button>Donate Now</button>
        </div>
    </div>

    <figure id="hero-img-wrp">
        <img id="hero-img" src={gangIMG} alt="The Gang in a Circle" />
    </figure>

    <svg
        id="hero-separator"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 1575 269"
        fill="none"
        preserveAspectRatio="none"
    >
        <path
            d="M1 1C171.242 0.999981 352.934 73.915 682.262 147.106C1015.47 221.159 997.909 284.205 1175.55 252.682C1353.2 221.159 1512.46 82.7859 1574 75.5542V268H1V1Z"
            fill="#3B3740"
            stroke="#3B3740"
        />
    </svg>
</section>
<section id="what-you-get">
    <h2>What you shall gain from a single dollar:</h2>
    <SideScroll/>

</section>

<style lang="scss">
    section {
        padding: clamp(0.05rem, 4vw, 2rem) clamp(0.1rem, 4vw, 3rem);
        width: 100%;
    }

    header {
        padding: clamp(0.05rem, 4vw, 2rem) clamp(0.1rem, 4vw, 3rem);

        display: flex;
        justify-content: space-between;
        align-items: center;
        width: 100%;
    }

    #hero {
        padding: 0;
        height: max-content;
        width: 100%;
        display: grid;
        // align-content: center;
        // align-items: center;
        justify-content: center;

        overflow-x: clip;
        position: relative;
        // grid-template-rows: fit-content 1fr;
        grid-template-columns: minmax(275px, 0.75fr) 1fr;
        // grid-template-rows: 1fr;

        #copy-wrapper {
            grid-row: 1/-1;
            grid-column: 1/2;
            padding: clamp(0.05rem, 4vw, 2rem) clamp(0.1rem, 4vw, 3rem);
            display: flex;
            align-items: center;
            // min-width: 400px;
            min-width: 280px;
            #hero-copy {
                display: flex;
                flex-direction: column;
                gap: 0.85rem;
            }
        }

        #hero-img-wrp {
            grid-row: 1/-1;
            grid-column: 2/3;
            margin-left: -4rem;
            z-index: -5;

            #hero-img {
                width: 70vw;
                position: absolute;
                top: -20vw;
                right: 0px;
                z-index: -3;
            }
        }
        #hero-separator {
            position: absolute;
            height: 10vw;
            bottom: -2px;
            z-index: -2;
            width: 102%;
        }
    }

    #what-you-get {
        width: 100%;
        min-height: 50vh;
        // margin: ;
        padding: 0;
        display: flex;
        flex-direction: column;
        align-items: center;
        position: relative;
        background-color: var(--second-bg);
        z-index: -2;

        h2 {
            width: 20ch;
            text-align: center;
        }
    }

    @media only screen and (max-width: 770px) {
        #hero {
            #hero-img-wrp {
                #hero-img {
                    top: calc(200px - 35vw);
                    width: 95vw;
                }
            }
        }
    }
</style>
