export default function selfLinkCurrentBookReducer(state="",action){
    if(action.type==="SAVE_SELFLINK"){
        return action.link;
    }
    return state;
};