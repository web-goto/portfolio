// @ts-check
import { defineConfig } from 'astro/config';

/*
 * GitHub Pages で公開するときの設定。
 * GitHub Actions の中でだけ、自動で「公開URL」と「フォルダ名（base）」を決めるよ。
 *   ・リポジトリ名が「ユーザー名.github.io」 → https://ユーザー名.github.io/
 *   ・それ以外のリポジトリ名                → https://ユーザー名.github.io/リポジトリ名/
 * 手元の npm run dev / build のときは、今まで通り普通に動くよ。
 */
const [owner, repo] = (process.env.GITHUB_REPOSITORY ?? '').split('/');
const onGithub = Boolean(process.env.GITHUB_ACTIONS && owner && repo);
const isUserSite = onGithub && repo.toLowerCase() === `${owner}.github.io`.toLowerCase();

export default defineConfig({
  site: onGithub ? `https://${owner}.github.io` : undefined,
  base: onGithub && !isUserSite ? `/${repo}` : '/',
});
