import React, { Component } from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './App.css';
import Searchbar from 'components/Searchbar';
import BodyGallery from 'components/BodyGallery/BodyGallery';

class App extends Component {
  state = {
    search: '',
  };

  addSearch = name => {
    this.setState({ search: name });
  };

  render() {
    const { search } = this.state;
    return (
      <>
        <Searchbar onSubmit={this.addSearch} />
        <BodyGallery search={search} />
        <ToastContainer position="top-center" />
      </>
    );
  }
}

export default App;
