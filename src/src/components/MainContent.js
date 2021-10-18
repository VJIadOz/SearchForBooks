import {connect} from 'react-redux'
import Book from './Book.js'
import '../styles/MainContent.css'
import InfoBook from "./infoBook.js"
import {useState, useEffect} from 'react'
// import script from '../scroll.js'

function MainContent(props) {
    const [scrollUp, setScrollUp] = useState();
    useEffect(() => {
        window.addEventListener("scroll", handleScroll, { passive: true });
    }, []);
    function handleScroll(){
        const position = window.pageYOffset;
        if (position > 400) {
            setScrollUp(true);
        }
        if (position < 401) {
            setScrollUp(false);
        }
    };

    const [selfId, setSelfId] = useState()
    function changeId(link){
        setSelfId(link)
    }

    async function doFetchForLoadMore(){
        props.setLoadMoreIndex();
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
            book.authors = (volumeinfo['authors']) ? volumeinfo['authors'] : "" ;
            book.title = volumeinfo['title'];
            book.title = (volumeinfo['categories']) ? volumeinfo['categories'] : " ";
            book.imageLink = (volumeinfo['imageLinks']) ? volumeinfo['imageLinks'].thumbnail : "";
            book.id = masForDisplay[i].id;
            mas.push(book);
            book = {}
        }
        
        props.increaseList(mas);
        props.switchStateLoadingPicture("OFF");
    }

    return (
        <>
            {props.stateMainContent === "listbooks" && props.stateLoading === "NotFound" 
                && 
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
                            <Book data={value} changeSelfLink={changeId}/>
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
            {props.stateMainContent === "infoBook" && 
                <InfoBook id={selfId}/>
            }
            {scrollUp && 
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