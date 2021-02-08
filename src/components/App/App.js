import React, { Component } from 'react';
// import { ToastContainer } from 'react-toastify';
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
        {/* <ToastContainer /> */}
      </>
    );
  }
}

export default App;
