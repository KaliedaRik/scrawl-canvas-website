<script>

	export let params;
	params = '';

    import pageData from '../data/pageData.mjs';
    import learnData from '../data/learnData.mjs';

    import LearnListing from '../components/LearnListing.svelte';

    import { updateMetadata } from '../handleMetadata.js';

    // Update page metadata
    let pageMetadata = pageData.filter(item => item.id === 'learn')[0];
    updateMetadata(pageMetadata);
</script>

<style>
</style>

<svelte:head>
    <title>{pageMetadata.tabTitle}</title>
</svelte:head>

<main>
	<h1>Learning to use Scrawl-canvas</h1>

    {#each learnData as listing}
        <LearnListing {listing} />
    {/each}
</main>
