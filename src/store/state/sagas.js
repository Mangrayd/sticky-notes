import { takeEvery, put, call } from 'redux-saga/effects';


import {
  getStickersRequest,
  createStickerRequest,
  createManyStickerRequest,
  deleteStickerRequest,
  updateStickerRequest
} from '../../api/requests';
import {
  fetchStickers,
  createSticker,
  createManyStickers,
  deleteSticker,
  updateSticker
} from './actions';

const fetchStickersSaga = function* () {
  try {
    yield put(fetchStickers.request());
    const stickers = yield call(getStickersRequest);
    yield put(fetchStickers.success(stickers));
  } catch (error) {
    yield put(fetchStickers.failure());
  }
};

const createStickerSaga = function* ({payload}) {
  try {
    yield put(createSticker.request());
    const sticker = yield call(createStickerRequest, payload);
    yield put(createSticker.success(sticker));
  } catch (error) {
    yield put(createSticker.failure());
  }
};
const createManyStickerSaga = function* ({payload}) {
  try {
    yield put(createManyStickers.request());
    const stickers = yield call(createManyStickerRequest, payload);
    yield put(createManyStickers.success(stickers));
  } catch (error) {
    yield put(createManyStickers.failure());
  }
};
const deleteStickerSaga = function* ({payload}) {
  try {
    yield put(deleteSticker.request());
    const id = yield call(deleteStickerRequest, payload);
    yield put(deleteSticker.success(id));
  } catch (error) {
    yield put(deleteSticker.failure());
  }
};
const updateStickerSaga = function* ({payload}) {
  try {
    yield put(updateSticker.request());
    const sticker = yield call(updateStickerRequest, payload);
    yield put(updateSticker.success(sticker));
  } catch (error) {
    yield put(updateSticker.failure());
  }
};

const productsAllSagas = function* () {
  yield takeEvery(fetchStickers.TRIGGER, fetchStickersSaga);
  yield takeEvery(createSticker.TRIGGER, createStickerSaga);
  yield takeEvery(createManyStickers.TRIGGER, createManyStickerSaga);
  yield takeEvery(deleteSticker.TRIGGER, deleteStickerSaga);
  yield takeEvery(updateSticker.TRIGGER, updateStickerSaga);
};

export default productsAllSagas;
