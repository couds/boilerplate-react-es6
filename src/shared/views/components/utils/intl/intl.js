import React, { Component } from 'react';
import { connect } from 'react-redux';

import { IntlProvider, addLocaleData } from 'react-intl';

import en from 'react-intl/locale-data/en';
import es from 'react-intl/locale-data/es';

import PropTypes from 'prop-types';

import Wrapper from './wrapper';

class Intl extends Component {
  static propTypes = {
    locale: PropTypes.shape({
      language: PropTypes.string.isRequired,
      messages: PropTypes.object.isRequired,
    }).isRequired,
    children: PropTypes.node.isRequired,
  }

  constructor(props) {
    super(props);
    addLocaleData(en);
    addLocaleData(es);
  }

  render() {
    const formats = {
      number: {
        eur: { style: 'currency', currency: 'EUR' },
        usd: { style: 'currency', currency: 'USD' },
      },
    };

    return (
      <IntlProvider
        defaultLocale="en"
        locale={this.props.locale.language}
        messages={this.props.locale.messages}
        formats={formats}
        defaultFormats={formats}
      >
        <Wrapper>
          {this.props.children}
        </Wrapper>
      </IntlProvider>
    );
  }
}

function storeToProps(store) {
  return {
    data: store,
  };
}

export default connect(storeToProps)(Intl);
