import { ImageGalleryItem } from '../ImageGalleryItem/ImageGalleryItem';
import { ImageGalleryStyles } from './ImageGallery.styled';
import PropTypes from 'prop-types';

export const ImageGallery = ({ images, onModalOpen }) => {
    return (
        <>
            <ImageGalleryStyles>
                {images.map(({id, webformatURL, tags}) => (
                    <ImageGalleryItem key={id} picture={webformatURL} tags={tags} onModalOpen={onModalOpen} />
                ))}
            </ImageGalleryStyles>
        </>
    )
}

ImageGallery.propTypes = {
    images: PropTypes.arrayOf(PropTypes.object.isRequired).isRequired,
    onModalOpen: PropTypes.func.isRequired,
}
