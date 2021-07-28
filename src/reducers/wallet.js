import {
  HANDLE_CURRENCIES,
  HANDLE_INPUTS,
  HANDLE_TOTAL,
  HANDLE_DELETE,
  HANDLE_NEW_TOTAL,
  HANDLE_EDIT,
  STOP_EDIT,
} from '../actions';

const INITIAL_STATE = {
  currencies: [],
  expenses: [],
  total: 0,
  editExpense: {},
  editing: false,
  isEditingButton: false,
};

const wallet = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case HANDLE_CURRENCIES:
    return {
      ...state,
      currencies: action.currencies,
    };
  case HANDLE_INPUTS:
    return {
      ...state,
      expenses: [...state.expenses, action.obj],
      isEditingButton: false,
    };
  case HANDLE_TOTAL:
    return {
      ...state,
      total: state.total + action.value,
    };
  case HANDLE_DELETE:
    return {
      ...state,
      expenses: action.expense,
    };
  case HANDLE_NEW_TOTAL:
    return {
      ...state,
      total: action.newTotal,
    };
  case HANDLE_EDIT:
    return {
      ...state,
      editExpense: action.expense,
      editing: true,
      isEditingButton: true,
    };
  case STOP_EDIT:
    return {
      ...state,
      editing: false,
    };
  default:
    return state;
  }
};

export default wallet;
