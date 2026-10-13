/** 実績のカテゴリ。絞り込みボタンにも使われるよ */
export type WorkCategory = 'lp' | 'site' | 'dev' | 'marketing';

export const categoryLabels: Record<WorkCategory, string> = {
  lp: 'LP制作',
  site: 'サイト制作・改修',
  dev: '開発',
  marketing: '採用マーケティング',
};

export interface Work {
  /** URLやidに使う、英数字とハイフンだけの名前 */
  slug: string;
  title: string;
  /** 依頼主。非公開案件なら「大手企業」など伏せた表現にする */
  client: string;
  category: WorkCategory;
  /** 一覧に出る一言説明 */
  summary: string;
  period: string;
  role: string[];
  tech: string[];
  /** 画像。非公開案件は書かなくてOK（自動で文字のカードになる） */
  image?: string;
  /** 公開中のページ。無ければ書かなくてOK */
  url?: string;
  /** true にすると「非公開案件」として表示される */
  confidential?: boolean;
  /** 詳細に出す「課題・工夫・結果」。空なら表示されない */
  challenge?: string;
  approach?: string;
  result?: string;
  /** 一覧の先頭に出したい実績は true */
  featured?: boolean;
}
