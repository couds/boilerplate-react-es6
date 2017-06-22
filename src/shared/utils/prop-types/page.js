import PropTypes from 'prop-types';

export default {
  location: PropTypes.shape({
    query: PropTypes.object.isRequired,
  }).isRequired,
  params: PropTypes.object.isRequired,
  dispatch: PropTypes.func.isRequired,
};
