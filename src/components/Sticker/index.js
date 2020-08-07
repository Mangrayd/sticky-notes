import React, {Component} from "react";
import './index.scss';

import {map} from "underscore";
import onMouseDown from '../../onMouseDown';

import {ReactComponent as TrashIcon} from '../../assets/trash.svg'
import {ReactComponent as DragIcon} from '../../assets/drag.svg'


export default class Sticker extends Component {
	constructor(props) {
		super(props);
		this.state = {
			caretPosStart: 0,
			caretPosEnd: 0,
		};
		this.textRef = React.createRef();
		this.titleRef = React.createRef();
	}
	update(e){
		this.setState({
			caretPosStart: e.target.selectionStart,
			caretPosEnd: e.target.selectionEnd,
		});
		this.props.updateSticker({...this.props.sticker,[e.target.name]:e.target.value})
	}
	updateColor(color){
		const { color:curColor } = this.props.sticker;
		if (color === curColor) return false;
		this.props.updateSticker({...this.props.sticker, color:color})
	}
	componentDidMount() {
		this.setState({
			stickersArea:document.getElementById('stickersArea'),
			stickersTrash:document.getElementById('stickersTrash'),
		})
	}
	componentDidUpdate(prevProps, prevState, snapshot) {
		// need to save caret position
		this.textRef.current.setSelectionRange(this.state.caretPosStart,this.state.caretPosEnd);
		this.titleRef.current.setSelectionRange(this.state.caretPosStart,this.state.caretPosEnd);
	}

	render() {
		const { classList='', colors=[]} = this.props;
		const { id, title, text, posY, posX, color:curColor, size="M"} = this.props.sticker;

		const StickerStyles = { "backgroundColor":curColor, "top":posY+'px', "left":posX+'px' };
		const dragOptions = { area:this.state.stickersArea, trash:this.state.stickersTrash };

		return (
			<div className={'Sticker ' + classList} draggable-el={''} style={StickerStyles} data-size={size}>
				<header className={'Sticker__header'}>
					<button className={'Sticker__btn Sticker__btn--left dragEl'} onMouseDown={onMouseDown.bind(this,dragOptions)}><DragIcon/></button>
					<input className={'Sticker__title'} name={'title'} ref={this.titleRef} title={title} value={title} autoComplete={'off'} onChange={this.update.bind(this)} placeholder={'title'}/>
					<button className={'Sticker__btn Sticker__btn--right'} onClick={()=>this.props.deleteSticker(id)}><TrashIcon/></button>
				</header>

				<textarea className={'Sticker__text'} name={'text'} ref={this.textRef} value={text} autoComplete={'off'} onChange={this.update.bind(this)} placeholder={'text'}/>

				<div className={'Sticker__colors'}>
					{map(colors,(color,i)=>(
						<div className={'Sticker__colors-item'+(curColor===color ? ' active' : '')} onClick={ ()=>this.updateColor(color)} style={{"backgroundColor":color}} key={i}></div>
					))}
				</div>

			</div>
		)
	}
}
