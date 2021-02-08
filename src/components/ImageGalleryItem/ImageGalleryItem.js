import React, { Component } from 'react';
import s from './ImageGalleryItem.module.css';

class ImageGalleryItem extends Component {
  render() {
    const { hits, onClickGalleryItem } = this.props;

    return hits.map(({ id, webformatURL, largeImageURL, tags }) => (
      <li
        key={id}
        className={s.ImageGalleryItem}
        onClick={() => onClickGalleryItem(largeImageURL, tags)}
      >
        <img src={webformatURL} alt={tags} className={s.ImageGalleryItemImage} />
      </li>
    ));
  }
}

export default ImageGalleryItem;
