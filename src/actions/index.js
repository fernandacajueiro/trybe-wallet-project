export const HANDLE_EMAIL = 'HANDLE_EMAIL';
export const HANDLE_CURRENCIES = 'HANDLE_CURRENCIES';
export const HANDLE_INPUTS = 'HANDLE_INPUTS';
export const HANDLE_TOTAL = 'HANDLE_TOTAL';
export const HANDLE_DELETE = 'HANDLE_DELETE';
export const HANDLE_NEW_TOTAL = 'HANDLE_NEW_TOTAL';
export const HANDLE_EDIT = 'HANDLE_EDIT';
export const STOP_EDIT = 'STOP_EDIT';

export const handleEmail = (email) => ({
  type: HANDLE_EMAIL,
  email,
});

export const handleCurrencies = (currencies) => ({
  type: HANDLE_CURRENCIES,
  currencies,
});

export const handleInputs = (obj) => ({
  type: HANDLE_INPUTS,
  obj,
});

export const handleTotal = (value) => ({
  type: HANDLE_TOTAL,
  value,
});

export const handleDelete = (expense) => ({
  type: HANDLE_DELETE,
  expense,
});

export const handleNewTotal = (newTotal) => ({
  type: HANDLE_NEW_TOTAL,
  newTotal,
});

export const handleEdit = (expense) => ({
  type: HANDLE_EDIT,
  expense,
});

export const stopEdit = () => ({
  type: STOP_EDIT,
});

export function fetchCurrencies() {
  return async (dispatch) => {
    try {
      const endpoint = 'https://economia.awesomeapi.com.br/json/all';
      const response = await fetch(endpoint);
      const object = await response.json();
      delete object.USDT;
      const currencies = Object.keys(object);
      return dispatch(handleCurrencies(currencies));
    } catch (error) {
      console.log(error);
    }
  };
}
