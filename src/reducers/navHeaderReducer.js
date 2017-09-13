export default function reducer(state={
	isOpen: false,
	modalOpen: false
}, action) {
	switch(action.type) {
		case "TOGGLE_NAV_HEADER": {
			return {...state, isOpen: !state.isOpen};
		}
		case "LOG_IN_MODAL_OPEN": {
			return {...state, modalOpen: !state.modalOpen};
		}
		default: {
			break;
		}
	}
	return state;
}