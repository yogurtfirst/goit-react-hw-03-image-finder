import { Component } from 'react';
import PropTypes from 'prop-types';
import ImageGalleryItem from '../ImageGalleryItem/ImageGalleryItem';
import Button from '../Button/Button';
import Loader from '../Loader/Loader';
import Modal from '../Modal/Modal';
import { fetchPictures } from '../../services/fetch';
import style from './ImageGallery.module.scss';

class ImageGallery extends Component {
    state = {
        images: [],
        page: 1,
        status: 'idle',
        isModalOpen: false,
        modalImg: '',
        modalAlt: '',
    };

    componentDidUpdate(prevProps, prevState) {
        const { page, images } = this.state;
        try {
            if (prevProps.query !== this.props.query) {
                fetchPictures(this.props.query, 1).then(response => {
                    if (!response.hits.length || response.hits.length === 0) {
                        this.setState({ status: 'rejected', images: response.hits });
                    }
                    if (response.hits.length > 0) {
                        this.setState({ images: response.hits, status: 'resolved', page: 1 });
                    }
                    if (images.length !== 0 && response.totalHits === images.length + response.hits.length) {
                        this.setState({ status: 'idle' });
                    }
                    console.log(this.state.status);
                });
            };
            if (page !== prevState.page && page !== 1) {
                fetchPictures(this.props.query, page).then(response => {
                    this.setState({
                        images: [...images, ...response.hits],
                        status: 'resolved',
                    });
                });
            };
        } catch (error) {
            console.error(error);
        };
    };

    showModal = event => {
        this.setState({ isModalOpen: true });
        this.getLargeImage(event);
    };

    closeModal = event => {
        if (event.target === event.currentTarget) this.setState({ isModalOpen: false, modalImg: '', modalAlt: '' });
    };

    getLargeImage = event => {
        const targetImage = this.state.images.find( item => item.webformatURL === event.target.src );
        this.setState({ modalImg: targetImage.largeImageURL, modalAlt: targetImage.tags });
    };

    onLoadMore = () => {
        this.setState({ status: 'pending', page: this.state.page + 1 });
    };

    render() {
        const { status, images, modalImg, isModalOpen } = this.state;
        return (
            <>
                {images.length !== 0 && (
                    <ul className={style.imageGallery}>
                        {this.state.images.map(({ id, webformatURL, tags }) => {
                            return (
                                <ImageGalleryItem key={id} image={webformatURL} tags={tags} showModal={this.showModal} />
                            );
                        })}
                    </ul>
                )}
                {status === 'pending' && <Loader />}
                {status !== 'idle' && status !== 'pending' && images.length !== 0 && <Button onLoadMore={this.onLoadMore} />}
                {status === 'rejected' && <p>No results for your request, try to search something else</p>}
                {isModalOpen && <Modal largeImage={modalImg} closeModal={this.closeModal} />}
            </>
        );
    }
}

ImageGallery.propTypes = {
    query: PropTypes.string.isRequired,
};

export default ImageGallery;