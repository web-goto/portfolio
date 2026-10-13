/**
 * 実績の「絞り込み」を担当するスクリプト。
 * （詳細ダイアログの開閉は dialogs.ts がまとめてやってるよ）
 */
type Filter = 'all' | 'lp' | 'site' | 'dev' | 'marketing';

export function setupWorks(): void {
  const filterButtons = document.querySelectorAll<HTMLButtonElement>('[data-filter]');
  const cards = document.querySelectorAll<HTMLLIElement>('#works-grid [data-category]');
  const status = document.getElementById('works-status');

  const applyFilter = (value: Filter): void => {
    let visible = 0;
    cards.forEach((card) => {
      const show = value === 'all' || card.dataset.category === value;
      card.hidden = !show;
      if (show) visible += 1;
    });
    filterButtons.forEach((btn) => {
      btn.setAttribute('aria-pressed', String(btn.dataset.filter === value));
    });
    if (status) status.textContent = `${visible}件の実績を表示しています`;
  };

  filterButtons.forEach((btn) => {
    btn.addEventListener('click', () => applyFilter((btn.dataset.filter ?? 'all') as Filter));
  });
}
