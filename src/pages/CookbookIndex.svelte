<script>

	export let params;
	params = '';

    import pageData from '../data/pageData.mjs';
    import cookbookData from '../data/cookbookData.mjs';

    import CookbookListing from '../components/CookbookListing.svelte';

    import { 
        updateMetadata,
        HDIHash } from '../handleMetadata.js';

    // Update page metadata
    let pageMetadata = pageData.filter(item => item.id === 'how-do-i')[0];
    updateMetadata(pageMetadata);

    // Get tags
    let taglist = cookbookData.reduce((arr, item) => arr = [...arr, ...item.tags], []);
    taglist = [...new Set(taglist)];
    taglist.sort();

    // Function to filter poems by tag
    let filteredPosts;

    const filterPosts = (tag) => {

        if (tag && tag.indexOf('#') == 0) tag = tag.substring(1);

        if (tag) filteredPosts = cookbookData.filter(item => item.tags.indexOf(tag) >= 0);
        else filteredPosts = cookbookData;

        HDIHash.set(tag);
    }

    filterPosts($HDIHash);

    // Function to handle tag button clicks
    const buttonAction = (e) => filterPosts(e.target.getAttribute('tag'));
</script>

<style>
    div {
        @apply text-center mb-4;
    }
    button {
        @apply inline-block rounded-full bg-blue-200 text-green-700 border-blue-500 p-1 m-1 text-center cursor-pointer text-sm outline-none;
        min-width: 6rem;
        transition: color 0.5s, background-color 0.5s;
    }
    button:hover {
        @apply bg-blue-700 text-green-200;
    }

    .current-filter {
        @apply text-yellow-300 bg-red-700;
    }
</style>

<svelte:head>
    <title>{pageMetadata.tabTitle}</title>
</svelte:head>

<main>
	<h1>The Scrawl-canvas <i>"How Do I?"</i> Cookbook</h1>

	<div>
		<button 
	        type="button" 
	        on:click={buttonAction} 
	        class="{!$HDIHash && 'current-filter'}">
	        All posts
	    </button>
		{#each taglist as tag}
			<button 
	            type="button" 
	            {tag} 
	            on:click={buttonAction} 
	            class="{$HDIHash === tag && 'current-filter'}">
	            #{tag}
	        </button>
		{/each}
	</div>

	{#if !filteredPosts.length}
	<p>There are no posts tagged with <b>#{$HDIHash}</b> - please search again.</p>
	{:else}
	    {#if $HDIHash}
	    <p>... Listing posts tagged with <b>#{$HDIHash}</b>:</p>
	    {:else}
	    <p>... Listing <b>all</b> posts:</p>
	    {/if}
	{/if}

    {#each filteredPosts as listing}
        <CookbookListing {listing} />
    {/each}
</main>
