const stickers = [
	{id:1, title:"title 1", text:"text 1"},
	{id:2, title:"title 2", text:"text 2"},
];

const DELAY = 300;

export const createRequest = data => new Promise( resolve => setTimeout( () => resolve( data ), DELAY ) );
export const readAllRequest = () => new Promise( resolve => setTimeout( () => resolve( [...stickers] ), DELAY ) );
export const updateRequest = data => new Promise( resolve => setTimeout( () => resolve( data ), DELAY ) );
export const deleteRequest = id => new Promise( resolve => setTimeout( () => resolve( id ), DELAY ) );
