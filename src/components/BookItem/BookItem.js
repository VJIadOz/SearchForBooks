import './BookItem.css'
import {Link} from "react-router-dom"

function Book(props) {
	return (
		<Link to={`/books/${props.data.id}`} className="Book" >
			<div className="imageBookWrapper">
				{props.data.imageLink==="" 
				?
				<div className="noImageBook"></div>
				:
				<img className="imageBook" src={props.data.imageLink}></img>
				}
				
			</div>
			<div className="categoryWrapper"><p>{props.data.categorie}</p></div>
			<div className="titleWrapper"><p>{props.data.title}</p></div>
			<div className="authorsWrapper"><p>{props.data.authors}</p></div>
		</Link>
  );
}

export default Book;