import React from 'react';
import { connect } from 'react-redux';
import Header from '../components/Header';
import Form from '../components/Form';
import ExpensesTable from '../components/ExpensesTable';

class Wallet extends React.Component {
  render() {
    return (
      <div>
        <Header />
        <Form />
        <ExpensesTable />
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  email: state.user.email,
});

export default connect(mapStateToProps)(Wallet);
