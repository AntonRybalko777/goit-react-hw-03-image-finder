import { Header, Form, Button, Input } from './Searchbar.styled';
import { BsSearch } from 'react-icons/bs';

export const Searchbar = onSubmit => {
  return (
    <Header>
      <Form>
        <Button type="submit">
          <span>
            <BsSearch />
          </span>
        </Button>

        <Input
          class="input"
          type="text"
          autocomplete="off"
          autofocus
          placeholder="Search images and photos"
        />
      </Form>
    </Header>
  );
};
