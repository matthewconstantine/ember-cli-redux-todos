import Ember from 'ember';

const initialState = {
  todos: Ember.A(),
  filter: 'all',
  editingTodo: null
};

export default function todo(state = initialState, action = null) {
  switch (action.type) {
    case 'SET_FILTER':
      return Object.assign({}, state, {
        filter: action.filter
      });

    case 'FETCH_TODOS':
      return Object.assign({}, state, {
        todos: action.todos
      });

    case 'ADD_TODO':
      return state; // TODO: add it for real

    case 'EDIT_TODO':
      return Object.assign({}, state, {editingTodo: action.todo});

    case 'UPDATE_TODO':
      // action.todo.set('title', action.title); // side effect
      // action.todo.save(); // side effect
      // debugger
      return Object.assign({}, state, {editingTodo: null});

    case 'REMOVE_TODO':
      action.todo.destroyRecord(); // side effect
      const remaining = state.todos.filter(todo => todo !== action.todo);
      return Object.assign({}, state, {todos: remaining});

    case 'TOGGLE_COMPLETED':
      action.todo.toggleProperty('isCompleted'); // side effect
      action.todo.save(); // side effect
      return state;

    case 'COMPLETE_ALL':
      const allAreDone = state.todos.every((todo) => {
        return todo.get('isCompleted');
      });
      const todos = state.todos.map((todo) => {
        todo.set('isCompleted', !allAreDone);  // side effect
        return todo;
      });
      return Object.assign({}, state, {todos});

    case 'CLEAR_COMPLETED':
      const uncompleted = state.todos.reduce((acc, todo) => {
        if (todo.get('isCompleted')) {
          todo.destroyRecord(); // side effect
        } else {
          acc.push(todo);
        }
        return acc;
      }, []);
      return Object.assign({}, state, {todos: uncompleted});

  default:
    return state;
  }
}
