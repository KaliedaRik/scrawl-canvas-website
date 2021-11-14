<script>
    import { getContext, onMount, onDestroy } from 'svelte';

    const scrawl = getContext('scrawl');

    let canvas, animation, observer, hitGroup, pinGroup, labelGroup,
        moveListener, upListener, backgroundAsset, updateOnResize,
        namespace = 'anchors-canvas';

    let artefact = scrawl.library.artefact,
        group = scrawl.library.group;

    let pinRadius = 6,
        pinLineWidth = 3,
        focussedPinRadius = 10,
        focussedPinLineWidth = 5, 
        fontSize = 2;

    onMount(() => {

        canvas = scrawl.getCanvas(`#${namespace}`);

        backgroundAsset = scrawl.library.asset[`${namespace}-background-image`];

        backgroundAsset.set({
            intrinsicDimensions: {
                'kitchenLarge-400.webp': [400, 200], 
                'kitchenLarge-800.webp': [800, 400], 
                'kitchenLarge-1200.webp': [1200, 600], 
                'kitchenLarge-1600.webp': [1600, 800], 
                'kitchenLarge-2400.webp': [2400, 1200], 
                'kitchenLarge-3600.webp': [3600, 1800],
                'kitchenLarge-400.png': [400, 200], 
                'kitchenLarge-800.png': [800, 400], 
                'kitchenLarge-1200.png': [1200, 600], 
                'kitchenLarge-1600.png': [1600, 800], 
                'kitchenLarge-2400.png': [2400, 1200], 
                'kitchenLarge-3600.png': [3600, 1800],
            },
        });

        canvas.set({
            fit: 'fill',
            checkForResize: true,
            ignoreCanvasCssDimensions: true,
            title: `${canvas.name} canvas element`,

        }).setBase({
            width: 1200,
            height: 600,
        });

        hitGroup = scrawl.makeGroup({

            name: `${namespace}-hit-group`,
            host: canvas.base.name,
        });

        pinGroup = scrawl.makeGroup({

            name: `${namespace}-pin-group`,
            host: canvas.base.name,
        });

        labelGroup = scrawl.makeGroup({

            name: `${namespace}-label-group`,
            host: canvas.base.name,
        });

        scrawl.makePicture({

            name: `${namespace}-background`,

            width: "100%",
            height: "100%",

            copyWidth: "100%",
            copyHeight: "100%",

            asset: backgroundAsset,
        });

        scrawl.makeWheel({

            name: `${namespace}-pans`,
            group: hitGroup,

            startX: '5%',
            startY: '70%',

            handleX: 'center',
            handleY: 'center',

            radius: 40,

            method: 'none',

            onEnter: function () {

                artefact[`${this.name}-pin`].set({
                    radius: focussedPinRadius,
                    lineWidth: focussedPinLineWidth,
                });

                artefact[`${this.name}-label`].set({
                    visibility: true,
                });

                canvas.set({
                    title: `${this.get('anchorDescription')} - ${this.get('anchorHref')}`,
                    css: {
                        cursor: 'pointer',
                    },
                });
            },

            onLeave: function () {
                artefact[`${this.name}-pin`].set({
                    radius: pinRadius,
                    lineWidth: pinLineWidth,
                });

                artefact[`${this.name}-label`].set({
                    visibility: false,
                });

                canvas.set({
                    title: `${canvas.name} canvas element`,
                    css: {
                        cursor: 'default',
                    }
                });
            },

            onUp: function () {
                this.clickAnchor();
            },

            anchor: {
                name: 'wikipedia-pans-link',
                href: 'https://en.wikipedia.org/wiki/Cookware_and_bakeware',
                description: 'Link to the Wikipedia article on pans (opens in new tab)',
                focusAction: true,
                blurAction: true,
            },
        }).clone({

            name: `${namespace}-plates`,
            startX: '25%',
            startY: '45%',

            anchor: {
                name: 'wikipedia-plates-link',
                href: 'https://en.wikipedia.org/wiki/Plate_(dishware)',
                description: 'Link to the Wikipedia article on plates (opens in new tab)',
                focusAction: true,
                blurAction: true,
            },

        }).clone({

            name: `${namespace}-bread`,
            startX: '70%',
            startY: '35%',

            anchor: {
                name: 'wikipedia-bread-link',
                href: 'https://en.wikipedia.org/wiki/Bread',
                description: 'Link to the Wikipedia article on bread (opens in new tab)',
                focusAction: true,
                blurAction: true,
            },

        }).clone({

            name: `${namespace}-chimney`,
            startX: '40%',
            startY: '15%',

            anchor: {
                name: 'wikipedia-chimney-link',
                href: 'https://en.wikipedia.org/wiki/Chimney',
                description: 'Link to the Wikipedia article on chimney (opens in new tab)',
                focusAction: true,
                blurAction: true,
            },

        }).clone({

            name: `${namespace}-baskets`,
            startX: '40%',
            startY: '80%',

            anchor: {
                name: 'wikipedia-baskets-link',
                href: 'https://en.wikipedia.org/wiki/Basket',
                description: 'Link to the Wikipedia article on baskets (opens in new tab)',
                focusAction: true,
                blurAction: true,
            },

        }).clone({

            name: `${namespace}-brooms`,
            startX: '58%',
            startY: '60%',

            anchor: {
                name: 'wikipedia-brooms-link',
                href: 'https://en.wikipedia.org/wiki/Broom',
                description: 'Link to the Wikipedia article on brooms (opens in new tab)',
                focusAction: true,
                blurAction: true,
            },

        }).clone({

            name: `${namespace}-goblets`,
            startX: '90%',
            startY: '60%',

            anchor: {
                name: 'wikipedia-goblets-link',
                href: 'https://en.wikipedia.org/wiki/Chalice',
                description: 'Link to the Wikipedia article on goblets (opens in new tab)',
                focusAction: true,
                blurAction: true,
            },
        });

        scrawl.makeWheel({

            name: `${namespace}-pans-pin`,
            group: pinGroup,

            pivot: `${namespace}-pans`,
            lockTo: 'pivot',

            handleX: 'center',
            handleY: 'center',

            fillStyle: 'rgba(255, 0, 0, 0.6)',
            strokeStyle: 'pink',

            lineWidth: 3,
            radius: 6,

            method: 'drawThenFill',

        }).clone({

            name: `${namespace}-plates-pin`,
            pivot: `${namespace}-plates`,

        }).clone({

            name: `${namespace}-bread-pin`,
            pivot: `${namespace}-bread`,

        }).clone({

            name: `${namespace}-chimney-pin`,
            pivot: `${namespace}-chimney`,

        }).clone({

            name: `${namespace}-baskets-pin`,
            pivot: `${namespace}-baskets`,

        }).clone({

            name: `${namespace}-brooms-pin`,
            pivot: `${namespace}-brooms`,

        }).clone({

            name: `${namespace}-goblets-pin`,
            pivot: `${namespace}-goblets`,
        });

        scrawl.makePhrase({

            name: `${namespace}-pans-label`,
            group: labelGroup,

            text: 'Pans',

            width: 50,
            justify: 'center',

            pivot: `${namespace}-pans`,
            lockTo: 'pivot',

            handleX: 'center',
            handleY: '-50%',

            font: '1rem Arial, sans-serif',
            shadowColor: 'black',
            fillStyle: 'white',
            shadowBlur: 2,

            exposeText: false,
            visibility: false,

        }).clone({

            name: `${namespace}-plates-label`,
            text: 'Plates',
            pivot: `${namespace}-plates`,

        }).clone({

            name: `${namespace}-bread-label`,
            text: 'Bread',
            pivot: `${namespace}-bread`,

        }).clone({

            name: `${namespace}-chimney-label`,
            text: 'Chimney',
            pivot: `${namespace}-chimney`,

        }).clone({

            name: `${namespace}-baskets-label`,
            text: 'Baskets',
            pivot: `${namespace}-baskets`,

        }).clone({

            name: `${namespace}-brooms-label`,
            text: 'Brooms',
            pivot: `${namespace}-brooms`,

        }).clone({

            name: `${namespace}-goblets-label`,
            text: 'Goblets',
            pivot: `${namespace}-goblets`,
        });


        moveListener = scrawl.addListener('move', () => canvas.cascadeEventAction('move'), canvas.domElement);

        upListener = scrawl.addListener('up', function (e) { 

            if (e && e.button === 0) {

                canvas.cascadeEventAction('up');
            }
        }, canvas.domElement);


        // Resizing breakpoints and actions
        canvas.set({

            breakToSmallest: 120000,
            breakToSmaller: 180000,
            breakToLarger: 300000,
            breakToLargest: 420000,

            actionSmallestArea: () => {

                pinRadius = 14,
                pinLineWidth = 7,
                focussedPinRadius = 18,
                focussedPinLineWidth = 9; 

                fontSize = 3.25;

                updateOnResize();
            },

            actionSmallerArea: () => {

                pinRadius = 12;
                pinLineWidth = 6;
                focussedPinRadius = 16;
                focussedPinLineWidth = 8; 

                fontSize = 2.75;

                updateOnResize();
            },

            actionRegularArea: () => {

                pinRadius = 10,
                pinLineWidth = 5,
                focussedPinRadius = 14,
                focussedPinLineWidth = 7; 

                fontSize = 2.25;

                updateOnResize();
            },

            actionLargerArea: () => {

                pinRadius = 8;
                pinLineWidth = 8;
                focussedPinRadius = 12;
                focussedPinLineWidth = 6; 

                fontSize = 1.75;

                updateOnResize();
            },

            actionLargestArea: () => {

                pinRadius = 6;
                pinLineWidth = 3;
                focussedPinRadius = 10;
                focussedPinLineWidth = 5; 

                fontSize = 1.25;

                updateOnResize();
            },
        });

        updateOnResize = function () {

            pinGroup.setArtefacts({
                radius: pinRadius,
                lineWidth: pinLineWidth,
            });

            labelGroup.setArtefacts({
                sizeValue: fontSize,
            });
        };

        animation = scrawl.makeRender({

            name: `${namespace}-render`,
            target: canvas,
        });

        observer = scrawl.makeAnimationObserver(animation, canvas);
    });

    onDestroy(() => {

        observer();
        moveListener();
        upListener();

        animation.kill();
        pinGroup.kill(true);
        labelGroup.kill(true);
        hitGroup.kill(true);
        group[canvas.base.name].kill(true);
        canvas.kill();
    });
</script>

<style>
    canvas {
        width: 100%;
        max-width: 1200px;
        @apply rounded-lg mx-auto;
    }

    p {
        @apply text-sm text-center italic;
    }

    img {
        height: 0;
    }

    div {
        height: 0;
    }
</style>

<canvas id={namespace}></canvas>
<p>Hover over pins to reveal labels; click to visit relevant wikipedia page. Can also use the tab and enter keys to navigate links</p>

<div>
    <img id="{namespace}-background-image" class="myimage" alt="Kitchen scene - background image"
        src="assets/kitchenLarge-800.webp"
        srcset="assets/kitchenLarge-400.webp 400w,
            assets/kitchenLarge-800.webp 800w,
            assets/kitchenLarge-1200.webp 1200w,
            assets/kitchenLarge-1600.webp 1600w,
            assets/kitchenLarge-2400.webp 2400w,
            assets/kitchenLarge-3600.webp 3600w,
            assets/kitchenLarge-400.png 400w,
            assets/kitchenLarge-800.png 800w,
            assets/kitchenLarge-1200.png 1200w,
            assets/kitchenLarge-1600.png 1600w,
            assets/kitchenLarge-2400.png 2400w,
            assets/kitchenLarge-3600.png 3600w" />    
</div>
