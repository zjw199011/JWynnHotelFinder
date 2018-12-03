export const updateAccomadationData = function( data ) {

    return {
        type: 'UPDATE_ACCOMADATION_DATA',
        payload: data,
    }
}

export const updateLatLng = function( data ) {

    return {
        type: 'UPDATE_CURRENT_LATLNG',
        payload: data,
    }
}

export const updateKeyWords = function( data ) {

    return {
        type: 'UPDATE_SEARCH_KEYWORDS',
        payload: data,
    }
}

export const updateTypes = function( data ) {

    return {
        type: 'UPDATE_SEARCH_TYPES',
        payload: data,
    }
}
export const updateDistance = function( data ) {

    return {
        type: 'UPDATE_NEARBY_DISTANCE',
        payload: data,
    }
}

export const updateSelectedAccomadation = function( data ) {

    return {
        type: 'UPDATE_SELECTED_ACCOMADATION',
        payload: data,
    }
}