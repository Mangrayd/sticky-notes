export default class LocalStorageService {
	constructor(name) {
		this.store = localStorage;
		this.name = name;
		!!this.store.getItem(this.name) || this.store.setItem(this.name,'[]');
	}

	_serialize(data){
		return JSON.stringify(data);
	}
	_deserialize(data){
		return JSON.parse(data);
	}
	_injectObjToArray(object, array){
		return [...array, object];
	}
	_rejectObjFromArray(id, array){
		return [...array.filter( item => item.id !== id)];
	}
	get(){
		return this._deserialize(this.store.getItem(this.name) || []);
	}
	create(data){
		const newArr = this._injectObjToArray(data, this.get());

		this.store.setItem(this.name,this._serialize(newArr));
		return data;
	}
	createMany(data){
		return this.store.setItem(this.name,this._serialize([...this.get(),...data])) || data;
	}
	update(data){
		const currentList = [...this.get()];
		const curItemIndex = currentList.findIndex(el => el.id === data.id);
					currentList[curItemIndex] = {...currentList[curItemIndex], ...data};

		this.store.setItem(this.name,this._serialize(currentList));
		return currentList[curItemIndex];
	}
	delete(id){
		const newArr = this._rejectObjFromArray(id, this.get());
		this.store.setItem(this.name,this._serialize(newArr));
		return id;
	}
}