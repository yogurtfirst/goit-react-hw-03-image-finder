import PropTypes from 'prop-types';
import style from './ImageGalleryItem.module.scss';

const ImageGalleryItem = ({ image, tags, showModal }) => {
    return (
        <li className={style.imageGalleryItem}>
            <img src={image} alt={tags} className={style.imageGalleryItemImage} onClick={showModal} />
        </li>
    );
};

ImageGalleryItem.propTypes = {
    image: PropTypes.string.isRequired,
    tags: PropTypes.string.isRequired,
    showModal: PropTypes.func.isRequired,
};

export default ImageGalleryItem;