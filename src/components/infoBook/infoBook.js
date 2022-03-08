import './InfoBook.css'
import {useEffect, useState} from 'react'
import requestInfoBook from '../../functions/requestInfoBook.js'

function InfoBook({match}) {
    const [data, setdata] = useState({image:"",title:"",authors:"",description:"",categories:""})

    useEffect(() => {
        let promise = requestInfoBook(match.params.id);
        promise.then((resData)=>formingData(resData.volumeInfo));
    }, [])

    function formingData(resData){
        let img;
        if(!resData.imageLinks) img = "";
        else{
            img = Object.values(resData.imageLinks).reverse()[0];
        }
        
        let description = document.querySelector(".descriptionInfoWrapper");
        if(resData.description)
            description.insertAdjacentHTML('afterbegin', resData.description);
        else 
            description.insertAdjacentHTML('afterbegin', '<p>Описание отсутствует</p>');
        setdata({
            image: img,
            authors: (resData.authors) ? resData.authors.join(", ") : "",
            categories: (resData.categories) ? resData.categories.join(", ") : "",
            title: resData.title,
        })
        console.log(resData)
    }

    return (
        <div className="infoBookWrapper">
            <div className="bookImageWrapper">
            {!data.image ?
                <div className="noBookImage"></div>
            :
                <img className="bookImage" style={{backgroundImage: `url(${data.image})`}}></img>
            }
            </div>
            <div className="infoBook">
                <div className="categoryInfoWrapper"><p>{data.categories}</p></div>
                <div className="titleInfoWrapper"><p>{data.title}</p></div>
                <div className="authorsInfoWrapper"><p>{data.authors}</p></div>
                <div className="descriptionInfoWrapper"></div>
            </div>
        </div>
    );
}

export default InfoBook;