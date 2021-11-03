console.log('page builder called');

import fs from 'fs';

// index.html template
const buildIndexFile = (data) => {

    let domain = 'https://scrawl-v8.rikweb.org.uk';
    let indexfileLocation = '`${location.origin}/?p=${location.pathname.substring(1)}`';

    return `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">

    <title>${data.tabTitle}</title>

    <!-- to prevent caching -->
    <meta http-equiv="cache-control" content="max-age=0">
    <meta http-equiv="cache-control" content="no-cache">
    <meta http-equiv="expires" content="-1">
    <meta http-equiv="expires" content="Tue, 01 Jan 1980 11:00:00 GMT">
    <meta http-equiv="pragma" content="no-cache">

    <!-- general page metadata -->
    <meta name="author" content="Rik Roots">
    <meta name="description" content="${data.title} - ${data.description}">

    <!-- Facebook metadata -->
    <meta property="fb:app_id" content="" />
    <meta property="og:url" content="http://scrawl-v8.rikweb.org.uk" />
    <meta property="og:type" content="article" />
    <meta property="og:title" content="${data.title}" />
    <meta property="og:description" content="${data.description}" />
    <meta property="og:image" content="http://scrawl-v8.rikweb.org.uk/assets/promotion-image.png" />

    <!-- Twitter metadata -->
    <meta name="twitter:card" content="summary_large_image">
    <meta name="twitter:title" content="${data.title}">
    <meta name="twitter:description" content="${data.description}">
    <meta name="twitter:image" content="http://scrawl-v8.rikweb.org.uk/assets/promotion-image.png">
    <meta name="twitter:image:alt" content="Image advertising the Scrawl-canvas Javascript library website">

</head>
<body>
    <script>
        if (location.pathname) location.href = ${indexfileLocation};
        else location.href = location.origin;
    </script>
</body>
</html>`;
};

// This function creates the directory if it doesn't already exist
const checkDirectory = (dir) => {

    return new Promise((resolve, reject) => {

        fs.access(dir, fs.constants.F_OK, (err) => {

            if (err) fs.mkdir(dir, { recursive: false }, (err) => {

                if (err) reject(`failed to create ${dir}`);
                else resolve(`created ${dir}`);
            });

            else resolve(`${dir} already exists and can access`);
        });
    });
};

// This function generates index pages
const writeIndexFile = (data, directory) => {

    return new Promise((resolve, reject) => {

        fs.open(`${directory}/index.html`, 'wx', (fileError, fd) => {

            if (fileError && fileError.code !== 'EEXIST') reject(`error for ${directory}/index.html - ${fileError.code}, ${fileError.message}`);

            fs.writeFile(`${directory}/index.html`, buildIndexFile(data, directory), 'utf8', (writeError) => {

                if (writeError) reject(`failed to write ${directory}/index.html file: ${writeError.code}, ${writeError.message}`);

                else resolve(`${directory}/index.html file updated`)
            });
         });
    });
};

// Process the router base pages index files
import pageData from './src/data/pageData.mjs';
pageData.forEach(page => {

    page.path = page.id;

    checkDirectory(`./public/${page.id}`)
    .then(res => writeIndexFile(page, `./public/${page.id}`))
    .then(res => console.log(res))
    .catch(err => console.log(err));
});

// Process the learning post files
import learnData from './src/data/learnData.mjs';
learnData.forEach(post => {

    post.path = `learn/${post.id}`;

    checkDirectory(`./public/learn/${post.id}`)
    .then(res => writeIndexFile(post, `./public/learn/${post.id}`))
    .then(res => console.log(res))
    .catch(err => console.log(err));
});

// Process the cookbook post files
import cookbookData from './src/data/cookbookData.mjs';
cookbookData.forEach(post => {

    post.path = `how-do-i/${post.id}`;

    checkDirectory(`./public/how-do-i/${post.id}`)
    .then(res => writeIndexFile(post, `./public/how-do-i/${post.id}`))
    .then(res => console.log(res))
    .catch(err => console.log(err));
});

