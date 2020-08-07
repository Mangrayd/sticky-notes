import { createRoutine } from 'redux-saga-routines';

export const fetchStickers = createRoutine('STICKERS/FETCH');
export const createSticker = createRoutine('STICKERS/CREATE');
export const createManyStickers = createRoutine('STICKERS/CREATE_MANY');
export const deleteSticker = createRoutine('STICKERS/DELETE');
export const updateSticker = createRoutine('STICKERS/UPDATE');
