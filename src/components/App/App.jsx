import { Component } from 'react';
import { Searchbar } from '../Searchbar/Searchbar';
import { Container, ErrorMsg } from './App.styled';
import { ImageGallery } from 'components/ImageGallery/ImageGallery';
import { fetchImages } from 'api';
import { ThreeDots } from 'react-loader-spinner';

export class App extends Component {
  state = {
    page: 1,
    query: '',
    cards: [],
    loader: false,
    error: false,
  };

  async componentDidUpdate(_, prevState) {
    const { page, query } = this.state;
    if (page !== prevState.page || query !== prevState.query) {
      try {
        this.setState({ loader: true });
        const fetchedImages = await fetchImages(page, query);
        this.setState({
          cards: fetchedImages.hits,
        });
      } catch (error) {
        this.setState({
          error: true,
        });
      } finally {
        this.setState({ loader: false });
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
        {this.state.loader && (
          <ThreeDots
            height="80"
            width="80"
            radius="9"
            color="#3f51b5"
            ariaLabel="three-dots-loading"
            wrapperStyle={{ display: 'flex', justifyContent: 'center' }}
            visible={true}
          />
        )}
        {this.state.error && (
          <ErrorMsg>
            Whoops.. Something went wrong. Please reload the page.{' '}
          </ErrorMsg>
        )}
        {this.state.cards.length > 0 && (
          <ImageGallery images={this.state.cards} />
        )}
      </Container>
    );
  }
}
