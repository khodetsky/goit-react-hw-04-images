import { useState , useEffect} from 'react';

import { GlobalStyle } from './GlobalStyles';
import { Searchbar } from './Searchbar/Searchbar';
import { getUser } from './Api';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { LoadMoreBtn } from './LoadMoreBtn/LoadMoreBtn';
import { Loader } from './Loader/Loader';
import {Modal} from './Modal/Modal'

export const App = () => {
  const [page, setPage] = useState(1);
  const [searchValue, setSearchValue] = useState('');
  const [images, setImages] = useState([]);
  const [currentImage, setCurrentImage] = useState({});
  const [status, setStatus] = useState("initial");
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    if (searchValue === "") {
      return;
    }
    getUser(searchValue, page).then(r => { setImages(prevImages => [...prevImages , ...r.data.hits]); setStatus("done") });
  }, [page, searchValue]);

  const toggleModal = () => {
    setShowModal(prevState => (!prevState))
  }

  const findCurrentImage = (e) => {
    const selectImage = images.find(image => image.webformatURL === e.target.src)
    setCurrentImage(selectImage)
    toggleModal();
  }

  const loadMore = () => {
    setPage(prevState => (prevState + 1));
    setTimeout(() => {
      window.scrollBy({
        top: 520,
        behavior: "smooth",
      });
    }, 400)
  }

  const onFormSubmit = ({ searchValue }, { resetForm }) => {
    setSearchValue(searchValue);
    setImages([]);
    setPage(1);
    setStatus("loading");
    resetForm();
  }
    return (
    <>
        <Searchbar onSubmit={onFormSubmit} />

        {status === "done" && (
          <>
            <ImageGallery images={images} onModalOpen={findCurrentImage} />
            <LoadMoreBtn onLoadMore={loadMore} />
          </>
        )}

        {status === "loading" && (<Loader />)}

        {showModal && (
          <Modal onClose={toggleModal}><img src={currentImage.largeImageURL} alt={currentImage.tags}
            style={{ width: "100%", height: "100%", objectFit: "cover" }} /></Modal>
        )}
      <GlobalStyle/>
    </>
  );
};
