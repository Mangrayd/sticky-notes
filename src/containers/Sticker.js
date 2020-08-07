import { updateSticker, deleteSticker} from "../store/state/actions";
import {connect} from "react-redux";
import Sticker from "../components/Sticker";


const mapDispatchToProps = dispatch => ({
	updateSticker: (data) => dispatch(updateSticker.trigger(data)),
	deleteSticker: (id) => dispatch(deleteSticker.trigger(id)),
});

export default connect(()=>({}),mapDispatchToProps)(Sticker);