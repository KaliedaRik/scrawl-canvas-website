<script>
	import cookbookData from '../data/cookbookData.mjs';

    import { updateMetadata, navigateTo } from '../handleMetadata.js';

	import CookbookCard from '../components/CookbookCard.svelte';

	export let params;

    let post = cookbookData.filter(item => item.id === params.slug);

    if (post.length) {

        post = post[0];
        updateMetadata(post);
    }
    else navigateTo('/error');
</script>

<style></style>

<svelte:head>
    <title>{post.tabTitle}</title>
</svelte:head>

<main>
    <CookbookCard postData={post} />
</main>
