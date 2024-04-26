<script>
    export let params;
    params = '';

    import { updateMetadata } from '../handleMetadata.js';
    updateMetadata({
        id: '',
        title: 'Scrawl-canvas Tour',
        tabTitle: 'Scrawl-canvas Tour',
        description: 'Scrawl-canvas v8 - a Javascript library to generate HTML5 canvas element displays and animations.',
    });

    import HelloWorldCanvas from '../components/HelloWorldCanvas.svelte';
    import GridCanvas from '../components/GridCanvas.svelte';
    import AnchorsCanvas from '../components/AnchorsCanvas.svelte';
    import LoomCanvas from '../components/LoomCanvas.svelte';
</script>

<style>
    main {
        @apply mx-auto p-4 text-gray-700;
        max-width: 100%;
        min-height: 67vh;
        background-color: #f5fef8;
    }

    @media (min-width: 768px) {
        main {
            @apply rounded-lg;
        }
    }

    section {
        max-width: 800px;
        @apply mx-auto;
    }

    .canvas-grid {
        display: grid;

        grid-template-columns: 1fr 1fr;      
        grid-column-gap: 1rem;

        grid-template-rows: auto;
        grid-row-gap: 1rem;

        justify-items: stretch;
        align-items: stretch;

        padding: 0.5rem;

        border: 1px solid black;

        background-color: lemonchiffon;
        overflow: hidden;
        resize: horizontal;

        width: 60%;
        height: 440px;
        min-width: 300px;

        position: relative;
    }

    .canvas-grid::after {
        position: absolute;
        content: '';
        bottom: 0;
        right: 0;
        width: 0;
        height: 0;
        border-bottom: 1em solid red;
        border-left: 1em solid transparent;
    }

    .text-grid {
        display: grid;

        grid-template-columns: 1fr 1fr;      
        grid-column-gap: 1rem;

        grid-template-rows: auto;
        grid-row-gap: 1rem;

        justify-items: stretch;
        align-items: stretch;

        padding: 0.5rem;
        padding-top: 0;

        border: 1px solid black;

        background-color: azure;

        @apply rounded-lg;
    }

    .grid-instructions {
        @apply text-sm italic;
    }

    .clear-both {
        clear: both;
    }
    ul {
        @apply mb-4;
    }
    li {
        @apply mb-2 ml-8 list-disc;
    }
    b {
        color: #0f807c;
    }
    h3 {
        @apply text-lg font-medium font-serif italic mb-2 mt-4;
    }
    .main-message {
        @apply text-lg italic;
        font-variant: small-caps;
    }
</style>

<svelte:head>
    <title>Scrawl-canvas Tour</title>
</svelte:head>

<main>

    <section>
        <h1>Welcome to the Scrawl-canvas Library</h1>

        <p>Scrawl-canvas is a Javascript library for working with the HTML5 &lt;canvas> element. The library:</p>

        <ul>
            <li>Defines a set of factory functions for creating a wide range of graphic artefacts and effects, which can be drawn on a canvas.</li>
            <li>Includes an easy-to-use protocol for positioning, displaying and animating artefacts and effects across the canvas.</li>
            <li>Adds functionality to make &lt;canvas> elements <strong>responsive</strong>, adapting their size to their surrounding environment while remaining fully <strong>interactive</strong>.</li>
            <li>Helps make &lt;canvas> elements more <strong>accessible</strong> for both keyboard and AT users.</li>
        </ul>

        <p>
            &rarr; <a href="https://github.com/KaliedaRik/Scrawl-canvas">See the code on Github.</a>
            &rarr; <a href="https://codepen.io/collection/RzzMjw">View the CodePen collection.</a>
            &rarr; <a href="https://discord.com/channels/906541519509536829/906541519996080149">Discuss Scrawl-canvas on Discord.</a></p>
    </section>

    <HelloWorldCanvas />

    <section>
        <h2>Why use Scrawl-canvas?</h2>
        <div class="text-grid">
            <div>
                <h3>Working with the native Canvas API is hard work</h3>

                <p>Particularly when the desired result is more complex than a couple of coloured boxes in a static display.</p>
                <ul>
                    <li>Working directly with the canvas-related APIs means writing significant amounts of Javascript boilerplate code.</li>
                    <li>&lt;canvas> elements can be resized and styled using CSS, but changing the CSS size does not affect the element's drawing dimensions - leading to ugly results.</li>
                    <li>Events work on the canvas, not on the graphical objects within the canvas - we cannot use those objects as links or hot-spots (click/tap events), we cannot give them the equivalent of a CSS hover state (focus/blur events), we cannot drag-and-drop them around the display (move events).</li>
                    <li>Tracking a user's interaction with the various parts of a canvas display, for analytics and research on web page performance, is particularly difficult.</li>
                    <li>We cannot easily save and share displays, effects and animations; each &lt;canvas> element's output is tightly coupled to the code that defines that output.</li>
                    <li><strong>Of most concern,</strong> canvases are entirely graphical - visual - by nature; they come with <strong>significant accessibility issues.</strong> Given the ever-stricter requirements for websites to be accessible to all users, this makes using a canvas to present important information a dangerous proposition.</li>
                </ul>
            </div>
            <div>
                <h3>But the benefits of using canvases for graphical displays and animations are also great</h3> 

                <ul>
                    <li>Canvases are part of the DOM (unlike Flash).</li>
                    <li>They are natively wired for events and user interactions.</li>
                    <li>They use immediate mode redering (which makes them very quick).</li>
                    <li>The canvas-related APIs are designed to be used with Javascript.</li>
                </ul>

                <h4>Scrawl-canvas overcomes these barriers</h4>

                <p>Scrawl-canvas is fast, and developer-friendly. It's suitable for building infographics, games, interactive videos - whatever we can imagine for a 2D graphical presentation. And it is modular - we can break the code for a particular effect into its own module file which can be reused in other projects.</p>
                <p>Scrawl-canvas offers all of this while never losing its hard focus on making the &lt;canvas> element <strong>accessible, responsive and fully interactive</strong> while at the same time offering a <strong>pleasant developer experience</strong>.</p>
            </div>
        </div>
    </section>

    <section>
        <h2>Responsive canvas elements</h2>

        <p>The <a href="https://developer.mozilla.org/en-US/docs/Web/HTML/Element/canvas">HTML5 &lt;canvas> element</a> was not designed to be responsive. When we add a canvas to a web page, we give it fixed width and height values, which define its drawing (bitmap) dimensions.</p>

        <p>To make the web page <a href="https://en.wikipedia.org/wiki/Responsive_web_design">responsive</a>, so that it can look good across a range of browser sizes and device screens, we need to define a range of sizes using <b>relative proportions</b> - such as CSS percentage values.</p>

        <p>This approach fails for the &lt;canvas> element because browsers will stretch its drawing area to match the CSS-defined dimensions, which often leads to an ugly, distorted result.</p>

        <p>Scrawl-canvas allows us to define the canvas dimensions in CSS, then displays the canvas output in that area in a variety of ways using a <b>fit attribute</b> (which parodies the CSS <a href="https://developer.mozilla.org/en-US/docs/Web/CSS/object-fit">object-fit</a> property):</p>
    </section>

    <div class="canvas-grid">
        <GridCanvas namespace="grid-canvas-1" fit="cover" />
        <GridCanvas namespace="grid-canvas-2" fit="contain" />
        <GridCanvas namespace="grid-canvas-3" fit="none" />
        <GridCanvas namespace="grid-canvas-4" fit="fill" />
    </div>
    <p class="grid-instructions">Resize this grid by dragging its bottom right corner.</p>

    <section>
        <p>Fitting the canvas into a space in the web page is one thing. Positioning the artefacts and effects that make up the canvas's display is another. The <a href="https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API">HTML5 Canvas API</a> includes many functions for creating graphical elements; all of them use absolute pixel values to define, size and position them on the canvas.</p>

        <p>Scrawl-canvas simplifies the Canvas API, supplying a range of <b>factory functions</b> to create 'artefacts', 'styles' and other objects - including animations and tweens - which can be used together to create a canvas display.</p>

        <p>Once created, we can position these objects on the canvas in a number of ways:</p>
        <ul>
            <li><b>Absolute positioning</b> - using the canvas like a coordinates grid (which is how the Canvas API positions objects).</li>
            <li><b>Relative positioning</b> - place objects on the canvas using relative percentage values; if the canvas size changes, the objects stay in the same place relative to the canvas.</li>
            <li><b>Reference positioning</b> - use an artefact as a reference against which other artefacts can position themselves; when we update the reference artefact's position, the other artefacts update their position values automatically.</li>
        </ul>

        <p>The canvas below uses all these techniques to create its display. The result is entirely responsive - try resizing the browser window to see how the scene looks at smaller and larger viewport sizes!</p>
    </section>

    <section>
        <h2>Accessible and interactive canvas elements</h2>

        <p>The &lt;canvas> element really comes into its own when we add user-interaction features to it:</p>
        <ul>
            <li>Hotspots - defined areas within the display which users can hover over or click/tap to reveal additional information, trigger a tween animation, cause changes in other parts of the web page ... or even navigate to a different web page.</li>
            <li>Mouse/touch cursor tracking - attach a graphical artefact to the mouse cursor, or drag-and-drop artefacts around the canvas (or even between different canvases).</li>
        </ul>

        <p>Building this functionality for a normal, static canvas display is difficult enough. To build it for a responsive canvas display may seem impossible, given modern time and resource constraints.</p>
    </section>

    <AnchorsCanvas />

    <section>
        <p>Scrawl-canvas makes building such features easier!</p>

        <p>More importantly, Scrawl-canvas does a lot of heavy lifting to make those features <b>accessible</b> to users who cannot - for whatever reason - view the canvas display. Links can be made accessible via the keyboard; graphical text is (by default) copied into the DOM so it can be accessed by screen readers. Every Scrawl-canvas canvas comes with <a href="https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA">ARIA attributes</a>.</p>

        <h3>Tracking user journeys</h3>

        <p>Once we've built the canvas, we can add third-party tracker functionality to help record user journeys through its display, record click convertions - whatever the client needs to monitor the effectiveness of their site or campaign.</p>
    </section>

    <section>
        <h2>Go wild with your web pages: do amazing stuff!</h2>

        <LoomCanvas />

        <p>Scrawl-canvas is not the solution to all graphical representation problems: for many website designs other canvas and/or SVG libraries may provide a better route to meeting the client's requirements.</p>

        <p>But if a site design calls for a responsive, accessible and interactive &lt;canvas> display, Scrawl-canvas should be able to deliver the goods.</p>

        <h3>Resources</h3>

        <p><b>Documentation</b> is supplied as inline comments in the code base, and can be viewed as web pages from the <a href="/documentation">Docs</a> link. Most module files include links to test examples which demonstrate the code functionality.</p>

        <p>Code examples can be found in the <a href="/demonstrations">Demos</a> section of this site. All the demos have links to view the code.</p>

        <p>The <a href="/learn">Learning</a> and <a href="/how-do-i">"How do I?"</a> cookbook articles on this site are currently under development. If people have suggestions for articles please let me know via GitHub.</p>

        <p>The code repository can be found and downloaded from <a href="https://github.com/KaliedaRik/Scrawl-canvas">GitHub</a>. It has been released under an MIT Licence and is free-to-use in both personal and commercial projects.</p>
    </section>

</main>

