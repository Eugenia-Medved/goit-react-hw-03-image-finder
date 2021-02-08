import s from './ImageGallery.module.css';

function ImageGallery({ children }) {
  return <ul className={s.ImageGallery}>{children}</ul>;
}

export default ImageGallery;
