export default function totalItemsReducer(state=0,action){
    if(action.type==="DISPLAY_TOTALITEMS"){
        return action.count;
    }
    return state;
};