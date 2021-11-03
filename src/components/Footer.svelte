<style>
    footer {
        @apply py-4;
        background-color: #173e43;
    }
    p {
        @apply text-sm text-center text-gray-500 m-0 mt-4 pt-4;
        border-top: 1px solid rgba(200, 200, 200, 0.3);
    }
    button {
        @apply bg-blue-800 block w-full mt-5 border-0 outline-none;
    }
    button img, input[type="image"] {
        @apply block mx-auto border-0 outline-none;
        height: 40px;
    }
    form {
        @apply pt-6;
    }
    a {
        @apply text-gray-200 no-underline;
        transition: color 0.5s;
    }
    a:hover {
        @apply underline;
        color: #fffc00;
    }

    @media (min-width: 768px) {
        footer {
            @apply rounded-lg mb-4;
        }
    }    
</style>

<script>
    import FooterLinks from './FooterLinks.svelte'; 
</script>

<footer>
    <FooterLinks />
    <p>&copy;2021 Rik Roots. Site built and maintained by RikWorks.<br />
        Tech: <a href="https://svelte.dev/">Svelte</a> scaffold, <a href="https://visionmedia.github.io/page.js/">Page.js</a> routing, <a href="https://tailwindcss.com/">Tailwind</a> css</p>
</footer>
