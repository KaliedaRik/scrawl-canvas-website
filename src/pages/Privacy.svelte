<script>
	export let params;
    params = '';

    import pageData from '../data/pageData.mjs';
    import { updateMetadata } from '../handleMetadata.js';

    let pageMetadata = pageData.filter(item => item.id === 'privacy-and-cookies')[0];
    updateMetadata(pageMetadata);
</script>

<style></style>

<svelte:head>
    <title>{pageMetadata.tabTitle}</title>
</svelte:head>

<main>
	<h1>Privacy, security and cookies on this site</h1>

	<p>The Scrawl-canvas website does not collect or store any personal information. The site is not monitored to track user journeys through the various parts of the site - except for anonymised data collected in server logs, as supplied by the site's host (<a href="https://www.kualo.co.uk/">Kualo Ltd</a>).</p>

	<p>We do make use of some embedded <a href="https://codepen.io/">CodePen</a> pens in the Learn section of the site. Without those cookies, the embedded pens will not work. For that reason, we consider these cookies to be essential to the user experience - thus we do not need to seek permission to let CodePen add them to users' devices and browsers when they access those lessons.</p>

	<p>Finally, a couple of the Demo pages (Canvas-009, DOM-006) demonstrate how to add <a href="https://developers.google.com/analytics/devguides/collection/analyticsjs/debugging">Google Analytics tracking</a> to a Scrawl-canvas animation. These demos will add GA cookies to the browser or device, but no tracking reports will be sent to GA.</p>
</main>
