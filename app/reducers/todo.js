import Ember from 'ember';

const initialState = Ember.Object.create({
  todos: Ember.A(),
  filter: 'all',
  editingTodo: null,
  newTitle: "",
  promise: Ember.RSVP.resolve([])
});

export default function todo(emberStore, state = initialState, action = null) {
  switch (action.type) {
    case 'SET_FILTER':
      state.setProperties({filter: action.filter});
      return state;

    case 'REQUEST_TODOS':
      state.setProperties({promise: action.promise});
      return state;

    case 'RECEIVE_TODOS':
      state.setProperties({todos: action.todos.toArray()});
      return state;

    case 'CREATE_TODO':
      if (action.title && !action.title.trim()) {
        state.setProperties({newTitle: ""});
        return state;
      }

      let newTodo = emberStore.createRecord('todo', {
        title: action.title.trim()
      }); // side effect
      newTodo.save(); // side effect

      state.set('newTitle', '');
      state.todos.pushObject(newTodo);
      return state;

    case 'EDIT_TODO':
      let editingTodo = emberStore.peekRecord('todo', action.id);
      state.setProperties({editingTodo});
      return state;

    case 'UPDATE_TODO':
      let updatedTodo = emberStore.peekRecord('todo', action.id);
      updatedTodo.set('title', action.title); // side effect
      updatedTodo.save(); // side effect
      state.setProperties({editingTodo: null});
      return state;

    case 'REMOVE_TODO':
      let removedTodo = emberStore.peekRecord('todo', action.id);
      removedTodo.destroyRecord(); // side effect
      const remaining = state.todos.filter(todo => todo !== removedTodo);
      state.setProperties({todos: remaining});
      return state;

    case 'TOGGLE_COMPLETED':
      let completedTodo = emberStore.peekRecord('todo', action.id);
      completedTodo.toggleProperty('isCompleted'); // side effect
      completedTodo.save(); // side effect
      return state;

    case 'COMPLETE_ALL':
      const allAreDone = state.todos.every((todo) => {
        return todo.get('isCompleted');
      });
      const todos = state.todos.map((todo) => {
        todo.set('isCompleted', !allAreDone);  // side effect
        return todo;
      });
      state.set({todos});
      return state;

    case 'CLEAR_COMPLETED':
      const uncompleted = state.todos.reduce((acc, todo) => {
        if (todo.get('isCompleted')) {
          todo.destroyRecord(); // side effect
        } else {
          acc.push(todo);
        }
        return acc;
      }, []);
      state.set('todos', uncompleted);
      return state;

  default:
    return state;
  }
}
