<script>
    import { getContext, onMount, onDestroy } from 'svelte';

    const scrawl = getContext('scrawl');

    let canvas, animation, gradient, observer, ball, mouseCheck,
        animateGradient = true,
        group = scrawl.library.group;

    export let namespace;
    export let fit;

    onMount(() => {

        canvas = scrawl.getCanvas(`${namespace}`);

        canvas.set({
            fit: fit,
            label: 'The Scrawl-canvas "Hello world" animation.',
            description: 'A very simple canvas displaying a variation of the Scrawl-canvas artefact\'s "fit" attribute.',
        });

        gradient = scrawl.makeRadialGradient({

            name: `${namespace}-gradient`,

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
        })
        .updateColor(0, 'black')
        .updateColor(99, 'red')
        .updateColor(199, 'black')
        .updateColor(299, 'blue')
        .updateColor(399, 'black')
        .updateColor(499, 'gold')
        .updateColor(599, 'black')
        .updateColor(699, 'green')
        .updateColor(799, 'black')
        .updateColor(899, 'lavender')
        .updateColor(999, 'black');

        scrawl.makeBlock({

            name: `${namespace}-box`,

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

            name: `${namespace}-ball`,

            startX: 'center',
            startY: 'center',

            handleX: 'center',
            handleY: 'center',

            radius: 80,

            fillStyle: `${namespace}-gradient`,
            lockFillStyleToEntity: true,

            lineWidth: 6,
            strokeStyle: 'coral',

            globalAlpha: 0.4,

            delta: {
                roll: -0.2,
            },

            method: 'fillAndDraw',
        });

        scrawl.makePhrase({

            name: `${namespace}-phrase`,

            text: `Fit: ${fit}`,

            width: "80%",
            justify: 'center',

            startX: 'center',
            startY: '60%',

            handleX: 'center',
            handleY: 'center',

            font: '4rem Garamond, sans-serif',
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
                if (animateGradient) gradient.updateByDelta();
            };
        }();


        animation = scrawl.makeRender({

            name: `${namespace}-render`,
            target: canvas,
            commence: mouseCheck,
        });

        canvas.setReduceMotionAction(() => {

            ball.set({ noDeltaUpdates: true });
            animateGradient = false;
        });

        canvas.setNoPreferenceMotionAction(() => {

            ball.set({ noDeltaUpdates: false });
            animateGradient = true;
        });

        observer = scrawl.makeAnimationObserver(animation, canvas);
    });

    onDestroy(() => {

        observer();
        animation.kill();
        group[canvas.base.name].kill(true);
        gradient.kill();
        canvas.kill();
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

    div {
        margin: 0;
    }

</style>

<div>
    <canvas id={namespace} data-is-responsive="true" data-base-width="600" data-base-height="300" data-base-background-color="honeydew"></canvas>
</div>
