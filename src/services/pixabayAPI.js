function fetchPicture(search, page) {
  const key = '19406187-1c8edae385fab91e951e657a3';
  return fetch(
    `https://pixabay.com/api/?q=${search}&page=${page}&key=${key}&image_type=photo&orientation=horizontal&per_page=12`,
  ).then(response => {
    if (response.ok) {
      console.log(response);
      return response.json();
    }

    return Promise.reject(new Error(`По запросу ${search} ничего не найдено`));
  });
}

export default fetchPicture;
