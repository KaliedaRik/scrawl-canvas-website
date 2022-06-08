import { writable } from 'svelte/store';

// Page.js only watches for anchor link clicks. 
// - we need to create and trigger a click event on an anchor element
// - to make sure the required navigation happens
const navigateTo = (destination) => {

    // sanitize the passed-in value
    destination = destination || '/';

    if (destination.indexOf('/') !== 0) destination = `/${destination}`;

    let a = document.createElement('a');
    a.href = destination;

    document.body.appendChild(a);
    a.click();
    a.remove();
};

// JS object which will hold handles to DOM metadata elements
let metadataHandles;

// Walk through the DOM to get handles to the metadata elements in the head element
const gatherMetadataHandles = () => {

    let head = document.head;

    let handles = {

        // generic metatags
        description: head.querySelector('meta[name="description"]'),

        // Facebook metatags
        ogTitle: head.querySelector('meta[property="og:title"]'),
        ogDescription: head.querySelector('meta[property="og:description"]'),

        // Twitter metatags
        twitterTitle: head.querySelector('meta[name="twitter:title"]'),
        twitterDescription: head.querySelector('meta[name="twitter:description"]'),
    }

    if (handles.description && handles.ogTitle && handles.twitterTitle) metadataHandles = handles;
};

// Exported function to update metadate element content attributes
const updateMetadata = (data) => {

    // We only want to gather the metadata element handles once per load event
    if (!metadataHandles) gatherMetadataHandles();

    if (metadataHandles) {

        // generic metatags
        metadataHandles.description.setAttribute('content', `${data.title} - ${data.description}`);

        // Facebook metatags
        metadataHandles.ogTitle.setAttribute('content', data.title);
        metadataHandles.ogDescription.setAttribute('content', data.description);

        // Twitter metatags
        metadataHandles.twitterTitle.setAttribute('content', data.title);
        metadataHandles.twitterDescription.setAttribute('content', data.description);
    }
};

// Used entirely by ./pages/PoemsIndex.svelte to keep track of current index filter
const HDIHash = writable('');

// Page load manipulation functionality
const scrollToTopOnLoad = () => {

    if (window.scrollY > 0) {

        window.scrollTo({
            top: 0, 
            left: 0, 
            behavior: 'smooth'
        });
    }
};

export {
    navigateTo,
    updateMetadata,
    HDIHash,

    scrollToTopOnLoad,
}
