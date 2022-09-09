import { Component } from 'react';

import { GlobalStyle } from './GlobalStyles';
import { Searchbar } from './Searchbar/Searchbar';
import { getUser } from './Api';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { LoadMoreBtn } from './LoadMoreBtn/LoadMoreBtn';
import { Loader } from './Loader/Loader';
import {Modal} from './Modal/Modal'

export class App extends Component {
  state = {
    page: 1,
    searchValue: "",
    images: [],
    currentImage: {},
    status: "initial",
    showModal: false,
  }

  componentDidUpdate(_, prevState) {
    if (this.state.searchValue !== prevState.searchValue) {
      getUser(this.state.searchValue, this.state.page).then(r => { this.setState({ images: r.data.hits, status: "done" }) });
    }

    if (this.state.page !== prevState.page && this.state.page !== 1) {
      getUser(this.state.searchValue, this.state.page).then(r => {this.setState({images: [...prevState.images , ...r.data.hits]})})
    }
  }

  toggleModal = () => {
    this.setState(prevState => ({showModal: !prevState.showModal}))
  }

  findCurrentImage = (e) => {
    const selectImage = this.state.images.find(image => image.webformatURL === e.target.src)
    this.setState({ currentImage: selectImage })
    this.toggleModal();
  }

  loadMore = () => {
    this.setState(prevState => ({ page: prevState.page + 1 })); 
  }

  onFormSubmit = ({searchValue}, { resetForm }) => {
    this.setState({searchValue, page: 1, status: "loading"});
    resetForm();
  }

  render() {
    const {status, images, currentImage } = this.state;

    return (
    <>
        <Searchbar onSubmit={this.onFormSubmit} />

        {status === "done" && (
          <>
            <ImageGallery images={images} onModalOpen={this.findCurrentImage} />
            <LoadMoreBtn onLoadMore={this.loadMore} />
          </>
        )}

        {status === "loading" && (<Loader />)}

        {this.state.showModal && (
          <Modal onClose={this.toggleModal}><img src={currentImage.largeImageURL} alt={currentImage.tags}
            style={{ width: "100%", height: "100%", objectFit: "cover" }} /></Modal>
        )}
      <GlobalStyle/>
    </>
  );
  }
};
