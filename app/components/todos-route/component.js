import Ember from 'ember';
import EmberRedux from '../../mixins/ember-redux';

const {
  Component,
  computed,
  computed: { filterBy },
  inject: { service }
} = Ember;

export default Component.extend(EmberRedux, {
  store: service(),
  reduxStore: service(),
  state: computed.alias('reduxStore.state'),

  newTitle: computed.alias('state.todo.newTitle'),

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
  }).readOnly(),

  actions: {
    createTodo(title) {
      let store = this.get('store');
      this.dispatch({
        type: 'CREATE_TODO',
        store,
        title
      });
    },

    completeAll() {
      this.dispatch({ type: 'COMPLETE_ALL' });
    },

    clearCompleted() {
      this.dispatch({ type: 'CLEAR_COMPLETED'});
    }
  }
});
