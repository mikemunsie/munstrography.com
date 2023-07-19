const fs = require('fs');
const sizeOf = require('image-size');
const sortBy = require("lodash/sortBy");

const categories = fs.readdirSync("./public/img/gallery", { withFileTypes: true })
    .filter((item) => item.isDirectory())
    .map((item) => item.name);

const fileMapping = {};    
categories.forEach(category => {
    const folder = `./public/img/gallery/${category}`;
    const images = sortBy(
        fs.readdirSync(folder, { withFileTypes: true })
        .filter(file => {
            return file.name.indexOf(".DS") === -1
        })
    , image => {
        return fs.statSync(`${folder}/${image.name}`).birthtimeMs;
    }).reverse();
    fileMapping[category] = images.map(file => {
        const dimensions = sizeOf(fs.readFileSync(`${folder}/${file.name}`));
        return {
            src: `/img/gallery/${category}/${file.name}`, 
            width: dimensions.width,
            height: dimensions.height,
        };
    });
})

fs.writeFileSync('./src/photos.json', JSON.stringify(fileMapping));
