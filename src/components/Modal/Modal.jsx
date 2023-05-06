import { Component } from 'react';
import PropTypes from 'prop-types';
import style from './Modal.module.scss';

class Modal extends Component {
    state = {
        modalImg: this.props.largeImage
    };

    onESC = ({ code }) => {
        if (code === 'Escape') this.props.closeModal(this.state);
    };

    componentDidMount() {
        window.addEventListener('keydown', this.onESC);
    }

    componentWillUnmount() {
        window.removeEventListener('keydown', this.onESC);
    }

    render() {
        const { closeModal, largeImage, tags } = this.props;
        return (
            <div className={style.overlay} onClick={closeModal}>
                <div className={style.modal}>
                    <img src={largeImage} alt={tags} />
                </div>
            </div>
        );
    }
}

Modal.propTypes = {
    closeModal: PropTypes.func.isRequired,
    largeImage: PropTypes.string.isRequired,
};

export default Modal;