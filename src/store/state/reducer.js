import { handleActions } from 'redux-actions';
import {rejectObjFromArrayByID, updateObjInArrayByID} from "../../utils";

import {
  fetchStickers,
  createSticker,
  createManyStickers,
  deleteSticker,
  updateSticker,
} from './actions';


const initialState = {
  isFetching: false,
  list: [],
};

export default handleActions({
  [fetchStickers.REQUEST]: state => ({ ...state, isFetching: true }),
  [fetchStickers.SUCCESS]: (state, {payload}) => ({ ...state, list:payload, isFetching: false }),
  [fetchStickers.FAILURE]: state => ({ ...state, isFetching: false }),

  [createSticker.REQUEST]: state => ({ ...state }),
  [createSticker.SUCCESS]: (state, {payload}) => ({ ...state, list:[ ...state.list, payload ] }),
  [createSticker.FAILURE]: state => ({ ...state }),

  [createManyStickers.REQUEST]: state => ({ ...state }),
  [createManyStickers.SUCCESS]: (state, {payload}) => ({ ...state, list:[ ...state.list, ...payload ] }),
  [createManyStickers.FAILURE]: state => ({ ...state }),

  [deleteSticker.REQUEST]: state => ({ ...state }),
  [deleteSticker.SUCCESS]: (state, {payload}) => ({ ...state, list:rejectObjFromArrayByID(payload, state.list) }),
  [deleteSticker.FAILURE]: state => ({ ...state }),

  [updateSticker.REQUEST]: state => ({ ...state }),
  [updateSticker.SUCCESS]: (state, {payload}) => ({ ...state, list:updateObjInArrayByID(payload, state.list) }),
  [updateSticker.FAILURE]: state => ({ ...state }),
}, initialState);
