import sharp from 'sharp';
import { promises as fs } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

async function generateIcons() {
  const publicDir = join(__dirname, '../public');
  const svgPath = join(publicDir, 'favicon.svg');

  try {
    // 读取SVG文件
    const svgBuffer = await fs.readFile(svgPath);

    // 生成favicon.png (32x32)
    await sharp(svgBuffer)
      .resize(32, 32)
      .png()
      .toFile(join(publicDir, 'favicon.png'));

    // 生成apple-touch-icon.png (180x180)
    await sharp(svgBuffer)
      .resize(180, 180)
      .png()
      .toFile(join(publicDir, 'apple-touch-icon.png'));

    console.log('图标生成成功！');
  } catch (error) {
    console.error('生成图标时出错:', error);
  }
}

generateIcons(); 