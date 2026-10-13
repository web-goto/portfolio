/**
 * AIデザインのLPを、上から下まで丸ごとスクリーンショットするスクリプト。
 *
 * 使い方：
 *   1. Figma Make のプロジェクトで npm run dev を実行して、表示されたURLを確認する
 *   2. このポートフォリオのフォルダで、次のように実行する
 *        npm run capture -- recruit http://localhost:8443
 *      （recruit / beauty / cafe の部分は aiSamples.ts の slug と同じにする）
 *   3. public/images/ai/ に「slug-pc.jpg」と「slug-sp.jpg」ができる
 */
import { chromium } from 'playwright';
import { mkdir } from 'node:fs/promises';
import path from 'node:path';

const [slug, url] = process.argv.slice(2);

if (!slug || !url) {
  console.error('使い方: npm run capture -- <slug> <URL>');
  console.error('例:     npm run capture -- recruit http://localhost:8443');
  process.exit(1);
}

const outDir = path.resolve('public/images/ai');
await mkdir(outDir, { recursive: true });

const views = [
  { name: 'pc', width: 1440, height: 900, scale: 1 },
  { name: 'sp', width: 390, height: 844, scale: 2 },
];

// ブラウザで撮れる高さには上限があるので、それを超えそうなときは解像度を下げる
const MAX_PIXELS_TALL = 16000;

// CHROME_PATH を指定すると、そのブラウザを使う（普段は指定しなくてOK）
const browser = await chromium.launch(
  process.env.CHROME_PATH ? { executablePath: process.env.CHROME_PATH } : {},
);

try {
  for (const view of views) {
    // 1回目：ページの高さを測る
    let scale = view.scale;
    const context = await browser.newContext({
      viewport: { width: view.width, height: view.height },
      deviceScaleFactor: scale,
      isMobile: view.name === 'sp',
      hasTouch: view.name === 'sp',
    });
    const page = await context.newPage();
    await page.goto(url, { waitUntil: 'networkidle' });

    // 一番下までゆっくりスクロールして、遅れて出てくる画像やアニメーションを全部表示させる
    await page.evaluate(async () => {
      const step = window.innerHeight * 0.8;
      for (let y = 0; y < document.documentElement.scrollHeight; y += step) {
        window.scrollTo(0, y);
        await new Promise((r) => setTimeout(r, 250));
      }
      window.scrollTo(0, 0);
    });
    await page.waitForLoadState('networkidle');
    await page.evaluate(() => document.fonts.ready);
    await page.waitForTimeout(800);

    const height = await page.evaluate(() => document.documentElement.scrollHeight);
    if (height * scale > MAX_PIXELS_TALL) {
      scale = 1;
      await context.close();
      // 解像度を下げて撮り直す
      const ctx2 = await browser.newContext({
        viewport: { width: view.width, height: view.height },
        deviceScaleFactor: 1,
        isMobile: view.name === 'sp',
        hasTouch: view.name === 'sp',
      });
      const p2 = await ctx2.newPage();
      await p2.goto(url, { waitUntil: 'networkidle' });
      await p2.evaluate(async () => {
        const step = window.innerHeight * 0.8;
        for (let y = 0; y < document.documentElement.scrollHeight; y += step) {
          window.scrollTo(0, y);
          await new Promise((r) => setTimeout(r, 250));
        }
        window.scrollTo(0, 0);
      });
      await p2.waitForLoadState('networkidle');
      await p2.waitForTimeout(800);
      await save(p2, view.name);
      await ctx2.close();
    } else {
      await save(page, view.name);
      await context.close();
    }
  }
} finally {
  await browser.close();
}

async function save(page, name) {
  const file = path.join(outDir, `${slug}-${name}.jpg`);
  await page.screenshot({ path: file, fullPage: true, type: 'jpeg', quality: 80 });
  console.log(`保存しました: public/images/ai/${slug}-${name}.jpg`);
}
