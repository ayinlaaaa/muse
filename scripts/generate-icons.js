const sharp = require('sharp');
const pngToIco = require('png-to-ico');
console.log('pngToIco keys:', Object.keys(pngToIco));


const fs = require('fs');
const path = require('path');

const inputSvg = path.join(__dirname, '../public/favicon.svg');
const outputDir = path.join(__dirname, '../public');

const sizes = [16, 32, 48, 180, 192, 512];

async function generateIcons() {
  console.log('Generating raster icons...');

  for (const size of sizes) {
    const outputName = size === 180 ? 'favicon-180.png' : `favicon-${size}.png`;
    const outputPath = path.join(outputDir, outputName);
    
    await sharp(inputSvg)
      .resize(size, size)
      .png()
      .toFile(outputPath);
    
    console.log(`Generated ${outputName}`);
  }

  // Generate multi-size favicon.ico
  console.log('Generating favicon.ico...');
  const icoBuffers = await Promise.all(
    [16, 32, 48].map(size => 
      sharp(inputSvg)
        .resize(size, size)
        .png()
        .toBuffer()
    )
  );

  const icoBuffer = await (pngToIco.default || pngToIco)(icoBuffers);
  fs.writeFileSync(path.join(outputDir, 'favicon.ico'), icoBuffer);
  console.log('Generated favicon.ico');

  console.log('Done!');
}

generateIcons().catch(err => {
  console.error('Error generating icons:', err);
  process.exit(1);
});
