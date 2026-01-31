
import fs from 'fs';
import path from 'path';

// Scroll Sequence Processing
const sequenceSourceDir = path.resolve('app/assets/scrollanimationjpgs');
const sequenceDestDir = path.resolve('public/sequence');

if (!fs.existsSync(sequenceDestDir)) {
    fs.mkdirSync(sequenceDestDir, { recursive: true });
}

try {
    const files = fs.readdirSync(sequenceSourceDir).filter(f => f.endsWith('.jpg')).sort();
    console.log(`Found ${files.length} sequence images.`);

    files.forEach((file, index) => {
        const src = path.join(sequenceSourceDir, file);
        const dest = path.join(sequenceDestDir, `frame_${index}.jpg`);
        fs.copyFileSync(src, dest);
    });
    console.log('Sequence sync complete.');
} catch (e) {
    console.error('Sequence Error:', e.message);
}

// Media Assets Sync (Coach images and videos)
const assetsDir = path.resolve('app/assets');
const imageDestDir = path.resolve('public/images');
const videoDestDir = path.resolve('public/videos');

[imageDestDir, videoDestDir].forEach(dir => {
    if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
});

try {
    const assetFiles = fs.readdirSync(assetsDir);
    assetFiles.forEach(file => {
        const ext = path.extname(file).toLowerCase();
        const src = path.join(assetsDir, file);

        if (['.jpg', '.png', '.webp'].includes(ext)) {
            fs.copyFileSync(src, path.join(imageDestDir, file));
        } else if (['.mp4', '.webm'].includes(ext)) {
            fs.copyFileSync(src, path.join(videoDestDir, file));
        }
    });
    console.log('Media assets sync complete.');
} catch (e) {
    console.error('Assets Error:', e.message);
}
