import './Loading.css';
import { connect } from 'react-redux';

function Loading(props) {
  return (
    (props.stateLoadingPicture === "ON") && 
        <div className="pictureLoadingWrapper">
            <div className="pictureLoading"></div>
        </div>
  );
}

export default connect(
    (state)=>({
        stateLoadingPicture: state.stateLoadingPictureReducer
    }),
)(Loading);
