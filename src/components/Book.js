import '../styles/Book.css'
import {useState, useEffect} from 'react'
import {connect} from 'react-redux'
import {Link} from "react-router-dom"

function Book(props) {
	const [authors, setAuthors] = useState();
	useEffect(() => {
	if(props.data.authors)
		setAuthors(props.data.authors.join(", "));
	}, []);
	return (
		<Link to={`/books/${props.data.id}`} className="Book" >
			<div className="imageBookWrapper">
				{props.data.imageLink=="" 
				?
				<div className="noImageBook"></div>
				:
				<img className="imageBook" src={props.data.imageLink}></img>
				}
				
			</div>
			<div className="categoryWrapper"><p>{props.data.categorie}</p></div>
			<div className="titleWrapper"><p>{props.data.title}</p></div>
			<div className="authorsWrapper"><p>{authors}</p></div>
		</Link>
  );
}

export default Book;