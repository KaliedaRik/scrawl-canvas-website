<script>
    import { getContext, onMount, onDestroy } from 'svelte';

    const scrawl = getContext('scrawl');

    let canvas, animation, gradient, observer, ball, mouseCheck;

    export let namespace;
    export let fit;

    onMount(() => {

        const name = (n) => `${namespace}-${n}`;

        canvas = scrawl.getCanvas(namespace);

        canvas.set({
            fit: fit,
            label: 'The Scrawl-canvas "Hello world" animation.',
            description: 'A very simple canvas displaying a variation of the Scrawl-canvas artefact\'s "fit" attribute.',
        });

        gradient = scrawl.makeRadialGradient({

            name: name('gradient'),

            startX: '30%',
            startY: '30%',
            endX: '50%',
            endY: '50%',

            endRadius: '50%',

            paletteStart: 200,
            paletteEnd: 800,

            delta: {
                paletteStart: -1,
                paletteEnd: -1
            },

            cyclePalette: true,
            animateByDelta: true,

            colors: [
                [0, 'black'],
                [99, 'red'],
                [199, 'black'],
                [299, 'blue'],
                [399, 'black'],
                [499, 'gold'],
                [599, 'black'],
                [699, 'green'],
                [799, 'black'],
                [899, 'lavender'],
                [999, 'black']
            ],
        });

        scrawl.makeBlock({

            name: name('box'),

            width: "90%",
            height: "80%",

            startX: 'center',
            startY: 'center',

            handleX: 'center',
            handleY: 'center',

            fillStyle: 'linen',
            strokeStyle: 'moccasin',
            lineWidth: 25,
            lineJoin: 'round',

            method: 'fillThenDraw',
        });

        ball = scrawl.makeWheel({

            name: name('ball'),

            startX: 'center',
            startY: 'center',

            handleX: 'center',
            handleY: 'center',

            radius: 80,

            fillStyle: name('gradient'),
            lockFillStyleToEntity: true,

            lineWidth: 6,
            strokeStyle: 'coral',

            globalAlpha: 0.4,

            delta: {
                roll: -0.2,
            },

            method: 'fillAndDraw',
        });

        scrawl.makeLabel({

            name: name('label'),

            text: `Fit: ${fit}`,

            start: ['center', 'center'],
            handle: ['center', 'center'],

            fontString: '4rem sans-serif',
        });


        mouseCheck = function () {

            let active = false;

            return function () {

                if (canvas.here.active !== active) {

                    active = canvas.here.active;

                    ball.set({
                        lockTo: (active) ? 'mouse' : 'start'
                    });
                }
            };
        }();


        animation = scrawl.makeRender({

            name: name('animation'),
            target: canvas,
            commence: mouseCheck,
        });

        canvas.setReduceMotionAction(() => {

            gradient.set({ animateByDelta: false });
        });

        canvas.setNoPreferenceMotionAction(() => {

            gradient.set({ animateByDelta: true });
        });

        observer = scrawl.makeAnimationObserver(animation, canvas);
    });

    onDestroy(() => {

        observer();
        scrawl.purge(namespace);
    });
</script>

<style>
    canvas {
        @apply rounded-lg bg-black;
        width: 100%;
        height: 100%;
        max-height: 200px;
        border: 1px solid red;
    }

    canvas .placeholder {
        text-align: center;
        width: 100%;
    }

    canvas .placeholder img {
        width: 100%;
    }

    div {
        margin: 0;
    }
</style>

<div>
    <canvas 
        id={namespace} 
        data-is-responsive="true" 
        data-base-width="600" 
        data-base-height="300" 
        data-base-background-color="honeydew"
    >
        <div class="placeholder">
            <img
                src="assets/website-grid-canvas-{fit}.webp"
                alt="A placeholder image of the 'Grid canvas' canvas. Text shows the canvas wrapper's 'fit' property - {fit}; a ball with an animated gradient tracks the mouse cursor behind the text."
            />
        </div>
    </canvas>
</div>
