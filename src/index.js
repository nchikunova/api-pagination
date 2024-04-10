import getTrending from './movies-api';
import * as basicLightbox from 'basiclightbox';
import 'basiclightbox/dist/basicLightbox.min.css';

const listRef = document.querySelector('.js-list');
// const loadMoreBtn = document.querySelector('.js-load');
const btnUpRef = document.querySelector('.btn-up_hide');
btnUpRef.addEventListener('click', onScrollUp);
listRef.addEventListener('click', onOpenModal);
// loadMoreBtn.addEventListener('click', onLoadMore);
// let currentPage = 1;

// function onLoadMore() {
//   currentPage += 1;
//   getTrending(currentPage)
//     .then(data => {
//       markupTrending(data.results);
//       if (data.page === data.total_pages) {
//         loadMoreBtn.hidden = true;
//       }
//     })
//     .catch(err => console.log(err));
// }

// getTrending()
//   .then(data => {
//     markupTrending(data.results);
//     observer.observe(target);
//     if (data.page !== data.total_pages) {
//       loadMoreBtn.hidden = false;
//       loadMoreBtn.style = 'display: block';
//     }
//   })
//   .catch(err => {
//     loadMoreBtn.hidden = false;
//     console.log(err);
//   });

// function markupTrending(arr) {
//   const markup = arr
//     .map(
//       ({ poster_path, release_date, title, overview, vote_average }) =>
//         `  <li class="movie-info"><img src="https://image.tmdb.org/t/p/w400${poster_path}" alt="${title}"><h2>${title}</h2><p>${overview}</p><p>Рейтинг: ${vote_average}</p><p>Дата виходу: ${release_date}</p></li>
// `
//     )
//     .join('');
//   listRef.insertAdjacentHTML('beforeend', markup);
// }
// let instance;
function onOpenModal(e) {
  if (e.target.nodeName !== 'IMG') {
    return;
  }
  window.addEventListener('keydown', onEscClose);
  instance = basicLightbox.create(`
      <img width="900" height="600" src=${e.target.dataset.largeUrl} alt=""/>;
  `);

  instance.show();
}

function onEscClose(e) {
  if (e.code === 'Escape') {
    instance.close();
    window.removeEventListener('keydown', onEscClose);
  }
}
window.addEventListener('scroll', () => {
  // determine the scrolling amount
  const scrollY = window.scrollY || document.documentElement.scrollTop;
  // if the page scrolled more 100px, then make the button visible, otherwise hide it
  scrollY > 100
    ? btnUpRef.classList.remove('btn-up_hide')
    : btnUpRef.classList.add('btn-up_hide');
});

function onScrollUp() {
  // when scrolling the page content
  // when click the button .btn-up
  window.scrollTo({
    top: 0,
    left: 0,
    behavior: 'smooth',
  });
}

/* Intersection Observer Infinite scroll */

const target = document.querySelector('.js-guard');

let options = {
  root: null,
  rootMargin: '300px',
  threshold: 1.0,
};

let observer = new IntersectionObserver(onLoad, options);
let currentPage = 498;

function onLoad(entries, observer) {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      currentPage += 1;
      getTrending(currentPage)
        .then(data => {
          markupTrending(data.results);
          observer.observe(target);
          if (data.page === data.total_pages) {
            //Відключаємо слідкування, після того як юзер доскролив до останньої сторінки
            observer.unobserve(target);
          }
        })
        .catch(err => {
          console.log(err);
        });
    }
  });
}

getTrending()
  .then(data => {
    markupTrending(data.results);
    observer.observe(target);
  })
  .catch(err => {
    console.log(err);
  });

function markupTrending(arr) {
  const markup = arr
    .map(
      ({
        backdrop_path,
        poster_path,
        release_date,
        title,
        overview,
        vote_average,
      }) =>
        `  <li class="movie-info"><img src="https://image.tmdb.org/t/p/w400${backdrop_path}" data-large-url='https://image.tmdb.org/t/p/w400${poster_path}' alt="${title}"><h2>${title}</h2><p>${overview}</p><p>Рейтинг: ${vote_average}</p><p>Дата виходу: ${release_date}</p></li>
`
    )
    .join('');
  listRef.insertAdjacentHTML('beforeend', markup);
}

//! Work with Bearer Token

/* const BASE_URL = 'https://the-one-api.dev/v2';
const END_POINT = '/character';
const KEY = 'RF4UsCJgs-bXshL_wx-F';

function getCharacter() {
  const params = new URLSearchParams({
    limit: 30,
    page: 1,
  });
  const options = {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${KEY}`,
    },
  };
  fetch(`${BASE_URL}${END_POINT}?${params}`, options).then(res => res.json());
}
getCharacter(); */
