import React from 'react';
import { injectIntl, InjectedIntlProps } from 'react-intl';
import PropTypes from 'prop-types';


class InternationalizationWrapper extends React.Component {
  static propTypes = {
    ...InjectedIntlProps,
  }

  getChildContext() {
    return {
      intl: this.props.intl,
    };
  }
  render() {
    return this.props.children;
  }
}

InternationalizationWrapper.childContextTypes = {
  intl: PropTypes.object,
};

export default injectIntl(InternationalizationWrapper);
