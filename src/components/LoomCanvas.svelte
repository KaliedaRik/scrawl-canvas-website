<script>
    import { getContext, onMount, onDestroy } from 'svelte';

    const scrawl = getContext('scrawl');

    let canvas, animation, observer, loom,
        checkE, startAnimation, stopAnimation, startButton, stopButton;
    
    let namespace = 'loom-canvas',
        name = (n) => `${namespace}-${n}`;

    onMount(() => {

        canvas = scrawl.getCanvas(`${namespace}`);

        canvas.set({
            label: 'A decorative animation.',
            description: 'The Scrawl-canvas banner image animates vertically over the canvas, twisting like a ribbon as it proceeds.'
        });

        scrawl.makeShape({

            name: name('left-track'),

            startX: 0,
            startY: 0,

            pathDefinition: 'm0.0,0.0q288.0,65.0,-7.0,247.0',
            useAsPath: true,
            precision: 0.05,

            method: 'none',

        }).clone({

            name: name('right-track'),
            startX: 60,
            pathDefinition: 'm0.0,0.0c-16.0,238.0,-33.0,87.0,133.0,327.0',
        });

        scrawl.makePicture({

            name: name('asset'),

            imageSource: './assets/scrawl-logo-dark.png',

            copyStartX: 0,
            copyStartY: 0,

            copyWidth: '100%',
            copyHeight: '100%',

            visibility: false,
        });

        loom = scrawl.makeLoom({

            name: name('loom'),

            fromPath: name('left-track'),
            toPath: name('right-track'),

            fromPathStart: 0,
            fromPathEnd: 0.9,

            source: name('asset'),
            isHorizontalCopy: false,

            delta: {
                fromPathStart: -0.003,
                fromPathEnd: -0.003,
            },
        });

        animation = scrawl.makeRender({

            name: name('animation'),
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
        width: 200px;
        height: 330px;
        float: left;
        @apply mr-4;
    }

    canvas .placeholder {
        text-align: center;
        width: 100%;
    }

    canvas .placeholder img {
        width: 100%;
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
    <canvas id={namespace} width="200" height="330">
        <div class="placeholder">
            <img
                src="assets/website-loom-canvas-placeholder.webp"
                alt="A placeholder image of the 'Loom canvas' canvas, which shows an animated Scrawl-canvas logo twisting as it moves over the canvas."
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
