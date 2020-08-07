import React, {Component} from "react";
import {map} from "underscore";

import Sticker from "../../containers/Sticker";
import './index.scss';

import { defaultSticker, startedSticker, sizes, colors } from '../../default-data'

import { ReactComponent as TrashIcon } from '../../assets/trash.svg'
import { ReactComponent as PlusIcon } from '../../assets/plus.svg'


export default class StickersArea extends Component {
	constructor(props) {
		super(props);
		this.state = {
			colors: [...colors],
			sizes: [...sizes],
			positions: ['center','left','right'],
			defaultSticker: {...defaultSticker},
			startedSticker: {...startedSticker}
		}
	}
	componentDidMount() {
		const { startedSticker } = this.state;
		if  ( !localStorage.getItem('notFirst') ){
			this.props.createSticker( {id:(new Date()).getTime(),...startedSticker})
			localStorage.setItem('notFirst', 1)
		}
		this.props.fetchStickers();
	}
	onChange(event){
		const { defaultSticker } = this.state;
		this.setState({
			defaultSticker: {...defaultSticker, [event.target.name]:event.target.value, }
		})
	}
	render() {
		const { defaultSticker, sizes=[], colors=[], } = this.state;
		const { stickers=[] } = this.props;

		return (
			<React.Fragment>
				<header className={'main-header'}>
					<h1 className={'main-title'}>Sticky Notes</h1>
					<div className={'create-form'}>
						<input  value={this.state.defaultSticker.title} name={'title'} onChange={this.onChange.bind(this)} autoComplete={'off'} placeholder={'title'}/>
						<input  value={this.state.defaultSticker.text} name={'text'} onChange={this.onChange.bind(this)} autoComplete={'off'} placeholder={'text'}/>
						<select value={this.state.defaultSticker.size} name={'size'} onChange={this.onChange.bind(this)} autoComplete={'off'}>
							{map(sizes, (size, i) => <option value={size} key={i}>{size}</option>)}
						</select>
						<input  value={this.state.defaultSticker.posX} name={'posX'} onChange={this.onChange.bind(this)} autoComplete={'off'} placeholder={'X position'} type={'number'} min={0}/>
						<input  value={this.state.defaultSticker.posY} name={'posY'} onChange={this.onChange.bind(this)} autoComplete={'off'} placeholder={'Y position'} type={'number'} min={0}/>

						<div className={'createBtn'} onClick={()=>this.props.createSticker({id:(new Date()).getTime(),...defaultSticker})}><PlusIcon/></div>
					</div>
				</header>

				<div className={'stickersArea'} id={'stickersArea'}>

					<div className={'trash'} id={'stickersTrash'}><TrashIcon/></div>

					{map(stickers, (sticker, i) => (
						<Sticker classList={'stickersArea__item'} sticker={sticker} colors={colors} key={i}/>
					))}

				</div>
			</React.Fragment>
		)
	}
}