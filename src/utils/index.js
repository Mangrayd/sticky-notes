export const rejectObjFromArrayByID = (id, array) => [...array.filter( item => item.id !== id)];
export const injectObjToArray = (obj, array) => [...array, obj];
export const updateObjInArrayByID = (obj, array) => {
	const currentList = [...array];
	const curItemIndex = currentList.findIndex( el => el.id === obj.id );
				currentList[curItemIndex] = {...currentList[curItemIndex], ...obj};

	return currentList;
};
