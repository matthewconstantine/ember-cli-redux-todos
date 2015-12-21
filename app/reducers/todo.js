const initialState = {};

export default function todo(state = initialState, action) {
  switch (action.type) {
    case 'SET_FILTER':
      return Object.assign({}, state, {
        filter: action.filter
      });
    case 'REQUEST_TODOS':
      return Object.assign({}, state, {
        isLoading: true
      });
    case 'RECEIVE_TODOS':
      return Object.assign({}, state, {
        todos: action.todos,
        isLoading: false
      });
  default:
    return state;
  }
}
