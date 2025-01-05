const fs = require('fs');
const path = require('path');
const sizeOf = require('image-size');
const sortBy = require("lodash/sortBy");
const sharp = require('sharp');

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


async function resize_images(dir, max_height = 1080) { 
    const walk = async (directory) => {
      const files = await fs.promises.readdir(directory);
      for (const file of files) {
        const filePath = path.join(directory, file);
        const stats = await fs.promises.stat(filePath);
        if (stats.isFile()) {
            try {
                const meta_data = await sharp(filePath).metadata();
                if (meta_data.height > max_height) {
                    await sharp(filePath)
                        .resize(null, max_height)
                        .toBuffer(function(err, buffer) {
                            fs.writeFileSync(filePath, buffer);                        
                        });
                }
            } catch(e) {
                console.log(e)
                // Do nothing
            }
        } else if (stats.isDirectory()) {
          await walk(filePath);
        }
      }
    };
    await walk(dir, 1080);
}
  
resize_images("public/img/gallery", 1080);