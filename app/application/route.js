// routes/todos.js
import Ember from 'ember';
import EmberRedux from '../mixins/ember-redux';

export default Ember.Route.extend(EmberRedux, {
  reduxStore: Ember.inject.service(),
  state: Ember.computed.alias('reduxStore.state'),

  queryParams: {
    filter: { refreshModel: true }
  },

  model(params) {
    this.dispatch({type: 'SET_FILTER', filter: params.filter});
    return this.store.findAll('todo').then((todos) => {
      this.dispatch({
        type: 'RECEIVE_TODOS',
        todos
      });
    });
  }

});
