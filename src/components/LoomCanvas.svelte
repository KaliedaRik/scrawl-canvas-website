<script>
    import { getContext, onMount, onDestroy } from 'svelte';

    const scrawl = getContext('scrawl');

    let canvas, animation, observer, loom,
        group = scrawl.library.group,
        checkE, startAnimation, stopAnimation, startButton, stopButton,
        namespace = 'loom-canvas';

    onMount(() => {

        canvas = scrawl.getCanvas(`#${namespace}`);

        canvas.set({
            width: 200,
            height: 330,
            baseMatchesCanvasDimensions: true,
        });

        scrawl.makeShape({

            name: `${namespace}-left-track`,

            startX: 0,
            startY: 0,

            pathDefinition: 'm0.0,0.0q288.0,65.0,-7.0,247.0',
            useAsPath: true,
            precision: 0.05,

            method: 'none',

        }).clone({

            name: `${namespace}-right-track`,
            startX: 60,
            pathDefinition: 'm0.0,0.0c-16.0,238.0,-33.0,87.0,133.0,327.0',
        });

        scrawl.makePicture({

            name: `${namespace}-asset`,

            imageSource: './assets/scrawl-logo-dark.png',

            copyStartX: 0,
            copyStartY: 0,

            copyWidth: '100%',
            copyHeight: '100%',

            visibility: false,
        });

        loom = scrawl.makeLoom({

            name: `${namespace}-loom`,

            fromPath: `${namespace}-left-track`,
            toPath: `${namespace}-right-track`,

            fromPathStart: 0,
            fromPathEnd: 0.9,

            source: `${namespace}-asset`,
            isHorizontalCopy: false,

            delta: {
                fromPathStart: -0.003,
                fromPathEnd: -0.003,
            },
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
        width: 200px;
        height: 330px;
        float: left;
        @apply mr-4;
    }

    .animation-controls {
      position: absolute;
      top: 0;
      right: 0;
      width: 40px;
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
      font-size: 30px;
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
