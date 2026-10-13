import { existsSync } from 'node:fs';
import path from 'node:path';

/*
 * AIで作成したデザインのサンプル。
 * 画像は npm run capture で public/images/ai/ に自動で保存できるよ（README参照）。
 *
 * 画像ファイルがまだ無いサンプルは、開発中（npm run dev）だけ「画像を追加してね」の枠で表示されて、
 * 公開用（npm run build）では自動で非表示になるよ。1件も画像が無ければセクションごと非表示。
 */
export interface AiSample {
  slug: string;
  title: string;
  /** 業種やジャンル */
  genre: string;
  /** 使ったAIツール */
  tool: string;
  /** PC版の画像（例：/images/ai/beauty-pc.webp） */
  image?: string;
  /** スマホ版の画像（あれば） */
  imageMobile?: string;
  /** スクショがページの途中までのときは true（全体表示の最後がふわっと消える） */
  partial?: boolean;
  /** コーディングして公開したページがあればURL */
  url?: string;
  /** 自分で手を加えたところなど、ひとこと（無ければ書かなくてOK） */
  note?: string;
}

export const aiSamples: AiSample[] = [
  {
    slug: 'recruit',
    title: '地域の工務店の職人募集LP',
    genre: '求人・採用',
    tool: 'Figma Make',
    image: '/images/ai/recruit-pc.jpg',
    imageMobile: '/images/ai/recruit-sp.webp',
    partial: true,
  },
  {
    slug: 'beauty',
    title: 'ヘアサロンの新規集客LP',
    genre: '美容・サロン',
    tool: 'Figma Make',
    image: '/images/ai/beauty-pc.jpg',
    imageMobile: '/images/ai/beauty-sp.webp',
    partial: true,
  },
  {
    slug: 'cafe',
    title: '個人経営カフェの来店促進LP',
    genre: '飲食・カフェ',
    tool: 'Figma Make',
    image: '/images/ai/cafe-pc.jpg',
    imageMobile: '/images/ai/cafe-sp.webp',
    partial: true,
  },
];

/** public フォルダに、その画像ファイルが本当にあるかを確かめる */
const fileExists = (src?: string): boolean =>
  !!src && existsSync(path.join(process.cwd(), 'public', src));

/** 画像ファイルが見つからないものは「画像なし」として扱う */
const checked: AiSample[] = aiSamples.map((s) => ({
  ...s,
  image: fileExists(s.image) ? s.image : undefined,
  imageMobile: fileExists(s.imageMobile) ? s.imageMobile : undefined,
}));

/** 実際にサイトに表示するサンプル（公開時は画像があるものだけ） */
export const shownAiSamples: AiSample[] = checked.filter((s) => s.image || s.imageMobile || import.meta.env.DEV);
