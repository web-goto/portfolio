/**
 * public フォルダにある画像のパスに、公開先のフォルダ（base）をつけて返す。
 *
 * GitHub Pages では、サイトのURLが「https://ユーザー名.github.io/リポジトリ名/」のように
 * フォルダ付きになることがある。そのとき「/images/a.webp」のままだと画像が見つからないので、
 * 画像を表示する場所では、このヘルパーを通して使うよ。
 */
export function asset(path: string): string;
export function asset(path?: string): string | undefined;
export function asset(path?: string): string | undefined {
  if (!path) return undefined;
  if (/^(https?:)?\/\//.test(path)) return path; // 外部URLはそのまま
  const base = import.meta.env.BASE_URL.replace(/\/$/, '');
  return `${base}${path.startsWith('/') ? path : `/${path}`}`;
}
