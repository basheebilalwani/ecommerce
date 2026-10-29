
const sharp = require("sharp");
const fs = require("fs");
const path = require("path");

const root = path.join(__dirname, "public");
const extensions = new Set([
  ".jpg", ".jpeg", ".png", ".webp", ".tif", ".tiff"
]);

async function processDirectory(dir) {
  if (!fs.existsSync(dir)) {
    console.log(`Folder not found: ${dir}`);
    return;
  }

  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const file = path.join(dir, entry.name);

    if (entry.isDirectory()) {
      await processDirectory(file);
      continue;
    }

    if (!extensions.has(path.extname(entry.name).toLowerCase())) continue;

    // Preserve the original file and extension.
    const temp = `${file}.compressed.tmp`;
    const ext = path.extname(entry.name).toLowerCase();

    try {
      let image = sharp(file).rotate();
      const metadata = await image.metadata();

      if (metadata.width > 2000 || metadata.height > 2000) {
        image = image.resize({
          width: 2000,
          height: 2000,
          fit: "inside",
          withoutEnlargement: true
        });
      }

      if (ext === ".jpg" || ext === ".jpeg") {
        image = image.jpeg({ quality: 78, mozjpeg: true });
      } else if (ext === ".png") {
        image = image.png({ compressionLevel: 9, palette: true });
      } else if (ext === ".webp") {
        image = image.webp({ quality: 78 });
      } else {
        console.log(`Skipped unsupported format: ${entry.name}`);
        continue;
      }

      await image.toFile(temp);

      const before = fs.statSync(file).size;
      const after = fs.statSync(temp).size;

      if (after < before) {
        fs.renameSync(temp, file);
        console.log(
          `${entry.name}: ${(before / 1024).toFixed(0)} KB → ${(after / 1024).toFixed(0)} KB`
        );
      } else {
        fs.unlinkSync(temp);
        console.log(`Kept original (already optimized): ${entry.name}`);
      }
    } catch (error) {
      if (fs.existsSync(temp)) fs.unlinkSync(temp);
      console.error(`Failed: ${entry.name}`, error.message);
    }
  }
}

processDirectory(root).catch(console.error);
