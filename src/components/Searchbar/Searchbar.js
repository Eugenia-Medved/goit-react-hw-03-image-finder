import React, { Component } from 'react';
import { BsSearch } from 'react-icons/bs';
import s from './Searchbar.module.css';

class Searchbar extends Component {
  state = {
    search: '',
  };

  handleChangeSearch = e => {
    this.setState({
      search: e.currentTarget.value.toLowerCase(),
    });
  };

  handleSubmit = e => {
    e.preventDefault();

    if (this.state.search.trim() === '') {
      // toast.error('Введите имя покемона.');
      return;
    }

    this.props.onSubmit(this.state.search);

    this.setState({ search: '' });
  };

  render() {
    return (
      <header className={s.Searchbar}>
        <form className={s.SearchForm} onSubmit={this.handleSubmit}>
          <input
            className={s.SearchFormInput}
            type="text"
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
            onChange={this.handleChangeSearch}
          />
          <button type="submit" className={s.SearchFormButton}>
            <BsSearch style={{ color: 'white' }} />
          </button>
        </form>
      </header>
    );
  }
}

export default Searchbar;
