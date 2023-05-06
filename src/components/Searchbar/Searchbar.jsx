import { Component } from 'react';
import PropTypes from 'prop-types';
import { FiSearch } from 'react-icons/fi';
import style from './Searchbar.module.scss';

class Searchbar extends Component {
    state = {
        value: '',
    };

    handleChange = ({ target: { value } }) => {
        this.setState({ value });
    };

    handleSubmit = e => {
        e.preventDefault();
        this.props.onSubmit(this.state.value);
    };

    render() {
        return (
        <header className={style.searchbar}>
            <form className={style.searchForm} onSubmit={this.handleSubmit}>
            <button type="submit" className={style.searchFormButton}>
                <FiSearch size={30} />
            </button>

            <input
                className={style.searchFormInput}
                type="text"
                autoComplete="off"
                autoFocus
                placeholder="Search images and photos"
                onChange={this.handleChange}
                value={this.state.value}
            />
            </form>
        </header>
        );
    }
}

Searchbar.propTypes = {
    onSubmit: PropTypes.func.isRequired,
};

export default Searchbar;