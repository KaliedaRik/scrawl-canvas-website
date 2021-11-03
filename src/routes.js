import router from "page";

const startRouter = router.start;

import Tour from "./pages/Tour.svelte";
import Demo from "./pages/Demo.svelte";
import Docs from "./pages/Docs.svelte";

import LearnIndex from "./pages/LearnIndex.svelte";
import Learn from "./pages/Learn.svelte";

import CookbookIndex from "./pages/CookbookIndex.svelte";
import Cookbook from "./pages/Cookbook.svelte";

import Privacy from "./pages/Privacy.svelte";
import ErrorPage from "./pages/ErrorPage.svelte";

const routes = [

    {
        // Display a learning post
        path: '/learn/:slug',
        component: Learn
    }, {
        // Learning pages index
        path: '/learn',
        component: LearnIndex

    }, {
        // Display a Cookbook post
        path: '/how-do-i/:slug',
        component: Cookbook
    }, {
        // Cookbook pages index
        path: '/how-do-i',
        component: CookbookIndex

    }, {
        // A dedicated privacy/security page, because every website needs one
        path: '/privacy-and-cookies',
        component: Privacy

    }, {
        // The Demo site iframe
        path: '/demonstrations',
        component: Demo
    }, {
        // The Docs site iframe
        path: '/documentation',
        component: Docs
    }, {
        // The landing page, which will show a selection of Scrawl-canvas demos
        path: '/',
        component: Tour
    }, {
        // The catch-all route, to serve an error page
        path: '*',
        component: ErrorPage
    }
];

export {
  router,
  startRouter,
  routes,
};
