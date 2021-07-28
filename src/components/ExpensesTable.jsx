import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { handleDelete, handleNewTotal, handleEdit } from '../actions';

class ExpensesTable extends React.Component {
  tableInfo() {
    const { expenses, editExpenseDispatcher } = this.props;
    return expenses.map((expense) => (
      <tr key={ expense.id }>
        <td>{expense.description}</td>
        <td>{expense.tag}</td>
        <td>{expense.method}</td>
        <td>{expense.value}</td>
        <td>{expense.exchangeRates[expense.currency].name}</td>
        <td>{parseFloat(expense.exchangeRates[expense.currency].ask).toFixed(2)}</td>
        <td>
          {(parseFloat(expense.exchangeRates[expense.currency].ask) * expense.value)
            .toFixed(2)}
        </td>
        <td>Real</td>
        <td>
          <button
            type="button"
            data-testid="delete-btn"
            onClick={ () => this.deleteExpense(expense.id) }
          >
            Excluir
          </button>
          <button
            type="button"
            data-testid="edit-btn"
            onClick={ () => editExpenseDispatcher(expense) }
          >
            Editar
          </button>
        </td>
      </tr>));
  }

  deleteExpense(id) {
    const { expenses, newExpensesDispatcher, newTotalDispatcher } = this.props;
    const newExpenses = expenses.filter((expense) => expense.id !== id);
    newExpensesDispatcher(newExpenses);
    const newTotal = newExpenses
      .reduce((total, expense) => total + (
        expense.value * parseFloat(expense.exchangeRates[expense.currency].ask)), 0);
    newTotalDispatcher(newTotal);
  }

  render() {
    return (
      <table width="100%">
        <thead>
          <tr>
            <th>Descrição</th>
            <th>Tag</th>
            <th>Método de pagamento</th>
            <th>Valor</th>
            <th>Moeda</th>
            <th>Câmbio utilizado</th>
            <th>Valor convertido</th>
            <th>Moeda de conversão</th>
            <th>Editar/Excluir</th>
          </tr>
        </thead>
        <tbody>
          { this.tableInfo() }
        </tbody>
      </table>
    );
  }
}

const mapStateToProps = (state) => ({
  expenses: state.wallet.expenses,
});

const mapDispatchToProps = (dispatch) => ({
  newExpensesDispatcher: (expenses) => dispatch(handleDelete(expenses)),
  newTotalDispatcher: (total) => dispatch(handleNewTotal(total)),
  editExpenseDispatcher: (expense) => dispatch(handleEdit(expense)),
});

ExpensesTable.propTypes = {
  expenses: PropTypes.arrayOf(PropTypes.object).isRequired,
  newExpensesDispatcher: PropTypes.func.isRequired,
  newTotalDispatcher: PropTypes.func.isRequired,
  editExpenseDispatcher: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(ExpensesTable);
