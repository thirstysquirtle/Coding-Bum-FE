<script>
    import gangIMG from "$lib/images/gang2_up_trans.png";
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
        xmlns="http://www.w3.org/2000/svg"
        id="hero-separator"
        viewBox="0 0 1570 414"
        fill="none"
    >
        <path
            d="M1577 74.7511L1577 414H787H-2.99995L-3 0.307434C168 0.307415 350.5 73.1143 681.294 146.197C1015.99 220.14 998.345 283.092 1176.78 251.616C1355.22 220.14 1515.19 81.9721 1577 74.7511Z"
            fill="#3B3740"
        />
    </svg>
</section>
<section id="what-you-get">
    <h2>What you shall gain from a single dollar:</h2>
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

        h1 {
            font-size: clamp(1.85rem, 5vw, 3.75rem);
        }
    }

    #hero {
        padding: 0;
        height: max-content;
        display: flex;
        align-items: stretch;
        overflow-x: clip;
        position: relative;

        #copy-wrapper {
            padding: clamp(0.05rem, 4vw, 2rem) clamp(0.1rem, 4vw, 3rem);
            display: flex;
            align-items: center;
            #hero-copy {
                display: flex;
                flex-direction: column;
                gap: 0.85rem;
                max-width: 500px;
            }
        }

        #hero-img-wrp {
            position: relative;
            flex-grow: 1;
            height: 400px;
            #hero-img {
                position: absolute;
                top: 0;
                bottom: 0;
                right: -20px;
                margin: auto;
                min-width: 800px;
                z-index: -1;
            }
        }
    }

    #what-you-get {
        margin-top: 50px;
        width: 100%;
        // margin: ;
        padding: 0;
        display: flex;
        flex-direction: column;
        align-items: center;
        position: relative;
        background-color: var(--second-bg);
        z-index: -2;

        h2 {
            width: clamp(250px, 70vw, 650px);
            text-align: center;
        }
    }
    #hero-separator {
        width: 100%;
        position: absolute;
        bottom: 0%;
        z-index: -2;
        left: 0;
        right: 0;
    }

    @media only screen and (max-width: 520px) {
        #hero {
            flex-direction: column;
            justify-content: stretch;
        }

        #hero-img-wrp {
            height: 50vh;
        }
        #hero-img {
            right: -50%;
        }
    }
</style>
