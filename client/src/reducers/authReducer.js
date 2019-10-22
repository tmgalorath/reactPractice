import { SIGN_IN, SIGN_OUT } from "../actions/types"

const INITIAL_STATE = { isSignedIn: null, Id: null}

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case SIGN_IN :
            return { ...state, isSignedIn: true, Id: action.payload.Id}
        case SIGN_OUT:
            return {...state, isSignedIn: false, Id: null}
        default:
            return state
    }
}