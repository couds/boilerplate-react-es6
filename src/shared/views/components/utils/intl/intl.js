import React, { Component } from 'react';
import { connect } from 'react-redux';

import { IntlProvider, addLocaleData } from 'react-intl';
import Wrapper from './wrapper';

import en from 'react-intl/lib/locale-data/en';
import es from 'react-intl/lib/locale-data/es';
import fr from 'react-intl/lib/locale-data/fr';


class Intl extends Component {
  constructor(props) {
    super(props);
    addLocaleData(en);
    addLocaleData(es);
    addLocaleData(fr);
  }

  render() {
    const formats = {
      number: {
        eur: { style: 'currency', currency: 'EUR' },
        usd: { style: 'currency', currency: 'USD' },
      },
    };

    return (
      <IntlProvider defaultLocale="en" locale={this.props.locale.language}
        messages={this.props.locale.messages}
        formats={formats}
        defaultFormats={formats} >
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
