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
      let promise = this.store.findAll('todo');
      this.dispatch({type: 'REQUEST_TODOS', promise});
      return (dispatch) => {
        promise.then((todos) => {
          dispatch({
            type: 'RECEIVE_TODOS',
            todos
          });
        });
      };
    }
  },

  model(params) {
    this.dispatchAction('setFilter', params.filter);
    this.dispatchAction('requestTodos');
    return this.get('state.todo.promise').then(()=> {
      return null; // unnecessary, but ensures the UI only deals with redux state
    });
  }

});
