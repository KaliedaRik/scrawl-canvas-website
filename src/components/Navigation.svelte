<script>
    import NavigationLinks from './NavigationLinks.svelte';	
</script>

<style>
    nav {
        @apply pt-2 pb-2;
        background: #173e43;
    }

    div {
        width: 100%;
    }
    img {
        margin: 1rem auto;
        width: 60%;
        min-width: 300px;
    }
    a {
        @apply w-full;
    }

    @media (min-width: 768px) {

        nav {
            @apply rounded-lg;
        }
    }
</style>

<nav>
    <img id="/assets/scrawl-logo-light.webp" alt="Scrawl-canvas logo"
        src="/assets/scrawl-logo-light.webp"
        srcset="/assets/scrawl-logo-light-400.webp 400w,
            /assets/scrawl-logo-light-800.webp 800w,
            /assets/scrawl-logo-light-1200.webp 1200w,
            /assets/scrawl-logo-light-1600.webp 1600w,
            /assets/scrawl-logo-light-2000.webp 2000w,
            /assets/scrawl-logo-light-2400.webp 2400w,
            /assets/scrawl-logo-light-2800.webp 2800w,
            /assets/scrawl-logo-light-3200.webp 3200w,
            /assets/scrawl-logo-light-3600.webp 3600w,
            /assets/scrawl-logo-light-4000.webp 4000w,
            /assets/scrawl-logo-light-400.png 400w,
            /assets/scrawl-logo-light-800.png 800w,
            /assets/scrawl-logo-light-1200.png 1200w,
            /assets/scrawl-logo-light-1600.png 1600w,
            /assets/scrawl-logo-light-2000.png 2000w,
            /assets/scrawl-logo-light-2400.png 2400w,
            /assets/scrawl-logo-light-2800.png 2800w,
            /assets/scrawl-logo-light-3200.png 3200w,
            /assets/scrawl-logo-light-3600.png 3600w,
            /assets/scrawl-logo-light-4000.png 4000w" />    
    <NavigationLinks />
</nav>
