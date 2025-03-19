<script lang="ts">
    const mainBg = "#1E1E1E";
    const secondBg = "#3B3740";
    import gangIMG from "$lib/images/gang2_up_trans.png";

    import SideScroll from "$lib/components/SideScroll.svelte";
    import { onMount } from "svelte";
    import headerStore from "$lib/headerStore";
    import cssSnapStore from "$lib/cssSnapStore";
    import Footer from "$lib/components/Footer.svelte";
    import showModalStore from "$lib/showModalStore";

    $: headerHeight = `${$headerStore?.offsetHeight ?? 0}px`;

    function cameleonHeader() {
        if (window.scrollY == 0) {
            document.body.style.backgroundColor = "#1E1E1E";
            $headerStore.style.backgroundColor = "transparent";
            $headerStore.style.borderBottom = "none";
        } else {
            const sections = Array.from(document.querySelectorAll("section"));
            const headerPos = $headerStore.getBoundingClientRect().bottom;

            let currentSection;
            for (let i = sections.length - 1; i >= 0; i--) {
                if (headerPos >= sections[i].getBoundingClientRect().top) {
                    currentSection = sections[i];
                    break;
                }
            }

            // console.log(headerPos, currentSection?.dataset.bgColor);

            // console.log(currentSection)
            if (currentSection) {
                $headerStore.style.backgroundColor =
                    currentSection.dataset.bgColor;
                document.body.style.backgroundColor =
                    currentSection.dataset.bgColor || "";
                $headerStore.style.borderBottom = "1px dashed black";
            }
        }
    }
    onMount(() => {
        $cssSnapStore = true;

        cameleonHeader();

        window.addEventListener("scroll", cameleonHeader);
        return () => {
            window.removeEventListener("scroll", cameleonHeader);
        };
    });

</script>

<div style="--header-height: {headerHeight};">
    <section id="hero" data-bg-color={mainBg}>
        <div id="copy-wrapper">
            <div id="hero-copy">
                <h2>Indulge in the Pinnacle of Generosity</h2>
                <p class="trans-card">
                    Dear souls, a unique opportunity awaits you. To partake in
                    an act of benevolence that befits the elite. <br /><br /> Simply
                    donate a dollar, a trivial sum for the likes of you, and gain
                    exclusive access to a distinguished catalogue of kindred spirits.
                </p>
                    <button on:click={()=> {$showModalStore = true}}>Donate Now</button>
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
                stroke-width="2px"
            />
        </svg>
    </section>
    <section
        id="what-you-get"
        data-bg-color={secondBg}
        class="center-section snap-start"
    >
        <h2>What you shall gain from a single dollar:</h2>
        <SideScroll />
    </section>
    <section id="tldr" class="center-section snap-start" data-bg-color={mainBg}>
        <div>
            <h2>TL;DR</h2>
            <p>Give me a dollar to see who else did the same</p>
        </div>
    </section>
    <section
        id="dont-miss"
        class="center-section snap-start"
        data-bg-color={secondBg}
    >
        <div class="section-content">
            <h2>Do Not Miss Out!</h2>
            <p>
                I’m so broke that this website might go down before you get the
                chance to send me your hard earned money!
            </p>
            <h2>This is a limited time opportunity!</h2>
        </div>
    <Footer/>
        
    </section>
</div>

<style lang="scss">
    .snap-start {
        padding-top: var(--header-height) !important ;
        scroll-snap-align: start;
    }
    section {
        // padding: clamp(0.05rem, 4vw, 2rem) clamp(0.1rem, 4vw, 3rem);
        box-sizing: border-box;
        width: 100%;
        display: block;
        text-align: center;
        padding: clamp(0.05rem, 1vw, 2rem) clamp(0.1rem, 4vw, 3rem);
    }

    #hero {
        padding: 0;
        height: max-content;
        width: 100%;
        display: grid;
        justify-content: center;
        background-color: $main-bg;
        // overflow-x: clip;
        position: relative;
        grid-template-columns: minmax(275px, 0.75fr) 1fr;
        z-index: 1;
        #copy-wrapper {
            grid-row: 1/-1;
            grid-column: 1/2;
            padding: clamp(0.05rem, 4vw, 2rem) clamp(0.1rem, 4vw, 3rem);
            display: flex;
            align-items: center;
            min-width: 280px;
            #hero-copy {
                text-align: start;
                display: flex;
                flex-direction: column;
                gap: 0.85rem;
            }
        }

        #hero-img-wrp {
            grid-row: 1/-1;
            grid-column: 2/3;
            margin-left: -4rem;
            z-index: -10;

            #hero-img {
                width: 70vw;
                position: absolute;
                top: -20vw;
                right: 0px;
                z-index: -5;
            }
        }
        #hero-separator {
            position: absolute;
            height: 10vw;
            bottom: -2px;
            z-index: -2;
            width: 100%;
        }
    }

    #tldr > * {
        margin-bottom: var(--header-height, 1em);
    }

    #what-you-get {
        width: 100%;
        position:relative;
        z-index: 5;
        // margin: ;
        // min-height: 100vh;
        padding: clamp(0.2rem, 2vh, 1.5rem) 0;
        display: flex;
        flex-direction: column;
        justify-content: center;
        background-color: var(--second-bg);

        h2 {
            padding-top: 0.5ch;
            width: 20ch;
            text-align: center;
        }
    }

    #dont-miss {
        background-color: $second-bg;
        display: grid;
        grid-template-rows: 1fr min-content;
        width: 100%;
        justify-content: stretch;

        .section-content {
            justify-self: center;
            align-self: center;
            padding-top: 5ch;
            display: grid;
            gap: 1.5ch;
            place-items: center;
            margin-bottom: 3vh;
            p {
                max-width: 55ch;
                text-align: center;
            }
            h2 {
                text-align: center;
                max-width: 25ch;
            }
        }
       
    }

    .center-section {
        min-height: 100vh;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
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
