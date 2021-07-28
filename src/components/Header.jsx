import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import image from './trybe.png';

class Header extends React.Component {
  render() {
    const { email, total } = this.props;
    const style = {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
    };
    return (
      <header style={ style }>
        <img src={ image } alt="trybe-logo" width="100" />
        <span data-testid="email-field">{`Email: ${email}`}</span>
        <span data-testid="total-field">{`Despesa total: ${!total ? 0 : total}`}</span>
        <span data-testid="header-currency-field">BRL</span>
      </header>
    );
  }
}

const mapStateToProps = (state) => ({
  email: state.user.email,
  total: state.wallet.total,
});

Header.propTypes = {
  email: PropTypes.string.isRequired,
  total: PropTypes.number.isRequired,
};

export default connect(mapStateToProps)(Header);
