export default function stateLoadingPictureReducer(state="OFF", action){
    switch(action.state){
        case "ON":
            return "ON";
        case "OFF":
            return "OFF";
    }
    return state;
};