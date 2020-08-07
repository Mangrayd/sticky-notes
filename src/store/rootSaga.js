import { all, fork } from 'redux-saga/effects';
import { routinePromiseWatcherSaga } from 'redux-saga-routines';

import stickersAllSagas from './state/sagas';

const rootSaga = function* () {
  yield all([
    fork(routinePromiseWatcherSaga),
    fork(stickersAllSagas),
  ]);
};

export default rootSaga;
