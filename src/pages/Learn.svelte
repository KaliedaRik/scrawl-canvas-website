<script>
	import learnData from '../data/learnData.mjs';

    import { updateMetadata, navigateTo } from '../handleMetadata.js';

	import LearnCard from '../components/LearnCard.svelte';

	export let params;

    let post = learnData.filter(item => item.id === params.slug);

    if (post.length) {

        post = post[0];
        updateMetadata(post);
    }
    else navigateTo('/error');
</script>

<style>
</style>

<svelte:head>
    <title>{post.tabTitle}</title>
</svelte:head>

<main>
    <LearnCard postData={post} />
</main>
