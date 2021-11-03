<script>
    import { getContext, onMount, onDestroy } from 'svelte';

    const scrawl = getContext('scrawl');

    // scrawl.setIgnorePixelRatio(false);

    let canvas, background, backgroundAsset, foreground, foregroundAsset, path, 
        helloRussian, helloChinese, helloSpanish, helloEnglish, animation, observer, 
        group = scrawl.library.group,
        namespace = 'hello-world-canvas';

    onMount(() => {

        scrawl.importDomImage('.myimage');

        canvas = scrawl.getCanvas(`#${namespace}`);

        canvas.set({
            fit: 'cover',
            checkForResize: true,
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
        width: 100%;
        padding: 1px;
        @apply rounded-lg mx-auto;
    }

    img {
        height: 0;
    }

    div {
        height: 0;
    }
</style>

<canvas id={namespace}></canvas>

<div>
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
