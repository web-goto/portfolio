/**
 * ページ内の <dialog> をまとめて管理するスクリプト。
 * data-open="ダイアログのid" のボタンを押すと開いて、
 * data-close のボタン・背景クリック・Escキーで閉じるよ。
 */
export function setupDialogs(): void {
  document.querySelectorAll<HTMLButtonElement>('[data-open]').forEach((btn) => {
    btn.addEventListener('click', () => {
      const dialog = document.getElementById(btn.dataset.open ?? '');
      if (dialog instanceof HTMLDialogElement) dialog.showModal();
    });
  });

  document.querySelectorAll<HTMLDialogElement>('dialog').forEach((dialog) => {
    dialog.querySelectorAll('[data-close]').forEach((el) => el.addEventListener('click', () => dialog.close()));
    dialog.addEventListener('click', (event) => {
      if (event.target === dialog) dialog.close();
    });
  });
}
