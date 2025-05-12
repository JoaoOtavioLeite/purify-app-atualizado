const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const sizes = [192, 512];
const sourceIcon = path.join(__dirname, 'assets', 'images', 'icon.png');
const targetDir = path.join(__dirname, 'assets', 'images');

async function resizeIcon() {
  for (const size of sizes) {
    await sharp(sourceIcon)
      .resize(size, size)
      .toFile(path.join(targetDir, `pwa-${size}x${size}.png`));
    console.log(`Created ${size}x${size} icon`);
  }
}

resizeIcon().catch(console.error); 