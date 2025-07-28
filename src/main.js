// main.js
import { getImagesByQuery } from './js/pixabay-api';
import {
  createGallery,
  clearGallery,
  showLoader,
  hideLoader,
  showLoadMoreButton,
  hideLoadMoreButton,
} from './js/render-functions';

import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

const form = document.querySelector('.form');
const loadMoreBtn = document.getElementById('load-more');

let query = '';
let page = 1;
let totalPages = 0;

form.addEventListener('submit', async e => {
  e.preventDefault();
  const searchValue = e.target.elements.searchQuery.value.trim();
  if (!searchValue) return;

  query = searchValue;
  page = 1;
  clearGallery();
  hideLoadMoreButton();
  showLoader();

  try {
    const data = await getImagesByQuery(query, page);
    if (data.hits.length === 0) {
      iziToast.info({
        title: 'Oops',
        message: 'No images found',
        position: 'topRight',
      });
      return;
    }

    createGallery(data.hits);
    totalPages = Math.ceil(data.totalHits / 15);
    if (page < totalPages) showLoadMoreButton();
  } catch (err) {
    iziToast.error({
      title: 'Error',
      message: 'Something went wrong',
      position: 'topRight',
    });
  } finally {
    hideLoader();
  }
});

loadMoreBtn.addEventListener('click', async () => {
  page += 1;
  showLoader();
  hideLoadMoreButton();

  try {
    const data = await getImagesByQuery(query, page);
    createGallery(data.hits);
    scrollPage();

    if (page >= totalPages) {
      iziToast.info({
        message: "We're sorry, but you've reached the end of search results.",
        position: 'topRight',
      });
    } else {
      showLoadMoreButton();
    }
  } catch (err) {
    iziToast.error({
      title: 'Error',
      message: 'Failed to load more images',
      position: 'topRight',
    });
  } finally {
    hideLoader();
  }
});

function scrollPage() {
  const { height: cardHeight } = document
    .querySelector('.gallery')
    .firstElementChild.getBoundingClientRect();

  window.scrollBy({
    top: cardHeight * 2,
    behavior: 'smooth',
  });
}
