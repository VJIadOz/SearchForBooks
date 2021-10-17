export default function listReducer(state=[],action){
    if(action.type==="DISPLAY_LIST"){
        return [...action.List]
    }
    if(action.type==="INCREASE_LIST"){
        return [...state, ...action.addList];
    }
    return state;
};