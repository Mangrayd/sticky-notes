import { connect } from 'react-redux';
import {
	fetchStickers,
	createSticker,
	deleteSticker,
	updateSticker
} from '../store/state/actions';

import StickersArea from "../components/StickersArea";


const mapStateToProps = state => ({
	isFetching: state.stickers.isFetching,
	stickers: state.stickers.list,
});

const mapDispatchToProps = dispatch => ({
	fetchStickers: () => dispatch(fetchStickers.trigger()),
	createSticker: (data) => dispatch(createSticker.trigger(data)),
	deleteSticker: (id) => dispatch(deleteSticker.trigger(id)),
	updateSticker: (data) => dispatch(updateSticker.trigger(data))
});

export default connect(mapStateToProps, mapDispatchToProps)(StickersArea);