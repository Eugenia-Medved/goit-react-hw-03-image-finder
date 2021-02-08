import { Component } from 'react';
import Loader from 'react-loader-spinner';

// import { toast } from 'react-toastify';
import fetchPicture from 'services/pixabayAPI';
import ImageGallery from 'components/ImageGallery';
import ImageGalleryItem from 'components/ImageGalleryItem';
import Button from 'components/Button/Button';

// const Status = {
//   IDLE: 'idle',
//   PENDING: 'pending',
//   RESOLVED: 'resolved',
//   REJECTED: 'rejected',
// };

class BodyGallery extends Component {
  state = {
    hits: null,
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
      fetchPicture(nextSearch, this.state.page)
        .then(data => this.setState({ hits: data.hits, page: prevState.page + 1 }))
        .catch(error => this.setState({ error: true }))
        .finally(() => this.setState({ loading: false }));
    }
  }

  getDataForGallery = () => {
    const search = this.props.search;

    this.setState(prevState => ({
      loading: true,
      hits: prevState.hits,
    }));

    // console.log(this.state.hits);
    // console.log(this.state.search);
    // console.log(this.state.page);

    fetchPicture(search, this.state.page)
      .then(({ hits }) => {
        this.setState(prevState => ({
          hits: [...this.state.hits, ...hits],
          page: prevState.page + 1,
        }));
      })
      .catch(error => this.setState({ error }))
      .finally(() => this.setState({ loading: false }));
  };

  addSearch = name => {
    this.setState({ search: name });
  };

  loadMore = () => {
    this.getDataForGallery();
    // this.scrollPageToEnd();
  };

  onClickGalleryItem = (src, alt) => {
    // this.toggleModal();
    this.setState({ imageForModal: src, title: alt });
  };

  render() {
    const { hits, loading } = this.state;

    return (
      <>
        <ImageGallery>
          {hits && <ImageGalleryItem hits={hits} onClickGalleryItem={this.onClickGalleryItem} />}
        </ImageGallery>

        {loading === true && <Loader type="Rings" color="#00BFFF" height={200} width={200} />}
        {hits && <Button loadMore={this.loadMore} />}
        {/* {showModal && (
          <Modal onClick={this.onClickGalleryItem}>
            <img src={imageForModal} alt={title} />
          </Modal>
        )} */}
      </>
    );
  }
}

export default BodyGallery;
