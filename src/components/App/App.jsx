import { Component } from 'react';
import Searchbar from '../Searchbar/Searchbar';
import ImageGallery from '../ImageGallery/ImageGallery';
import style from './App.module.scss';

class App extends Component {
    state = {
        query: '',
    };

    onSubmit = query => {
        this.setState({ query });
    };

    render() {
        return (
            <div className={style.app}>
                <Searchbar onSubmit={this.onSubmit} />
                <ImageGallery query={this.state.query} />
            </div>
        );
    }
}

export default App;