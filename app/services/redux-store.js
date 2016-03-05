import Ember from 'ember';
import ReduxStore from 'ember-cli-redux/services/redux-store';
import reducer from '../reducers/index';

export default ReduxStore.extend({
  reducer,

  dispatch(action) {
    console.log('hey! ', action)
    this._super.apply(this, arguments);
  }
});

