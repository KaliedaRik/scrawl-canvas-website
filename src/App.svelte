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

    h1, h2, h3 {
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

    p {
        @apply mb-4;
    }
    a {
        @apply text-blue-700;
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

    @tailwind components;
    @tailwind utilities;
</style>

<script>
    // Svelte variables
    let page, params;

    // Handle Scrawl-canvas
    import { setContext } from 'svelte';
    import scrawl from 'scrawl-canvas';
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
