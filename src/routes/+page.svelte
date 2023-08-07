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
</section>

<style>

    header {
        padding: clamp(0.05rem, 4vw,2rem)  clamp(0.1rem,4vw,3rem);
        display: flex;
        justify-content: space-between;
        align-items: center;
        width: 100%;
    }
    header h1 {
        font-size: clamp(1.85rem, 5vw ,3.75rem);
    }

    #hero {
        width: 100%;
        height: max-content;
        display: flex;
        align-items: stretch;
    }

    #copy-wrapper {
        padding: clamp(0.05rem, 4vw,2rem)  clamp(0.1rem,4vw,3rem);
        display: flex;
        align-items: center;
    }

    #hero-copy {
        display: flex;
        flex-direction: column;
        gap: 0.85rem;
        max-width: 500px;
    }

    #hero-copy h2 {
        font-size: clamp(1.5rem,4.5vw,3rem);
    }

    #hero-img-wrp {
        position: relative;
        flex-grow: 1;
        height: 400px;
    }

    #hero-img {
        position: absolute;
        top: 0;
        bottom: 0;
        right: -20px;
        margin: auto;
        min-width: 800px;
        z-index: -1;
    }

    @media only screen and (max-width: 520px) {
        #hero {
            flex-direction: column;
            justify-content: stretch;
            overflow-x: clip;
            /* overflow-x:hidden; */
        }

        #hero-img-wrp {
            height: 50vh;
        }
        #hero-img {
            right: -50%;
        }
    }
</style>
