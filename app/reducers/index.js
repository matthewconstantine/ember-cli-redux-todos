import redux from 'npm:redux';
const { combineReducers } = redux;

import todo from './todo';

function bindEmberStore(emberStore, fn) {
  return fn.bind(null, emberStore);
}

export default emberStore => combineReducers({
  // Add additional reducers here in order of data dependency.
  todo: bindEmberStore(emberStore, todo)
});
