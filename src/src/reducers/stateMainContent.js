export default function stateMainContent(state="listbooks",action){
    if(action.type==="DISPLAY_LISTBOOKS"){
        return "listbooks"
    }
    if(action.type==="DISPLAY_VIEWBOOK"){
        return "infoBook"
    }
    return state;
};