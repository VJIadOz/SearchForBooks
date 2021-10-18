import '../styles/InfoBook.css'
import {useEffect, useState} from 'react'

function InfoBook({match},props) {
    const [data, setdata] = useState({image:"",title:"",authors:"",description:"",categories:""})
    useEffect(() => {
        fetch(`https://www.googleapis.com/books/v1/volumes/${match.params.id}?key=AIzaSyCcd3yzDrqSSLD8SyNnleU-UAaFX5pPHps`, {method: 'get'})
        .then((response)=>{
            if(response.status===200)
                return response.json();
            else console.log("Error " + response.status)
        })
        .then((resData)=>prepareData(resData.volumeInfo))
    }, [])

    function prepareData(resData){
        let img;
        if(!resData.imageLinks) img = "";
        else{
            if(resData.imageLinks.smallThumbnail) img = resData.imageLinks.smallThumbnail;
            if(resData.imageLinks.thumbnail) img = resData.imageLinks.thumbnail;
            if(resData.imageLinks.small) img = resData.imageLinks.small;
            if(resData.imageLinks.medium) img = resData.imageLinks.medium;
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
        // console.log(data)
        console.log(resData)
    }

    return (
        <div className="infoBookWrapper">
            <div className="bookImageWrapper">
            {data.image === "" ?
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