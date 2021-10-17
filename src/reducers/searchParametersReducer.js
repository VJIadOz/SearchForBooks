
export default function searchParametersReducer(state=[], action){
    if(action.type==="SAVE_SEARCHPARAMETERS"){
        return [ action.masParam[0], action.masParam[1], action.masParam[2], action.masParam[3] ];
    }
    if(action.type==="SET_LOADMOREINDEX"){
        return [ state[0], state[1], state[2], state[3]+30 ];
    }
    if(action.type==="RESET_LOADMOREINDEX"){
        return [ state[0], state[1], state[2], 0 ];
    }
    return state;
};