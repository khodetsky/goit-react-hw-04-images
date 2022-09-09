import { GalleryItem, GalleryItemImage } from './ImageGalleryItem.styled';
import PropTypes from 'prop-types';

export const ImageGalleryItem = ({ picture, tags, onModalOpen }) => {
    return (
        <GalleryItem onClick={onModalOpen}>
            <GalleryItemImage src={picture} alt={tags} />
        </GalleryItem>
    );
}

ImageGalleryItem.propTypes = {
    picture: PropTypes.string.isRequired,
    tags: PropTypes.string.isRequired,
    onModalOpen: PropTypes.func.isRequired,
}