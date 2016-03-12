import ReduxStore from 'ember-cli-redux/services/redux-store';
import reducer from '../reducers/index';
import emberLoggerMiddleware from 'ember-cli-redux/lib/ember-logger-middleware';
import config from '../config/environment';

const logger = emberLoggerMiddleware({
  enabled: config.environment === 'dev'
});

export default ReduxStore.extend({
  reducer,

  middleware: [logger],
});
