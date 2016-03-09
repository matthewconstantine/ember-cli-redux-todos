import Ember from 'ember';
import connect from 'ember-cli-redux/lib/connect';

const {computed} = Ember;

const Component = Ember.Component.extend({
  tagName: 'li',
  classNameBindings: ['todo.isCompleted:completed', 'isEditing:editing'],

  isEditing: computed('editingTodo', 'todo', function() {
    return this.get('editingTodo.id') === this.get('todo.id');
  })
});

const stateMap = {
  editingTodo: 'todo.editingTodo',
};

const actionMap = (dispatch) => {
  return {
    editTodo: (todo) => {
      dispatch({
        type: 'EDIT_TODO',
        todo,
      });
    },

    save: (todo, title) => {
      dispatch({
        type: 'UPDATE_TODO',
        todo,
        title
      });
    },

    removeTodo: (todo) => {
      dispatch({
        type: 'REMOVE_TODO',
        todo
      });
    },

    toggleCompleteTodo: (todo) => {
      dispatch({
        type: 'TOGGLE_COMPLETED',
        todo
      });
    }
  };
};

export default connect(stateMap, actionMap)(Component);

