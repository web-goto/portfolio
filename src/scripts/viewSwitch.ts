/**
 * AIデザインの全体表示で「PC / スマホ」を切り替えるスクリプト。
 * data-view-group の中の data-view ボタンと data-panel を対応させているよ。
 * スマホで見ている人には、最初からスマホ版を見せるようにしてる。
 */
export function setupViewSwitch(): void {
  document.querySelectorAll<HTMLElement>('[data-view-group]').forEach((group) => {
    const buttons = group.querySelectorAll<HTMLButtonElement>('[data-view]');
    const panels = group.querySelectorAll<HTMLElement>('[data-panel]');
    buttons.forEach((btn) => {
      btn.addEventListener('click', () => {
        buttons.forEach((b) => b.setAttribute('aria-pressed', String(b === btn)));
        panels.forEach((p) => {
          p.hidden = p.dataset.panel !== btn.dataset.view;
          if (!p.hidden) p.scrollTop = 0;
        });
      });
    });

    // スマホで見ているときは、最初からスマホ版を表示する
    if (window.matchMedia('(max-width: 600px)').matches) {
      group.querySelector<HTMLButtonElement>('[data-view="sp"]')?.click();
    }
  });
}
