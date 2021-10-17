import {connect} from 'react-redux'
import Book from './Book.js'
import '../styles/MainContent.css'

function MainContent(props) {
    
    async function doFetchForLoadMore(){
        props.setLoadMoreIndex();
        alert(props.searchParameters[3])
        props.switchStateLoadingPicture("ON");
        await fetch(`https://www.googleapis.com/books/v1/volumes?q=${props.searchParameters[0]}+subject:${(props.searchParameters[1]!=="all") ? props.searchParameters[1] : ""}&orderBy=${props.searchParameters[2]}&startIndex=${props.searchParameters[3]+1}&maxResults=30&key=AIzaSyCcd3yzDrqSSLD8SyNnleU-UAaFX5pPHps`,{method: "get"})
        .then((response)=>{
            if(response.status === 200)
                return response.json();
            }
        )
        .then((data)=>formingAddList(data));
    }
    function formingAddList(data){
        let masForDisplay = data.items;
        let mas = [];
        let book = {};
        for(let i=0; i<masForDisplay.length;i++){
            let volumeinfo = masForDisplay[i].volumeInfo;
            book['authors'] = (volumeinfo['authors']) ? volumeinfo['authors'] : "" ;
            book['title'] = volumeinfo['title'];
            book['categorie'] = (volumeinfo['categories']) ? volumeinfo['categories'][0] : " ";
            book['imageLink'] = (volumeinfo['imageLinks']) ? volumeinfo['imageLinks'].thumbnail : "";
            mas.push(book);
            book = {}
        }
        console.log(mas);
        props.increaseList(mas);
        props.switchStateLoadingPicture("OFF");
    }

    return (
        <div>
            {
                (props.stateMainContent === "NotFound") && 
                <div className="titleFoundWrapper">
                    <p className="titleFound">Found {props.totalItems} results</p>
                </div>
            }
            {
                (props.stateMainContent === "LIST_READY") && 
                <div className="MainContent">
                    <div className="titleFoundWrapper">
                        <p className="titleFound">Found {props.totalItems} results</p>
                    </div>
                    <div className="list">
                        {props.list.map((value)=>
                            <Book data={value}/>
                        )}
                    </div>
                    {(props.totalItems > props.searchParameters[3]) &&
                        <div className="loadMoreWrapper">
                            <div className="loadMore" onClick={()=>doFetchForLoadMore()}>
                                <p className="loadMoreTitle">Load more</p>
                            </div>
                        </div>
                    }   
                </div>
            }  
        </div>
        
    );
}

export default connect(
    (state)=>({
        list: state.listReducer,
        stateMainContent: state.stateLoadingReducer,
        totalItems: state.totalItemsReducer,
        searchParameters: state.searchParametersReducer
    }),
    (dispatch) => ({
        setLoadMoreIndex: () => {
            dispatch({type: "SET_LOADMOREINDEX"})
        },
        increaseList: (additionalList) => {
            dispatch({type: "INCREASE_LIST", addList: additionalList});
        },
        switchStateLoadingPicture: (state) =>{
            dispatch({type:"SWITCH_STATELOADINGPICTURE", state: state});
        }
    })
)(MainContent);