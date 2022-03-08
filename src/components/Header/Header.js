import './Header.css'
import React from 'react'
import {connect} from 'react-redux'
import {Link} from "react-router-dom"
import requestBooks from '../../functions/requestBooks.js'
import getBooks from '../../functions/doListBooks.js'

function Header(props) {

    const inputBookRef = React.createRef();
    const categoriesRef = React.createRef();
    const sortingByRef = React.createRef();

    function doFetch(){
        if(!inputBookRef.current.value) return;
        props.switchStateLoadingPicture("ON");
        let promise = requestBooks([inputBookRef.current.value, categoriesRef.current.value, sortingByRef.current.value, 0]);
        props.switchMainContent();
        promise.then((info) => { doList(info)})
    }
    function doList(data){
        console.log(data)
        if(data.totalItems === 0){  props.setTotalItems(0); props.switchStateMainContent("NotFound"); props.switchStateLoadingPicture("OFF"); return; }
        let books = getBooks(data);
        console.log(books)
        props.saveSearchParameters([inputBookRef.current.value, categoriesRef.current.value, sortingByRef.current.value, 0]);
        props.setTotalItems(data.totalItems);
        props.displayList(books); 
        props.switchStateMainContent("LIST_READY");
        props.setLoadMoreIndex();
        props.switchStateLoadingPicture("OFF");
    }

    return (
        <div className="Header">
            <div className="HeaderWrapper">
                <Link to={'/'} className="HeaderTitleWrapper"><p>Search for books</p></Link>
                <div className="searchBarWrapper">
                    <div className="searchBarMiniWrapper">
                        <input className="seacrhInput" ref={inputBookRef}></input>
                        <Link to={`/books`} className="searchButton" onClick={()=>doFetch()}></Link>
                    </div>
                </div>
                <div className="filterBarWrapper">
                    <div className="categoriesWrapper">
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
                    </div>
                    <div className="sortingByWrapper">
                        <p className="textSortingBy">Sorting By</p>
                        <select className="selectSortingBy" ref={sortingByRef}>
                            <option>relevance</option>
                            <option>newest</option>
                        </select>
                    </div>   
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
