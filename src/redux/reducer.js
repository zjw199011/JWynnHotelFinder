import { combineReducers } from 'redux'

const accomadationData = ( state = '', action ) => {

	if ( action.type === "UPDATE_ACCOMADATION_DATA" ){
		return action.payload;
	} else 
		return state;
}

const currentLatLng = ( state = null, action ) => {

	if ( action.type === "UPDATE_CURRENT_LATLNG" ){
		return action.payload;
	} else 
		return state;
}

const searchKeyWords = ( state = '', action ) => {

	if ( action.type === "UPDATE_SEARCH_KEYWORDS" ){
		return action.payload;
	} else 
		return state;
}

const searchTypes = ( state = [], action ) => {

	if ( action.type === "UPDATE_SEARCH_TYPES" ){
		return action.payload;
	} else 
		return state;
}

const nearyByDistance = ( state = '', action ) => {

	if ( action.type === "UPDATE_NEARBY_DISTANCE" ){
		return action.payload;
	} else 
		return state;
}

const selectedAccomadation = ( state = {}, action ) => {

	if ( action.type === "UPDATE_SELECTED_ACCOMADATION" ){
		return action.payload;
	} else 
		return state;
}



const reducer = combineReducers({
	accomadationData,
	currentLatLng,
	searchKeyWords,
	searchTypes,
	nearyByDistance,
	selectedAccomadation
});

const rootReducer = (state, action) => {
    return reducer(state, action)
}

export default rootReducer;