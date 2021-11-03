<script></script>

<style>
    div {
        display: grid;
        grid-template-columns: 1fr 1fr 1fr 1fr 1fr 1fr;
        grid-gap: 0 0;
        justify-items: center;
    }
    a {
        @apply inline-block text-center m-0 text-gray-200 no-underline;
        transition: color 0.5s;
    }
    a:hover {
        @apply underline;
        color: #fffc00;
    }
</style>

<div>
    <a href="/">Tour</a>
    <a href="/learn">Learn</a>
    <a href="/how-do-i">How Do I?</a>
    <a href="/documentation">Docs</a>
    <a href="/demonstrations">Demos</a>
    <a rel="external" href="https://github.com/KaliedaRik/Scrawl-canvas">GitHub</a>
</div>
