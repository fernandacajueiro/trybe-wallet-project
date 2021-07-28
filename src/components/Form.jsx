import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import {
  fetchCurrencies,
  handleInputs,
  handleTotal,
  stopEdit,
  handleDelete,
} from '../actions';

class Form extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: '',
      description: '',
      currency: 'USD',
      method: 'Dinheiro',
      tag: 'Alimentação',
    };
    this.buttonClick = this.buttonClick.bind(this);
    this.editExpense = this.editExpense.bind(this);
  }

  componentDidMount() {
    const { fetchDispatch } = this.props;
    fetchDispatch();
  }

  componentDidUpdate() {
    const { editing, stopDispatch } = this.props;
    if (editing) {
      this.editExpense();
      stopDispatch();
    }
  }

  editExpense() {
    const { editExpense } = this.props;
    this.setState({
      ...editExpense,
    });
  }

  handleInputs({ name, value }) {
    this.setState({
      [name]: value,
    });
  }

  valueInput() {
    const { value } = this.state;
    return (
      <label htmlFor="value-input">
        Valor:
        <input
          data-testid="value-input"
          type="number"
          id="value-input"
          name="value"
          onChange={ ({ target }) => this.handleInputs(target) }
          value={ value }
        />
      </label>
    );
  }

  descriptionInput() {
    const { description } = this.state;
    return (
      <label htmlFor="description-input">
        Descrição:
        <input
          data-testid="description-input"
          type="text"
          id="description-input"
          name="description"
          onChange={ ({ target }) => this.handleInputs(target) }
          value={ description }
        />
      </label>
    );
  }

  currenciesInput() {
    const { currencies } = this.props;
    const { currency } = this.state;
    return (
      <label htmlFor="currency-input">
        Moedas:
        <select
          data-testid="currency-input"
          id="currency-input"
          name="currency"
          onChange={ ({ target }) => this.handleInputs(target) }
          value={ currency }
        >
          {currencies.map((cu) => (
            <option
              data-testid={ cu }
              key={ cu }
              value={ cu }
            >
              { cu }
            </option>
          ))}
        </select>
      </label>
    );
  }

  methodInput() {
    const { method } = this.state;
    return (
      <label htmlFor="method-input">
        Método de pagamento:
        <select
          data-testid="method-input"
          id="method-input"
          name="method"
          onChange={ ({ target }) => this.handleInputs(target) }
          value={ method }
        >
          <option>Dinheiro</option>
          <option>Cartão de crédito</option>
          <option>Cartão de débito</option>
        </select>
      </label>
    );
  }

  tagInput() {
    const { tag } = this.state;
    return (
      <label htmlFor="tag-input">
        Categoria:
        <select
          data-testid="tag-input"
          id="tag-input"
          name="tag"
          onChange={ ({ target }) => this.handleInputs(target) }
          value={ tag }
        >
          <option>Alimentação</option>
          <option>Lazer</option>
          <option>Trabalho</option>
          <option>Transporte</option>
          <option>Saúde</option>
        </select>
      </label>
    );
  }

  buttonInput() {
    const { isEditingButton } = this.props;
    return (
      <button type="button" onClick={ this.buttonClick }>
        { isEditingButton ? 'Editar despesa' : 'Adicionar despesa' }
      </button>
    );
  }

  async fetchRates() {
    const endpoint = 'https://economia.awesomeapi.com.br/json/all';
    const response = await fetch(endpoint);
    const object = await response.json();
    delete object.USDT;
    return object;
  }

  async buttonClick() {
    const { value, description, currency, method, tag, id } = this.state;
    const {
      stateDispatch, expenses,
      valueDispatch, isEditingButton,
      newExpensesDispatcher,
    } = this.props;
    const rates = await this.fetchRates();
    const obj = {
      id: expenses.length,
      value,
      description,
      currency,
      method,
      tag,
      exchangeRates: rates,
    };
    if (isEditingButton) {
      const updatedExpenses = expenses.map((expense) => {
        if (expense.id === id) {
          return this.state;
        } return expense;
      });
      return newExpensesDispatcher(updatedExpenses);
    }
    stateDispatch(obj);
    valueDispatch(parseFloat(value) * parseFloat(rates[currency].ask));
    this.setState({
      value: '',
      description: '',
      currency: 'USD',
      method: 'Dinheiro',
      tag: 'Alimentação',
    });
  }

  render() {
    return (
      <form>
        <fieldset>
          { this.valueInput() }
          { this.descriptionInput() }
          { this.currenciesInput() }
          { this.methodInput() }
          { this.tagInput() }
          { this.buttonInput() }
        </fieldset>
      </form>
    );
  }
}
const mapStateToProps = (state) => ({
  currencies: state.wallet.currencies,
  expenses: state.wallet.expenses,
  editExpense: state.wallet.editExpense,
  editing: state.wallet.editing,
  isEditingButton: state.wallet.isEditingButton,
});
const mapDispatchToProps = (dispatch) => ({
  fetchDispatch: () => dispatch(fetchCurrencies()),
  stateDispatch: (obj) => dispatch(handleInputs(obj)),
  valueDispatch: (value) => dispatch(handleTotal(value)),
  stopDispatch: () => dispatch(stopEdit()),
  newExpensesDispatcher: (expenses) => dispatch(handleDelete(expenses)),
});
Form.propTypes = {
  fetchDispatch: PropTypes.func.isRequired,
  currencies: PropTypes.arrayOf(PropTypes.string).isRequired,
  stateDispatch: PropTypes.func.isRequired,
  expenses: PropTypes.arrayOf(PropTypes.object).isRequired,
  valueDispatch: PropTypes.func.isRequired,
  editExpense: PropTypes.shape({}).isRequired,
  editing: PropTypes.bool.isRequired,
  stopDispatch: PropTypes.func.isRequired,
  isEditingButton: PropTypes.bool.isRequired,
  newExpensesDispatcher: PropTypes.func.isRequired,
};
export default connect(mapStateToProps, mapDispatchToProps)(Form);
