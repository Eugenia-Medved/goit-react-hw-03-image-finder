import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { createPortal } from 'react-dom';
import s from './Modal.module.css';

const modalRoot = document.querySelector('#modal-root');

export default class Modal extends Component {
  componentDidMount() {
    window.addEventListener('keydown', this.handleKeyDown);
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this.handleKeyDown);
  }
  handleKeyDown = e => {
    const { onClick } = this.props;

    if (e.code === 'Escape') {
      onClick();
    }
  };
  handleBackdropClick = e => {
    const { onClick } = this.props;

    if (e.currentTarget === e.target) {
      onClick();
    }
  };
  render() {
    const { children } = this.props;

    return createPortal(
      <div className={s.Overlay} onClick={this.handleBackdropClick}>
        <div className={s.Modal}>{children}</div>
      </div>,
      modalRoot,
    );
  }
}

Modal.propTypes = {
  onClick: PropTypes.func.isRequired,
  children: PropTypes.object.isRequired,
};
