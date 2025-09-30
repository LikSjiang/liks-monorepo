export default {
  '*.{js,jsx,ts,tsx,vue,html,css,less,scss,md}': ['cspell lint'],
  '*.{js,jsx,ts,tsx,vue,md}': ['prettier --write', 'eslint'],
};
