import { Component } from 'react';
import { Searchbar } from '../Searchbar/Searchbar';
import { Container } from './App.styled';
import { ImageGallery } from 'components/ImageGallery/ImageGallery';
import { fetchImages } from 'api';

export class App extends Component {
  state = {
    page: 1,
    query: '',
    cards: [],
  };

  async componentDidUpdate(_, prevState) {
    const { page, query } = this.state;
    if (page !== prevState.page || query !== prevState.query) {
      try {
        const fetchedImages = await fetchImages(page, query);
        this.setState({
          cards: fetchedImages.hits,
        });
      } catch (error) {
        console.log(error);
      }
    }
  }

  getQuery = newQuery => {
    this.setState({
      query: newQuery,
    });
  };

  render() {
    return (
      <Container>
        <Searchbar onSubmit={this.getQuery} />
        {this.state.cards.length > 0 && (
          <ImageGallery images={this.state.cards} />
        )}
      </Container>
    );
  }
}
