<script>
    import { getContext, onMount, onDestroy } from 'svelte';

    const scrawl = getContext('scrawl');

    let canvas, observer, hitGroup, pinGroup, labelGroup, animation,
        moveListener, upListener, backgroundAsset, updateOnResize;

    let namespace = 'anchors-canvas',
        name = (n) => `${namespace}-${n}`;

    let pinRadius = 6,
        pinLineWidth = 3,
        focussedPinRadius = 10,
        focussedPinLineWidth = 5, 
        fontSize = '2rem';

    let data = [
        ['pans', '5%', '70%', 'https://en.wikipedia.org/wiki/Cookware_and_bakeware'],
        ['plates', '25%', '45%', 'https://en.wikipedia.org/wiki/Plate_(dishware)'],
        ['bread', '70%', '35%', 'https://en.wikipedia.org/wiki/Bread'],
        ['chimney', '40%', '15%', 'https://en.wikipedia.org/wiki/Chimney'],
        ['baskets', '40%', '80%', 'https://en.wikipedia.org/wiki/Basket'],
        ['brooms', '58%', '60%', 'https://en.wikipedia.org/wiki/Broom'],
        ['goblets', '90%', '60%', 'https://en.wikipedia.org/wiki/Chalice'],
    ];

    onMount(() => {

        scrawl.importDomImage(`.${name('asset')}`);

        canvas = scrawl.getCanvas(`${namespace}`);

        backgroundAsset = scrawl.findAsset(name('background-image'));

        backgroundAsset.set({
            intrinsicDimensions: {
                'kitchenLarge-400.webp': [400, 200], 
                'kitchenLarge-800.webp': [800, 400], 
                'kitchenLarge-1200.webp': [1200, 600], 
                'kitchenLarge-1600.webp': [1600, 800], 
                'kitchenLarge-2400.webp': [2400, 1200], 
                'kitchenLarge-3600.webp': [3600, 1800],
            },
        });

        canvas.set({
            label: 'A static kitchen scene.',
            description: 'Users are able to identify items in the kitchen by hovering over hotspot pins in the image which, when hovered over, reveal a label describing the scene. Clicking on the pin will open a Wikipedia page about that item.'
        });

        hitGroup = scrawl.makeGroup({

            name: name('hit-group'),
            host: canvas.getBase(),
        });

        pinGroup = scrawl.makeGroup({

            name: name('pin-group'),
            host: canvas.getBase(),
        });

        labelGroup = scrawl.makeGroup({

            name: name('label-group'),
            host: canvas.getBase(),
        });

        scrawl.makePicture({

            name: name('background'),

            width: "100%",
            height: "100%",

            copyWidth: "100%",
            copyHeight: "100%",

            asset: backgroundAsset,
        });


        // Mini factory to create entitys
        // [pin-name, x, y, link]
        data.forEach(d => {

            const [item, x, y, url] = d;

            scrawl.makeWheel({

                name: name(item),
                group: hitGroup,

                start: [x, y],
                handle: ['center', 'center'],

                radius: 40,

                method: 'none',

                onEnter: function () {

                    scrawl.findEntity(`${name(item)}-pin`).set({
                        radius: focussedPinRadius,
                        lineWidth: focussedPinLineWidth,
                    });

                    scrawl.findEntity(`${name(item)}-label`).set({
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
                    scrawl.findEntity(`${name(item)}-pin`).set({
                        radius: pinRadius,
                        lineWidth: pinLineWidth,
                    });

                    scrawl.findEntity(`${name(item)}-label`).set({
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
                    name: `wikipedia-${item}-link`,
                    href: url,
                    description: `Link to the Wikipedia article on ${item} (opens in new tab)`,
                    focusAction: true,
                    blurAction: true,
                },
            });

            scrawl.makeWheel({

                name: `${name(item)}-pin`,
                group: pinGroup,

                pivot: name(item),
                lockTo: 'pivot',

                handleX: 'center',
                handleY: 'center',

                fillStyle: 'rgb(255 0 0 / 0.6)',
                strokeStyle: 'pink',

                lineWidth: 3,
                radius: 6,

                method: 'drawThenFill',

            });

            scrawl.makeLabel({

                name: `${name(item)}-label`,
                group: labelGroup,

                text: `${item[0].toUpperCase()}${item.substring(1)}`,

                pivot: name(item),
                lockTo: 'pivot',

                handle: ['center', '-50%'],

                fontString: '1rem sans-serif',
                shadowColor: 'black',
                fillStyle: 'white',
                shadowBlur: 2,

                exposeText: false,
                visibility: false,

            });
        });


        moveListener = scrawl.addListener('move', () => canvas.cascadeEventAction('move'), canvas.domElement);

        upListener = scrawl.addNativeListener(['click', 'touchstart'], function (e) { 

            if (e && (e.button === 0 || e.touches.length)) {

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

                fontSize = '3.25rem';

                updateOnResize();
            },

            actionSmallerArea: () => {

                pinRadius = 12;
                pinLineWidth = 6;
                focussedPinRadius = 16;
                focussedPinLineWidth = 8; 

                fontSize = '2.75rem';

                updateOnResize();
            },

            actionRegularArea: () => {

                pinRadius = 10,
                pinLineWidth = 5,
                focussedPinRadius = 14,
                focussedPinLineWidth = 7; 

                fontSize = '2.25rem';

                updateOnResize();
            },

            actionLargerArea: () => {

                pinRadius = 8;
                pinLineWidth = 8;
                focussedPinRadius = 12;
                focussedPinLineWidth = 6; 

                fontSize = '1.75rem';

                updateOnResize();
            },

            actionLargestArea: () => {

                pinRadius = 6;
                pinLineWidth = 3;
                focussedPinRadius = 10;
                focussedPinLineWidth = 5; 

                fontSize = '1.25rem';

                updateOnResize();
            },
        });

        updateOnResize = function () {

            pinGroup.setArtefacts({
                radius: pinRadius,
                lineWidth: pinLineWidth,
            });

            labelGroup.setArtefacts({
                fontSize,
            });
        };

        animation = scrawl.makeRender({

            name: name('animation'),
            target: canvas,
        });

        // generate the observer separately so we can cleanly destroy it on dismount
        observer = scrawl.makeAnimationObserver(animation, canvas);
    });

    onDestroy(() => {

        observer();
        moveListener();
        upListener();
        scrawl.purge(namespace);
    });
</script>

<style>
    canvas {
        @apply rounded-lg mx-auto;
        max-width: 1200px;
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

    p {
        @apply text-sm text-center italic;
    }
</style>

<canvas 
    id={namespace} 
    data-is-responsive="true" 
    data-base-width="1200" 
    data-base-height="600" 
    data-fit="fill"
>

    <div class="placeholder">
        <img
            src="assets/website-anchors-canvas-placeholder-1200.webp"
            alt="A placeholder image of the 'Anchors' canvas. Image shows a kitchen scene with items of interest highlighted by pins. Click on a pin to navigate to that item's Wikipedia page."
            srcset="assets/website-anchors-canvas-placeholder-400.webp 400w,
                assets/website-anchors-canvas-placeholder-800.webp 800w,
                assets/website-anchors-canvas-placeholder-1200.webp 1200w,
                assets/website-anchors-canvas-placeholder-1600.webp 1600w,
                assets/website-anchors-canvas-placeholder-2400.webp 2400w"
        />    
    </div>

    <div class="assets" aria-hidden="true">
        <img 
            id="{namespace}-background-image"
            class="{namespace}-asset"
            alt=""
            src="assets/kitchenLarge-800.webp"
            srcset="assets/kitchenLarge-400.webp 400w,
                assets/kitchenLarge-800.webp 800w,
                assets/kitchenLarge-1200.webp 1200w,
                assets/kitchenLarge-1600.webp 1600w,
                assets/kitchenLarge-2400.webp 2400w,
                assets/kitchenLarge-3600.webp 3600w"
        />
    </div>
</canvas>

<p>Hover over pins to reveal labels; click to visit relevant wikipedia page. Can also use the tab and enter keys to navigate links</p>
