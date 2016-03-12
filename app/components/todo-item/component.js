import Ember from 'ember';
import EmberRedux from '../../mixins/ember-redux';

const {computed} = Ember;

export default Ember.Component.extend(EmberRedux, {
  reduxStore: Ember.inject.service(),
  state: computed.alias('reduxStore.state'),

  tagName: 'li',
  classNameBindings: ['todo.isCompleted:completed', 'isEditing:editing'],

  isEditing: computed('state.todo.editingTodo', 'todo', function() {
    return this.get('state.todo.editingTodo.id') === this.get('todo.id');
  }),

  actions: {
    editTodo(todo) {
      this.dispatch({
        type: 'EDIT_TODO',
        todo,
      });
    },

    save(todo, title) {
      this.dispatch({
        type: 'UPDATE_TODO',
        todo,
        title
      });
    },

    removeTodo(todo) {
      this.dispatch({
        type: 'REMOVE_TODO',
        todo
      });
    },

    toggleCompleteTodo(todo) {
      this.dispatch({
        type: 'TOGGLE_COMPLETED',
        todo
      });
    }
  }
});
