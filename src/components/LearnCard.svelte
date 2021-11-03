<script>
    export let postData;

    let copy = '';

    fetch(`/lessons/${postData.id}.html`)
    .then(res => res.text())
    .then(res => copy = res)
    .catch(error => console.log(error));
</script>

<style>
    time {
        @apply block text-xs text-gray-700 italic mb-4;
    }
</style>

{#if copy}
    <!-- post title -->
    <h1>{postData.title}</h1>

    <!-- the post copy goes here -->
    {@html copy}

    <!-- publication / last updated date -->
    <time datetime="{postData.publishdate}">
        Last updated: {postData.publishdate}
    </time>
{:else}
    <h3>Retrieving post</h3>
{/if}
