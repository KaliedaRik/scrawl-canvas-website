<script>
    import { getContext, onMount, onDestroy } from 'svelte';

    const scrawl = getContext('scrawl');

    let canvas, background, backgroundAsset, foreground, foregroundAsset, path, 
        helloRussian, helloChinese, helloSpanish, helloEnglish, animation, observer, 
        group = scrawl.library.group, 
        checkE, startAnimation, stopAnimation, startButton, stopButton,
        namespace = 'hello-world-canvas';

    onMount(() => {

        scrawl.importDomImage('.myimage');

        canvas = scrawl.getCanvas(`#${namespace}`);

        canvas.set({
            fit: 'cover',
            checkForResize: true,

            label: 'A banner animation.',
            description: 'Scene displays "Hello" text in four different languages (English, Spanish, Russian, Chinese) animating along a path across the sky. Text goes behind plants in the foreground and in front of trees in the background.'
        }).setBase({
            width: 2000,
            height: 1000,
        });

        backgroundAsset = scrawl.library.asset[`${namespace}-background-image`];
        foregroundAsset = scrawl.library.asset[`${namespace}-foreground-image`];

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

            name: `${namespace}-background`,

            width: "100%",
            height: "100%",

            copyWidth: "100%",
            copyHeight: "100%",

            asset: backgroundAsset,
        });

        path = scrawl.makeOval({

            name: `${namespace}-path`,

            startX: '50%',
            startY: '100%',

            handleX: 'center',
            handleY: 'center',

            radiusX: '90%',
            radiusY: '75%',

            roll: -12,
            flipReverse: true,

            method: 'none',
            useAsPath: true,
            precision: 0.05,
        });

        helloChinese = scrawl.makePhrase({

            name: `${namespace}-chinese-phrase`,

            font: 'bold 12rem "KaiTi", "楷体", STKaiti, "华文楷体", "Microsoft YaHei New", "Microsoft Yahei", "微软雅黑", STXihei, "华文细黑", SimSun, 宋体, Georgia, "Times New Roman", serif',

            text: '你好世界',

            fillStyle: 'red',

            textPath: `${namespace}-path`,
            textPathPosition: 0.1,
            textPathDirection: 'rtl',
            justify: 'left',
            constantPathSpeed: true,

            delta: {
                textPathPosition: 0.0005,
            },

            addPathRoll: true,
            method: 'fillThenDraw',
            globalAlpha: 0.8,
        });

        helloEnglish = helloChinese.clone({

            name: `${namespace}-english-phrase`,
            font: 'bold 12rem monospace',
            text: 'Hello world',
            fillStyle: 'blue',
            textPathPosition: 0.35,
        });

        helloSpanish = helloChinese.clone({

            name: `${namespace}-spanish-phrase`,
            font: 'bold 12rem "Times New Roman", Times, serif',
            text: 'Olá mundo',
            fillStyle: 'gold',
            textPathPosition: 0.6,
        });

        helloRussian = helloChinese.clone({

            name: `${namespace}-russian-phrase`,
            font: 'bold 12rem Helvetica, Arial, san-serif',
            text: 'Привет мир',
            fillStyle: 'lightblue',
            textPathPosition: 0.85,
        });

        foreground = background.clone({
            name: `${namespace}-foreground`,
            asset: foregroundAsset,
        });

        animation = scrawl.makeRender({

            name: `${namespace}-render`,
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
        animation.kill();
        group[canvas.base.name].kill(true);
        canvas.kill();
    });
</script>

<style>
    .canvas-container {
      position: relative;
    }

    canvas {
        width: 100%;
        padding: 1px;
        @apply rounded-lg mx-auto;
    }

    img {
        height: 0;
    }

    .image-container {
        height: 0;
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
  <canvas id={namespace}></canvas>
  <div class="animation-controls">
    <button id="play" title="Play animation">
      <span class="material-icons">play_circle</span>
    </button>
    <button id="pause" title="Pause animation">
      <span class="material-icons">pause_circle</span>
    </button>
  </div>
</div>

<div class="image-container">
    <img id="{namespace}-background-image" class="myimage" alt="Hello world banner - background image"
        src="assets/seedhead-1200.webp"
        srcset="assets/seedhead-400.webp 400w,
            assets/seedhead-800.webp 800w,
            assets/seedhead-1200.webp 1200w,
            assets/seedhead-1600.webp 1600w,
            assets/seedhead-2400.webp 2400w,
            assets/seedhead-3600.webp 3600w,
            assets/seedhead-400.png 400w,
            assets/seedhead-800.png 800w,
            assets/seedhead-1200.png 1200w,
            assets/seedhead-1600.png 1600w,
            assets/seedhead-2400.png 2400w,
            assets/seedhead-3600.png 3600w" />    



    <img id="{namespace}-foreground-image" class="myimage" alt="Hello world banner - foreground image"
        src="assets/seedhead-partial-1200.webp"
        srcset="assets/seedhead-partial-400.webp 400w,
            assets/seedhead-partial-800.webp 800w,
            assets/seedhead-partial-1200.webp 1200w,
            assets/seedhead-partial-1600.webp 1600w,
            assets/seedhead-partial-2400.webp 2400w,
            assets/seedhead-partial-3600.webp 3600w,
            assets/seedhead-partial-400.png 400w,
            assets/seedhead-partial-800.png 800w,
            assets/seedhead-partial-1200.png 1200w,
            assets/seedhead-partial-1600.png 1600w,
            assets/seedhead-partial-2400.png 2400w,
            assets/seedhead-partial-3600.png 3600w" />    
</div>
