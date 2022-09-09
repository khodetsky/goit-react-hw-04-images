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
    if (status === "initial") {
      return;
    }
    getUser(searchValue, page).then(r => { setImages(r.data.hits); setStatus("done") });
  }, [searchValue]);

  useEffect(() => {
    if (page !== 1) {
      getUser(searchValue, page).then(r => {setImages([...images , ...r.data.hits])})
    }
  }, [page]);

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
  }

  const onFormSubmit = ({ searchValue }, { resetForm }) => {
    setSearchValue(searchValue);
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

// export class App extends Component {
//   state = {
//     page: 1,
//     searchValue: "",
//     images: [],
//     currentImage: {},
//     status: "initial",
//     showModal: false,
//   }

//   componentDidUpdate(_, prevState) {
//     if (this.state.searchValue !== prevState.searchValue) {
//       getUser(this.state.searchValue, this.state.page).then(r => { this.setState({ images: r.data.hits, status: "done" }) });
//     }

//     if (this.state.page !== prevState.page && this.state.page !== 1) {
//       getUser(this.state.searchValue, this.state.page).then(r => {this.setState({images: [...prevState.images , ...r.data.hits]})})
//     }
//   }

//   toggleModal = () => {
//     this.setState(prevState => ({showModal: !prevState.showModal}))
//   }

//   findCurrentImage = (e) => {
//     const selectImage = this.state.images.find(image => image.webformatURL === e.target.src)
//     this.setState({ currentImage: selectImage })
//     this.toggleModal();
//   }

//   loadMore = () => {
//     this.setState(prevState => ({ page: prevState.page + 1 })); 
//   }

//   onFormSubmit = ({searchValue}, { resetForm }) => {
//     this.setState({searchValue, page: 1, status: "loading"});
//     resetForm();
//   }

//   render() {
//     const {status, images, currentImage } = this.state;

//     return (
//     <>
//         <Searchbar onSubmit={this.onFormSubmit} />

//         {status === "done" && (
//           <>
//             <ImageGallery images={images} onModalOpen={this.findCurrentImage} />
//             <LoadMoreBtn onLoadMore={this.loadMore} />
//           </>
//         )}

//         {status === "loading" && (<Loader />)}

//         {this.state.showModal && (
//           <Modal onClose={this.toggleModal}><img src={currentImage.largeImageURL} alt={currentImage.tags}
//             style={{ width: "100%", height: "100%", objectFit: "cover" }} /></Modal>
//         )}
//       <GlobalStyle/>
//     </>
//   );
//   }
// };
