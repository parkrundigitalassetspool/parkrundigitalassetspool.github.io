const search = document.querySelector('#search');
const cards = [...document.querySelectorAll('.asset-card')];
const empty = document.querySelector('#empty');
const language = document.querySelector('#language');
const parkrunLink = document.querySelector('#parkrun-link');
let currentLanguage = 'en';

function setLanguage(lang) {
  currentLanguage = lang;
  document.documentElement.lang = lang;
  language.textContent = lang === 'en' ? 'DE' : 'EN';
  parkrunLink.setAttribute('href', 'https://www.parkrun.com.de/');
  parkrunLink.textContent = 'parkrun.com.de ↗';
  search.placeholder = search.dataset[`placeholder${lang === 'en' ? 'En' : 'De'}`];
  document.querySelectorAll('[data-en][data-de]').forEach((element) => {
    element.textContent = element.dataset[lang];
  });
  document.querySelectorAll('.card-title[data-en]').forEach((element) => {
    const [german, english] = element.dataset.en.split(' | ');
    element.textContent = lang === 'en' ? (english || german) : german;
  });
  document.querySelectorAll('.asset-group h3[data-en]').forEach((element) => {
    const [german, english] = element.dataset.en.split(' | ');
    element.textContent = lang === 'en' ? (english || german) : german;
  });
  document.querySelectorAll('.card-title').forEach((element, index) => {
    if (/^Asset folder \d+$/.test(element.textContent) || /^Asset-Ordner \d+$/.test(element.textContent)) {
      element.textContent = lang === 'en' ? `Asset folder ${String(index + 1).padStart(2, '0')}` : `Asset-Ordner ${String(index + 1).padStart(2, '0')}`;
    }
  });
  document.querySelectorAll('.card-link').forEach((element) => {
    if (!element.dataset.en) element.textContent = lang === 'en' ? 'Open Drive folder ↗' : 'Drive-Ordner öffnen ↗';
  });
}

language.addEventListener('click', () => setLanguage(currentLanguage === 'en' ? 'de' : 'en'));
setLanguage('en');
search.addEventListener('input', (event) => {
  const query = event.target.value.trim().toLowerCase();
  let visible = 0;
  cards.forEach((card) => {
    const matches = card.textContent.toLowerCase().includes(query);
    card.hidden = !matches;
    if (matches) visible += 1;
  });
  empty.style.display = visible ? 'none' : 'block';
});
