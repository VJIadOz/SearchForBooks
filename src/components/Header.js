import '../styles/Header.css'
import React  from 'react'
import {connect} from 'react-redux'


function Header(props) {

    const inputBookRef = React.createRef();
    const categoriesRef = React.createRef();
    const sortingByRef = React.createRef();
    
    async function doFetch(){    
        const categorieOptions = categoriesRef.current.value;
        const sortingByOptions = sortingByRef.current.value;
        const targetBook = inputBookRef.current.value;
        
        if(!targetBook) return;
        props.switchStateLoadingPicture("ON");
        await fetch(`https://www.googleapis.com/books/v1/volumes?q=${targetBook}+subject:${(categorieOptions!=="all") ? categorieOptions :""}&orderBy=${sortingByOptions}&startIndex=0&maxResults=30&key=AIzaSyCcd3yzDrqSSLD8SyNnleU-UAaFX5pPHps`,{method: "get"})
        .then((response)=>{
            if(response.status === 200)
                return response.json();
            else console.log(`error ${response.status}`);
        })
        .then((data)=>doList(data, targetBook, categorieOptions, sortingByOptions));
    }

    function doList(data,targetBook,categorieOptions,sortingByOptions){
        props.switchMainContent();
        console.log(data);
        if(data.totalItems === 0){  props.setTotalItems(0); props.switchStateMainContent("NotFound"); props.switchStateLoadingPicture("OFF"); return; }
        let masForDisplay = data.items;
        let mas = [];
        let book = {};
        for(let i=0; i<masForDisplay.length;i++){
            let volumeinfo = masForDisplay[i].volumeInfo;
            book.authors = (volumeinfo['authors']) ? volumeinfo['authors'] : "" ;
            book.title = volumeinfo['title'];
            book.categorie = (volumeinfo['categories']) ? volumeinfo['categories'] : " ";
            book.imageLink = (volumeinfo['imageLinks']) ? volumeinfo['imageLinks'].thumbnail : "";
            book.id = masForDisplay[i].id;
            mas.push(book);
            book = {}
        }
        props.saveSearchParameters([targetBook,categorieOptions,sortingByOptions, 0]);
        props.setTotalItems(data.totalItems);
        props.displayList(mas); 
        props.switchStateMainContent("LIST_READY");
        props.setLoadMoreIndex();
        props.switchStateLoadingPicture("OFF");
        // console.log(mas);
    }

    return (
        <div className="Header">
            <div className="HeaderWrapper">
                <div className="HeaderTitleWrapper"><p>Search for books</p></div>
                <div className="searchBar">
                    <input className="seacrhInput" ref={inputBookRef}></input>
                    <div className="searchButton" onClick={()=>doFetch()}></div>
                </div>
                <div className="filterBar">
                    <p className="textCategories">Categories</p>
                    <select className="selectCategories" ref={categoriesRef}>
                        <option>all</option>
                        <option>art</option>
                        <option>biography</option>
                        <option>computers</option>
                        <option>history</option>
                        <option>medical</option>
                        <option>poetry</option>
                    </select>
                    <p className="textSortingBy">Sorting By</p>
                    <select className="selectSortingBy" ref={sortingByRef}>
                        <option>relevance</option>
                        <option>newest</option>
                    </select>
                </div>
            </div>
        </div>
    );
}
 

export default connect(
    (state)=>({
        
    }),
    (dispatch)=>({
        displayList: (list) =>{
            dispatch({type:"DISPLAY_LIST", List: list });
        },
        setTotalItems: (count) =>{
            dispatch({type:"DISPLAY_TOTALITEMS", count: count});
        },
        switchStateMainContent: (state)=>{
            dispatch({type: "SWITCH_STATEMAINCONTENT",state: state});
        },
        saveSearchParameters: (masParam) => {
            dispatch({type: "SAVE_SEARCHPARAMETERS", masParam: masParam});
        },
        setLoadMoreIndex: () => {
            dispatch({type: "SET_LOADMOREINDEX"})
        },
        resetLoadMoreIndex: () => {
            dispatch({type: "RESET_LOADMOREINDEX"})
        },
        switchStateLoadingPicture: (state) =>{
            dispatch({type:"SWITCH_STATELOADINGPICTURE", state: state});
        },
        switchMainContent: () => {
			dispatch({type: "DISPLAY_LISTBOOKS"})
		},
    })
)(Header);
