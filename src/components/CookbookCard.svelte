<script>
    export let postData;

    let copy = '';

    fetch(`/cookbook/${postData.id}.html`)
    .then(res => res.text())
    .then(res => copy = res)
    .catch(error => console.log(error));
</script>

<style>
    time {
        @apply block text-xs text-gray-700 italic mb-4;
    }

    span {
        @apply text-red-800;
    }

    p {
        @apply italic text-gray-700;
    }
</style>

{#if copy}
    <!-- post title -->
    <h1><span>How do I ...</span> {postData.title}?</h1>
    <p>Valid from version: {postData.validFrom}</p>

    <!-- the post copy goes here -->
    {@html copy}

    <!-- publication / last updated date -->
    <time datetime="{postData.publishdate}">
        Published: {postData.publishdate}
    </time>
{:else}
    <h3>Retrieving post</h3>
{/if}
