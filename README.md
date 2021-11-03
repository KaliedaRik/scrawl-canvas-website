# Scrawl-canvas website

The code in this repository builds the [Scrawl-canvas website](https://scrawl-v8.rikweb.org.uk/). 

The site is built using a [Svelte](https://svelte.dev/) scaffold, together with [Page.js](https://visionmedia.github.io/page.js/) for client-side routing, and [Tailwind](https://tailwindcss.com/) (helped by [PostCSS](https://postcss.org/)) for the CSS.

There is no backend CMS involved with the site!

### Repository structure - the src directory

Development work happens mainly in the `src` directory:

```
src
  |- components
  |    |- (Svelte components modules)
  |
  |- data
  |    |- cookbookData.mjs
  |    |- learnData.mjs
  |    |- pageData.mjs
  |
  |- pages
  |    |- Cookbook.svelte - 'How do I' articles; content for each page is supplied separately
  |    |- CookbookIndex.svelte - 'How do I' index page
  |    |- Demo.svelte - Hosts an iFrame of the SC library's demo tests
  |    |- Docs.svelte - Hosts an iFrame of the SC library's documentation
  |    |- ErrorPage.svelte
  |    |- Learn.svelte - Lesson articles; content for each page is supplied separately
  |    |- LearnIndex.svelte - Lessons index page
  |    |- Privacy.svelte
  |    |- Tour.svelte - this is the site's landing page content
  |
  |- App.svelte - generates the template (header + content + main) for all pages
  |- handleMetadata.js - code to autogenerate header metadata (Facebook, Twitter, etc)
  |- main.js - exports the App component
  |- routes.js - Page.js client-site routing
  |- utilities.js - for shared js code snippets - currently empty
```

The data files supply the metadata required to generate the various pages found across the site: 
+ When a new lesson is developed, an entry for that lesson's page should be added to the `learnData.mjs` file.
+ Similarly for new 'How Do I' articles, which need their own entries in the `cookbookData.mjs` file.
+ All the other pages (except the 'Tour' homepage) have entries in the `pageData.mjs` file.

CSS for the Svelte components happens in the .svelte files. There is also a global CSS file kept in the public directory

### Repository structure - the public directory

Content management mainly happens in the `public` directory:

```
public
  |- assets
  |    |- (Graphics for the home (Tour) page)
  |    |- (Each lesson keeps its graphics in a folder named for that lesson eg `lesson-07/`)
  |
  |- cookbook
  |    |- (Content for each 'How Do I' article - filenames must match cookbookData.mjs entries)
  |
  |- downloads
  |    |- (Minified bundles for each release of the Scrawl-canvas library)
  |
  |- fonts
  |    |- (Font files)
  |
  |- lessons
  |    |- (Content for each Lesson - filenames must match learnData.mjs entries)
  |
  |- .htaccess
  |- favicon.png
  |- global.css
  |- index.html - includes code for people not using Javascript
  |- nojs.css - includes code for people not using Javascript
```

### Cookbook and Lessons content
The content for each lesson, and 'How Do I' article, is written in normal HTML files which need to be saved to the `lessons` and `cookbook` folders respectively.

CSS markup for the content copy is inlined; use of Tailwind classes is encouraged.

### Other content
Not all the code required for the site is held in this repository. The code for the following directories needs to be copied over (manually) from the [Scrawl-canvas GitHub repository](https://github.com/KaliedaRik/Scrawl-canvas) each time a new release of the library is created, documentation is improved, or new demo tests added: `/demo, /docs, /min, /source`.

Download files are (manually) generated from the `/min` directory of the SC repository.

This site supports visitors who are not using, or have disabled, Javascript in their browsers/devices. The no-js code can be found in the `index.html` file - which must never be auto-generated, hence its exclusion from the `src/pageData.mjs` file. The `nojs.css` content is copied from the CSS generated for us when we build the site.

## Building and deploying the site

Clone or fork the repository, go into its directory and run `yarn init`. Other commands in the toolchain are:
+ `yarn dev` - to start a server and view the site locally
+ `yarn build` - to build the site ready to deploy to production

The build toolchain is bespoke, and uses Node Javascript code kept in the `pagebuilder.mjs` file.

As this is a Svelte-based site, we use [Rollup](https://rollupjs.org/guide/en/) as our module bundler.

Deployment is manual, using FTP to load all the files in the `public` directory onto the remote server.
