import PropTypes from 'prop-types';
import style from './Button.module.scss';

const Button = ({ onLoadMore }) => {
    return (<button className={style.button} onClick={onLoadMore}>Load More</button>);
};

Button.propTypes = {
    onLoadMore: PropTypes.func.isRequired,
};

export default Button;