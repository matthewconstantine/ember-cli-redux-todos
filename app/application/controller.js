// controllers/todos.js
import Ember from 'ember';

export default Ember.Controller.extend({
  reduxStore: Ember.inject.service(),
  state: Ember.computed.alias('reduxStore.state'),

  filter: 'all',
  queryParams: [
    'filter'
  ],
});
