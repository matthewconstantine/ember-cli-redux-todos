// routes/todos.js
import Ember from 'ember';
import EmberRedux from '../mixins/ember-redux';

export default Ember.Route.extend(EmberRedux, {
  reduxStore: Ember.inject.service(),
  state: Ember.computed.alias('reduxStore.state'),

  queryParams: {
    filter: { refreshModel: true }
  },

  reduxActions: {
    setFilter(filter) {
      return {type: 'SET_FILTER', filter};
    },
    requestTodos() {
      return {
        type: 'FETCH_TODOS',
        todos: this.store.findAll('todo')
      };
    }
  },

  model(params) {
    this.dispatchAction('setFilter', params.filter);
    this.dispatchAction('requestTodos');
    return this.get('state.todo.todos').then(()=> {
      return null; // unnecessary, but ensures the UI only deals with redux state
    });
  }

});
