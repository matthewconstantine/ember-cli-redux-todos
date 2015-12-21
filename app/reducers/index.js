import redux from 'npm:redux';
const { combineReducers } = redux;

import todo from './todo';

export default combineReducers({
  // Add additional reducers here in order of data dependency.
  todo
});
