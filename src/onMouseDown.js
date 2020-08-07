export default function(options,DragEvent){
	const curEvent = {...DragEvent};
	const draggable = curEvent.target.closest('[draggable-el]');

	if ( !draggable ) return;

	const area = options.area;
	const trash = options.trash;

	const TRASH_INTERSECTION_FACTOR = 0.1;
	const LIST_INTERSECTION_FACTOR = 0.8;

	const shiftX = curEvent.pageX - draggable.offsetLeft;
	const shiftY = curEvent.pageY - draggable.offsetTop;

	const trashIntersectionBoudaryTop = trash.offsetTop-draggable.clientHeight*(1-TRASH_INTERSECTION_FACTOR);
	const trashIntersectionBoudaryBottom = trash.offsetTop+trash.clientHeight;
	const trashIntersectionBoudaryLeft = trash.offsetLeft-draggable.clientWidth*(1-TRASH_INTERSECTION_FACTOR);
	const trashIntersectionBoudaryRight = trash.offsetLeft+trash.clientWidth;

	const listIntersectionBoudaryTop = 0;
	const listIntersectionBoudaryBottom = area.clientHeight-draggable.clientHeight*(1-LIST_INTERSECTION_FACTOR);
	const listIntersectionBoudaryLeft = 0;
	const listIntersectionBoudaryRight = area.clientWidth-draggable.clientWidth*(1-LIST_INTERSECTION_FACTOR);

	const isInTrash = (posY,posX) => {
		return ( posY >= trashIntersectionBoudaryTop && posY < trashIntersectionBoudaryBottom ) &&
			( posX >= trashIntersectionBoudaryLeft && posX < trashIntersectionBoudaryRight )
	};

	const moveAt = (e) => {

		const posY = e.pageY-shiftY;
		const posX = e.pageX-shiftX;

		isInTrash(posY,posX)
			? trash.classList.add('active')
			: trash.classList.remove('active');

		const offsetY = posY >= listIntersectionBoudaryTop
			? ( posY <= listIntersectionBoudaryBottom ? posY : listIntersectionBoudaryBottom )
			: listIntersectionBoudaryTop;

		const offsetX = posX >= listIntersectionBoudaryLeft
			? ( posX <= listIntersectionBoudaryRight ? posX : listIntersectionBoudaryRight )
			: listIntersectionBoudaryLeft;

		this.props.updateSticker({...this.props.sticker, posY: offsetY, posX: offsetX })
	};

	area.appendChild(draggable); // to move element to front

	document.onmousemove = DocumentEvent => moveAt(DocumentEvent);

	document.onmouseup = () => {

		document.onmousemove = null;
		draggable.onmouseup = null;

		const shiftX = curEvent.pageX - draggable.offsetLeft;
		const shiftY = curEvent.pageY - draggable.offsetTop;
		const posY = curEvent.pageY-shiftY;
		const posX = curEvent.pageX-shiftX;

		if ( isInTrash(posY,posX) ){
			this.props.deleteSticker(this.props.sticker.id);
			trash.classList.remove('active');
		}
	};
}