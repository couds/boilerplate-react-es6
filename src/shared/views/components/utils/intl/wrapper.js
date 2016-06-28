import React, { Component } from 'react';
import { injectIntl } from 'react-intl';


class InternationalizationWrapper extends Component {
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
  intl: React.PropTypes.object,
};

export default injectIntl(InternationalizationWrapper);
