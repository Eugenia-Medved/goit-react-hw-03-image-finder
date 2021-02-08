import { Component } from 'react';
import Loader from 'react-loader-spinner';

import { toast } from 'react-toastify';
import fetchPicture from 'services/pixabayAPI';
import ImageGallery from 'components/ImageGallery';
import ImageGalleryItem from 'components/ImageGalleryItem';
import Button from 'components/Button';
import Modal from 'components/Modal';

class BodyGallery extends Component {
  state = {
    hits: [],
    search: '',
    page: 1,
    messenge: 'Все пропало',
    loading: false,
    showModal: false,
    imageForModal: '',
    title: '',
  };

  componentDidMount() {}

  componentDidUpdate(prevProps, prevState) {
    const prevSearch = prevProps.search;
    const nextSearch = this.props.search;

    if (prevSearch !== nextSearch) {
      this.setState({ loading: true, page: 1 });
      this.loadData(nextSearch, this.state.page);
    }
  }

  getDataForGallery = () => {
    const search = this.props.search;

    this.setState(prevState => ({
      loading: true,
    }));

    this.loadData(search, this.state.page + 1);
  };

  loadData(search, page) {
    return fetchPicture(search, page)
      .then(({ hits, totalHits }) => {
        if (totalHits === 0) {
          toast.error(`По запросу ${search} ничего не найдено`);
        }
        this.setState(prevState => ({
          hits: page === 1 ? hits : [...prevState.hits, ...hits],
          page: page,
          totalHits: totalHits,
        }));
      })
      .catch(error => {
        toast.error(`Что-то пошло не так... Попробуйте позже`);
      })
      .finally(() => this.setState({ loading: false }));
  }

  addSearch = name => {
    this.setState({ search: name });
  };

  toggleModal = () => {
    this.setState(({ showModal }) => ({
      showModal: !showModal,
    }));
  };

  loadMore = () => {
    this.getDataForGallery();
    this.scrollPageToEnd();
  };

  scrollPageToEnd = () => {
    setTimeout(() => {
      window.scrollBy({
        top: document.documentElement.scrollHeight,
        behavior: 'smooth',
      });
    }, 500);
  };

  onClickGalleryItem = (src, alt) => {
    this.toggleModal();
    this.setState({ imageForModal: src, title: alt });
  };

  render() {
    const { hits, loading, showModal, imageForModal, title, totalHits } = this.state;

    return (
      <>
        {loading === true && <Loader type="Rings" color="#00BFFF" height={200} width={200} />}
        <ImageGallery>
          {hits.length !== 0 && (
            <ImageGalleryItem hits={hits} onClickGalleryItem={this.onClickGalleryItem} />
          )}
        </ImageGallery>

        {hits.length > 0 && hits.length < totalHits && <Button loadMore={this.loadMore} />}
        {showModal && (
          <Modal onClick={this.onClickGalleryItem}>
            <img src={imageForModal} alt={title} />
          </Modal>
        )}
      </>
    );
  }
}

export default BodyGallery;
