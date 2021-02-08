import PropTypes from 'prop-types';
import s from './Button.module.css';

function Button({ loadMore }) {
  return (
    <div className={s.Container}>
      <button type="button" className={s.Button} data-action="load-more" onClick={loadMore}>
        Load more
      </button>
    </div>
  );
}

Button.propTypes = {
  loadMore: PropTypes.func.isRequired,
};

export default Button;
