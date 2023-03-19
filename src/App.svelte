<style global>
    @tailwind base;

    html {
        font-size: 14px;
    }

    body {
        @apply font-sans p-0;
        line-height: 1.25;
        background-color: #3fb0ac;
    }

    main {
        @apply mx-auto px-6 pb-2 text-gray-700;
        max-width: 680px;
        min-height: 67vh;
        background-color: #f5fef8;
    }

    h1, h2, h3, h4, h5 {
        @apply font-serif font-semibold mb-4 pt-4;
    }
    h1 {
        @apply text-3xl; 
    }
    h2 {
        @apply text-2xl; 
    }
    h3 {
        @apply text-xl; 
    }

    h4 {
        @apply text-lg; 
    }

    h5 {
        @apply text-base italic; 
    }

    p {
        @apply mb-4;
    }
    a {
        @apply text-blue-700;
        transition: color 0.5s;
    }
    a:hover {
        @apply underline text-red-600;
    }

    @media (min-width: 768px) {
        html {
            font-size: 16px;
        }
        body {
            @apply p-4;
        }
        main {
            @apply rounded-lg;
            max-width: 760px;
        }
    }
    @media (min-width: 1024px) {
        html {
            font-size: 18px;
        }
        main {
            max-width: 920px;
        }
    }

    /* LESSONS, HOW DO I? */
    .ordered {
        @apply list-decimal list-outside ml-4 mb-4;
    }
    .disc {
        @apply list-disc list-outside ml-8 mb-4;
    }
    .ordered li, .disc li {
        @apply mb-2;
    }

    pre {
        border-color: #e2e8f0;
        background-color: #f7fafc;
        border-radius: 0.5rem;
        border-width: 1px;
        margin-bottom: 1rem;
        overflow-x: auto;
        padding: 1rem;
    }
    code {
        line-height: 1.25;
        color: #4a5568;
        font-family: Menlo, Monaco, Consolas, Liberation Mono, Courier New, monospace;
        font-size: 0.875rem;
    }
    /* .redcode */
    code b { 
        color: #9b2c2c;
        font-weight: 400;
    }
    /* .heavycode */
    code strong {
        font-weight: 700;
        color: #9b2c2c;
    }
    /* .comment */
    ins {
        color: #4a5568;
        font-size: 0.75rem;
        text-decoration: none;
    }
    code ins b {
        color: inherit;
        font-size: inherit;
        font-weight: 700;
    }

    img, figure {
        width: 80%;
        max-width: 800px;
        padding: 0.5em;
        margin: 0 auto 1em;
        border: 2px dashed gray;
        border-radius: 10px;
    }
    figure img {
        width: 100%;
        padding: 0;
        margin: 0;
        border: 0;
        border-radius: 0;
    }

    iframe {
        margin-bottom: 1rem;
    }

    @tailwind components;
    @tailwind utilities;
</style>

<script>
    // Svelte variables
    let page, params;

    // Handle Scrawl-canvas
    import { setContext } from 'svelte';
    import * as scrawl from 'scrawl-canvas';
    setContext('scrawl', scrawl);

    // Page.js routing functionality
    import {router, startRouter, routes } from './routes.js';

    // Build Page.js routes
    routes.forEach(route => {

        router(
            route.path, 

            (ctx, next) => {
                params = ctx.params;
                next();
            },

            () => page = route.component
        );
    });

    // Start the Page.js router and watch for changes
    startRouter();

    import { navigateTo } from './handleMetadata.js';
    let search = window.location.search;
    if (search) {

        let searchParams = new URLSearchParams(search.substring(1)),
            redirect = searchParams.get('p');

        navigateTo(`/${redirect}`);
    }

    // Page components
    import Navigation from './components/Navigation.svelte';
    import Footer from './components/Footer.svelte';
</script>

<Navigation />
<svelte:component this={page} {params} />
<Footer />
