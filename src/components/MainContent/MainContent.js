import {connect} from 'react-redux'
import BookItem from '../BookItem/BookItem.js'
import './MainContent.css'
import {useState, useEffect} from 'react'
import requestBooks from '../../functions/requestBooks.js'
import getBooks from '../../functions/doListBooks.js'

function MainContent(props) {
    const [visibleScrollButton, setVisibleScrollButton] = useState();
    useEffect(() => {
        window.addEventListener("scroll", handleScroll, { passive: true });
    }, []);
    
    function handleScroll(){
        const position = window.pageYOffset;
        setVisibleScrollButton(position > 400);
    }

    function doFetchForLoadMore(){
        props.setLoadMoreIndex();
        props.switchStateLoadingPicture("ON");
        let promise = requestBooks(props.searchParameters);
        promise.then((data)=>{increaseList(data)});
    }

    function increaseList(data){
        let newBooks = getBooks(data);
        props.increaseList(newBooks);
        props.switchStateLoadingPicture("OFF");
    }

    return (
        <>
            {props.stateMainContent === "listbooks" && props.stateLoading === "NotFound" && 
                    <div className="titleFoundWrapper">
                        <p className="titleFound">Found {props.totalItems} results</p>
                    </div>
            }
            {props.stateMainContent === "listbooks" && (props.stateLoading === "LIST_READY") && 
                <div className="MainContent">
                    <div className="titleFoundWrapper">
                        <p className="titleFound">Found {props.totalItems} results</p>
                    </div>
                    <div className="list">
                        {props.list.map((value)=>
                            <BookItem data={value} />
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
            {visibleScrollButton && 
                <div className="scrollToUpButton" onClick={()=>window.scrollTo(0,0)}>
                    <p>🠕</p>
                </div>
            }       
        </>
        
    );
}

export default connect(
    (state)=>({
        list: state.listReducer,
        stateLoading: state.stateLoadingReducer,
        totalItems: state.totalItemsReducer,
        searchParameters: state.searchParametersReducer,
        stateMainContent: state.stateMainContent
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