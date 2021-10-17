export default function stateLoadingReducer(state="NoSearch", action){
    switch(action.state){
        case "NotFound":
            return "NotFound";
        case "LIST_READY":
            return "LIST_READY";
    }
    return state;
};