<script>
    import { getContext, onMount, onDestroy } from 'svelte';

    const scrawl = getContext('scrawl');

    // scrawl.setIgnorePixelRatio(false);

    let canvas, animation, observer, loom,
        group = scrawl.library.group,
        namespace = 'loom-canvas';

    onMount(() => {

        canvas = scrawl.getCanvas(`#${namespace}`);

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

        let loom = scrawl.makeLoom({

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

        observer = scrawl.makeAnimationObserver(animation, canvas);
    });

    onDestroy(() => {

        observer();
        animation.kill();
        group[canvas.base.name].kill(true);
        canvas.kill();
    });
</script>

<style>
    canvas {
        float: left;
        @apply mr-4;
        min-height: 330px;
    }
</style>

<canvas id={namespace} width="200" height="330"></canvas>
