import LocalStorageService from "../LocalStorageService";

const DELAY = 0;
const MyStoreService = new LocalStorageService('sticky-notes');

export const getStickersRequest = () => new Promise( resolve => setTimeout( () => resolve( MyStoreService.get() ), DELAY ) );
export const createStickerRequest = data => new Promise( resolve => setTimeout( () => resolve( MyStoreService.create(data) ), DELAY ) );
export const createManyStickerRequest = data => new Promise( resolve => setTimeout( () => resolve( MyStoreService.createMany(data) ), DELAY ) );
export const deleteStickerRequest = id => new Promise( resolve => setTimeout( () => resolve( MyStoreService.delete(id) ), DELAY ) );
export const updateStickerRequest = data => new Promise( resolve => setTimeout( () => resolve( MyStoreService.update(data) ), DELAY ) );