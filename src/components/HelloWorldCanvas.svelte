<script>
    import { getContext, onMount, onDestroy } from 'svelte';

    const scrawl = getContext('scrawl');

    let canvas, background, backgroundAsset, foreground, foregroundAsset, path, 
        text, animation, observer; 

    let checkE, startAnimation, stopAnimation, startButton, stopButton;

    let namespace = 'hello-world-canvas',
        name = (n) => `${namespace}-${n}`;

    onMount(() => {

        scrawl.importDomImage(`.${name('asset')}`);

        canvas = scrawl.getCanvas(namespace);

        canvas.set({
            label: 'A banner animation.',
            description: 'Scene displays "Hello" text in four different languages (English, Spanish, Russian, Chinese) animating along a path across the sky. Text goes behind plants in the foreground and in front of trees in the background.'
        });

        // 2020-era Svelte doesn't like us using `data-dimensions` attribute on <img> elements
        backgroundAsset = scrawl.findAsset(name('background-image'));
        foregroundAsset = scrawl.findAsset(name('foreground-image'));

        backgroundAsset.set({
            intrinsicDimensions: {
                'seedhead-400.webp': [400, 200], 
                'seedhead-800.webp': [800, 400], 
                'seedhead-1200.webp': [1200, 600], 
                'seedhead-1600.webp': [1600, 800], 
                'seedhead-2400.webp': [2400, 1200], 
                'seedhead-3600.webp': [3600, 1800],
                'seedhead-400.png': [400, 200], 
                'seedhead-800.png': [800, 400], 
                'seedhead-1200.png': [1200, 600], 
                'seedhead-1600.png': [1600, 800], 
                'seedhead-2400.png': [2400, 1200], 
                'seedhead-3600.png': [3600, 1800],
            },
        });

        foregroundAsset.set({
            intrinsicDimensions: {
                'seedhead-partial-400.webp': [400, 200], 
                'seedhead-partial-800.webp': [800, 400], 
                'seedhead-partial-1200.webp': [1200, 600], 
                'seedhead-partial-1600.webp': [1600, 800], 
                'seedhead-partial-2400.webp': [2400, 1200], 
                'seedhead-partial-3600.webp': [3600, 1800],
                'seedhead-partial-400.png': [400, 200], 
                'seedhead-partial-800.png': [800, 400], 
                'seedhead-partial-1200.png': [1200, 600], 
                'seedhead-partial-1600.png': [1600, 800], 
                'seedhead-partial-2400.png': [2400, 1200], 
                'seedhead-partial-3600.png': [3600, 1800],
            },
        });

        background = scrawl.makePicture({

            name: name('background'),

            width: "100%",
            height: "100%",

            copyWidth: "100%",
            copyHeight: "100%",

            asset: backgroundAsset,
        });

        scrawl.makeOval({

            name: name('path'),

            startX: '50%',
            startY: '100%',

            handleX: 'center',
            handleY: 'center',

            radiusX: '90%',
            radiusY: '65%',

            roll: -12,

            method: 'none',
            useAsPath: true,
            precision: 0.05,
        });

        text = scrawl.makeEnhancedLabel({

            name: name('chinese-phrase'),

            fontString: 'bold 12rem "Noto Chinese Simple Serif"',

            text: '你好世界',

            fillStyle: 'red',

            layoutTemplate: name('path'),
            useLayoutTemplateAsPath: true,
            pathPosition: 0.1,

            breakTextOnSpaces: false,
            textHandle: ['center', 'center'],

            delta: {
                pathPosition: -0.0008,
            },

            addPathRoll: true,

            lineWidth: 4,
            method: 'drawAndFill',
            globalAlpha: 0.8,
        });

        text.clone({

            name: name('english-phrase'),
            fontString: 'bold 12rem monospace',
            text: 'Hello world',
            fillStyle: 'blue',
            pathPosition: 0.35,
        });

        text.clone({

            name: name('spanish-phrase'),
            fontString: 'bold 12rem serif',
            text: 'Olá mundo',
            fillStyle: 'gold',
            pathPosition: 0.6,
        });

        text.clone({

            name: name('ukrainian-phrase'),
            fontString: 'bold 12rem san-serif',
            text: 'Привіт Світ',
            fillStyle: 'lightblue',
            pathPosition: 0.85,
        });

        background.clone({
            name: name('foreground'),
            asset: foregroundAsset,
        });

        animation = scrawl.makeRender({

            name: name('render'),
            target: canvas,
        });

        checkE = (e) => {
            if (e) {
                if ("keydown" === e.type) {
                    if (32 === e.keycode) return true; // spacebar
                    if (13 === e.keycode) return true; // enter key
                }
                if ("click" === e.type) return true; // mouse click
                if ("touchend" === e.type) return true; // tap
            }
            return false;
        };

        startAnimation = (e) => {
            if (e === "reduced-motion" || checkE(e)) {
                if (!animation.isRunning()) animation.run();
            }
        };

        stopAnimation = (e) => {
            if (e === "reduced-motion" || checkE(e)) {
                if (animation.isRunning()) animation.halt();
            }
        };

        canvas.setReduceMotionAction(() => setTimeout(() => stopAnimation("reduced-motion"), 5000));

        canvas.setNoPreferenceMotionAction(() => startAnimation("reduced-motion"));

        startButton = scrawl.addNativeListener(['click', 'keydown', 'touchend'], startAnimation, '#play');

        stopButton = scrawl.addNativeListener(['click', 'keydown', 'touchend'], stopAnimation, '#pause');

        observer = scrawl.makeAnimationObserver(animation, canvas);
    });

    onDestroy(() => {

        observer();
        startButton();
        stopButton();
        scrawl.purge(namespace);
    });
</script>

<style>
    .canvas-container {
        position: relative;
    }

    canvas {
        @apply rounded-lg mx-auto;
    }

    canvas .placeholder {
        text-align: center;
        width: 100%;
    }

    canvas .placeholder img {
        width: 100%;
    }

    canvas .assets {
        width: 0;
        height: 0;
        overflow: hidden;
    }

    .animation-controls {
        position: absolute;
        top: 0;
        left: calc(50% - 51px);
        width: 102px;
        background-color: #ffffff8f;
    }

    .animation-controls button {
        background-color: transparent;
        border-width: 0;
        padding: 0;
        display: inline-block;
    }
    .animation-controls button:hover {
        cursor: pointer;
    }

    .animation-controls span {
        font-size: 48px;
        opacity: 0.5;
    }
    .animation-controls span:hover {
        opacity: 1;
    }
</style>

<div class="canvas-container">
    <canvas 
        id={namespace} 
        data-is-responsive="true" 
        data-base-width="2000" 
        data-base-height="1000" 
        data-fit="cover"
    >

        <div class="placeholder">
            <img
                src="assets/website-hello-world-placeholder-1200.webp"
                alt="A placeholder image of the 'Hello world' canvas. The words 'Hello world' in various languages animate behind an image of seed heads, with trees in the background."
                srcset="assets/website-hello-world-placeholder-400.webp 400w,
                    assets/website-hello-world-placeholder-800.webp 800w,
                    assets/website-hello-world-placeholder-1200.webp 1200w,
                    assets/website-hello-world-placeholder-1600.webp 1600w,
                    assets/website-hello-world-placeholder-2400.webp 2400w"
            />    
        </div>

        <div class="assets" aria-hidden="true">
            <img 
                id="{namespace}-background-image" 
                class="{namespace}-asset" 
                alt=""
                src="assets/seedhead-1200.webp"
                srcset="assets/seedhead-400.webp 400w,
                    assets/seedhead-800.webp 800w,
                    assets/seedhead-1200.webp 1200w,
                    assets/seedhead-1600.webp 1600w,
                    assets/seedhead-2400.webp 2400w,
                    assets/seedhead-3600.webp 3600w"
             />

            <img 
                id="{namespace}-foreground-image" 
                class="{namespace}-asset" 
                alt=""
                src="assets/seedhead-partial-1200.webp"
                srcset="assets/seedhead-partial-400.webp 400w,
                    assets/seedhead-partial-800.webp 800w,
                    assets/seedhead-partial-1200.webp 1200w,
                    assets/seedhead-partial-1600.webp 1600w,
                    assets/seedhead-partial-2400.webp 2400w,
                    assets/seedhead-partial-3600.webp 3600w"
            />
        </div>
    </canvas>

    <div class="animation-controls">

        <button id="play" title="Play animation">
            <span class="material-icons">play_circle</span>
        </button>

        <button id="pause" title="Pause animation">
            <span class="material-icons">pause_circle</span>
        </button>

    </div>

</div>
