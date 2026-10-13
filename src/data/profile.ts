/* プロフィール・サービス・料金まわりの文章はここで編集してね */

export const profile = {
  name: 'キノコ',
  role: 'Webエンジニア・LP制作',
  photo: '/images/me.webp',
  intro:
    '2019年に独学でHTML・CSSを学び、ヒアリングからテストまで一通りの制作を経験してきました。ECの商品特集LPや企業の採用サイトを数多く手がけ、2025年からはTypeScriptを使ったフロントエンド開発をメインに担当しています。やりとりはこまめに、仕上がりは丁寧に。見た人が次の一歩を踏み出したくなるWebをつくります。',
  email: 'hello@example.com', // 【記入】公開用のメールアドレス
  github: 'https://github.com/UeharaAika',
};

export const services = [
  {
    title: 'LP制作',
    body: '商品の特集ページや求人の応募ページなど、目的がはっきりした1ページを制作します。いただいたデザインのコーディングはもちろん、AIを活用したデザイン案づくりから公開まで一貫して対応できます。',
    examples: ['商品・キャンペーンの特集LP', '求人・採用の応募ページ'],
  },
  {
    title: 'Webサイトの改修',
    body: '今あるサイトを活かしたまま、見づらいところや古くなったところを直します。WordPressサイトの更新や機能追加にも対応します。',
    examples: ['デザインの部分リニューアル', 'WordPressのカスタマイズ'],
  },
  {
    title: 'フロントエンド開発',
    body: 'チーム開発の経験を活かして、保守しやすいコードでフロントエンドの実装を担当します。',
    examples: ['既存サービスの改修・機能追加', 'フロントエンドの実装'],
  },
];

/** 本当に順番がある内容なので、番号つきで表示するよ */
export const timeline = [
  { year: '2019', text: '独学でHTML・CSSを学び始める' },
  { year: '2020', text: 'Web制作の現場で、ヒアリングからテストまで幅広く担当。ECサイトの商品特集LPを多数制作し、WordPressでの企業サイト構築も' },
  { year: '2025', text: 'フロントエンドがメインの開発案件に参加。大手企業のWebサイト開発を担当' },
  { year: '現在', text: 'フロントエンド開発を続けながら、LP制作や、勉強中の採用マーケティングにも取り組む' },
];

export const skillGroups: { label: string; items: string[]; note?: string; learning?: boolean }[] = [
  { label: '開発', items: ['TypeScript', 'JavaScript', 'Vue.js', 'HTML', 'CSS', 'PHP'] },
  { label: 'CMS・ツール', items: ['WordPress', 'Git / GitHub', 'AWS', 'VS Code', 'FileZilla'] },
  {
    label: 'デザインツール',
    items: ['Figma', 'Photoshop', 'Illustrator', 'Adobe XD'],
    note: '基本操作、デザインデータからの書き出しや簡単な修正ができます。デザインをゼロから作る場合は、AIを活用して作成します。',
  },
  {
    label: 'マーケティング',
    items: ['Google Analytics', 'Google Tag Manager', 'Web広告'],
    note: '実務を通して勉強中です。アクセス解析の数字を見ながら、応募ページや広告の改善に少しずつ取り組んでいます。',
    learning: true,
  },
  { label: '資格', items: ['ITパスポート'] },
];

export const flow = [
  { title: 'ご相談', body: '困っていることや、実現したいことを気軽に教えてください。' },
  { title: 'ヒアリング・お見積もり', body: '目的やターゲット、ご予算をうかがって、内容と金額をご提案します。' },
  { title: '構成・デザイン', body: 'ページの構成を決めてから、デザインを確認していただきます。デザインはいただいたデータを使うか、AIを活用して作成します。' },
  { title: '制作・確認', body: 'コーディングして、スマホやPCでの表示を一緒にチェックします。' },
  { title: '公開・サポート', body: '公開後の修正や更新もご相談ください。継続的な改善にも対応します。' },
];

/**
 * 料金の目安（相場より少し抑えた、実績づくり中の価格）
 * 参考：個人・フリーランスへのLP依頼は、シンプルなもので10万円以下、オリジナルで10〜20万円くらいが相場。
 * 作業時間がわかってきたら、目標の時給から逆算して見直してね。
 */
export const prices = [
  {
    title: 'LP制作（デザイン込み）',
    price: '7万円〜',
    note: 'デザインをAIで効率よく作るので、デザイン込みでもお手頃に。デザイン支給のコーディングのみなら4万円〜',
  },
  { title: 'Webサイトの改修', price: '5,000円〜', note: 'テキストや画像の差し替えなど1箇所から。内容に応じてお見積もり' },
  { title: '保守・更新', price: '月8,000円〜', note: '定期的な更新や、ちょっとした修正の継続対応' },
];
