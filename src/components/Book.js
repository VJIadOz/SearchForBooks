import '../styles/Book.css'

function Book(props) {
  return (
    <a className="Book">
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
      <div className="authorsWrapper"><p>{props.data.authors}</p></div>
    </a>
  );
}

export default Book;