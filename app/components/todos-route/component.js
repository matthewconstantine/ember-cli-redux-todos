import Ember from 'ember';
import connect from 'ember-cli-redux/lib/connect';

const {
  Component,
  computed,
  computed: { filterBy },
  inject: { service }
} = Ember;

const TodosRouteComponent = Component.extend({
  store: service(),

  filtered: computed('todos.@each.isCompleted', 'filter', function() {
    switch(this.get('filter')) {
    case 'active':
      return this.get('active');
    case 'completed':
      return this.get('completed');
    default:
      return this.get('todos');
    }
  }),

  completed: filterBy('todos', 'isCompleted', true),
  active: filterBy('todos', 'isCompleted', false),
  allAreDone: computed.empty('active'),

  inflection: computed('active.length', function() {
    let active = this.get('active.length');
    return active === 1 ? 'item' : 'items';
  }).readOnly()
});

const stateMap = () => {
  return {
    newTitle: 'todo.newTitle'
  };
};

const actionMap = (dispatch, component) => {
  return {
    completeAll: 'COMPLETE_ALL',
    clearCompleted: 'CLEAR_COMPLETED',
    createTodo: (title) => dispatch({
      type: 'CREATE_TODO',
      store: component.get('store'),
      title
    })
  };
};

export default connect(stateMap, actionMap)(TodosRouteComponent);
