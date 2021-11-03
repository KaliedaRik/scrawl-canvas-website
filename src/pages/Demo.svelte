<script>
	export let params;
    params = '';

    import pageData from '../data/pageData.mjs';
    import { updateMetadata } from '../handleMetadata.js';

    let pageMetadata = pageData.filter(item => item.id === 'demonstrations')[0];
    updateMetadata(pageMetadata);
</script>

<style>
    main {
        @apply mx-auto px-6 pb-2 text-gray-700;
        max-width: 100%;
        min-height: 67vh;
        background-color: #f5fef8;
    }

    @media (min-width: 768px) {
        main {
            @apply rounded-lg;
            max-width: 100%;
        }
    }
    @media (min-width: 1024px) {
        main {
            max-width: 100%;
        }
    }

    iframe {
    	width: 100%;
        height: 90vh;
    }
</style>

<svelte:head>
    <title>{pageMetadata.tabTitle}</title>
</svelte:head>

<main>
	<iframe title="{pageData.title}" src="{location.origin}/demo/index.html"></iframe>
</main>
