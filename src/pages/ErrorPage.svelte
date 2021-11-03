<script>
	export let params;
    params = '';

    import pageData from '../data/pageData.mjs';
    import { updateMetadata } from '../handleMetadata.js';

    let pageMetadata = pageData.filter(item => item.id === 'error')[0];
    updateMetadata(pageMetadata);
</script>

<style></style>

<svelte:head>
    <title>{pageMetadata.tabTitle}</title>
</svelte:head>

<main>
	<h3>This will be the error page</h3>
</main>
