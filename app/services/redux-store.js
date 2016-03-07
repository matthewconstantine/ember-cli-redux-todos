import ReduxStore from 'ember-cli-redux/services/redux-store';
import reducer from '../reducers/index';
import emberLoggerMiddleware from 'ember-cli-redux/lib/ember-logger-middleware';

const logger = emberLoggerMiddleware();

export default ReduxStore.extend({
  reducer,

  middleware: [logger],
});
