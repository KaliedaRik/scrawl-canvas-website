<script>
    export let listing;
</script>

<style>
  div {
    border-width: 0 0 0 4px;
    border-color: rgb(0 100 0 / 0);
    transition: border-color 0.5s;
    @apply m-0 pl-4 mb-4;
  }
  div:hover {
    border-color: rgb(0 100 0 / 0.5);
  }

  a {
    @apply text-gray-900 no-underline;
    transition: color 0.5s;
  }
  a:hover {
    @apply text-green-700 no-underline;
  }
  
  h3 {
    @apply m-0 p-0;
  }
  p {
    @apply block italic whitespace-pre-wrap m-0;
  }
</style>

<div>
  <a href="/learn/{listing.id}">
    <h3>{listing.title}</h3>
    <p>{listing.description}</p>
  </a>
</div>
