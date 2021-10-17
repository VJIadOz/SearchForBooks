import '../styles/InfoBook.css'
import {useEffect, useState} from 'react'

function InfoBook(props) {
    const [data, setdata] = useState({image:"",title:"",authors:"",description:"",categories:""})
    useEffect(() => {
        fetch(`https://www.googleapis.com/books/v1/volumes/${props.id}?key=AIzaSyCcd3yzDrqSSLD8SyNnleU-UAaFX5pPHps`, {method: 'get'})
        .then((response)=>{
            if(response.status===200)
                return response.json();
            else console.log("Error " + response.status)
        })
        .then((resData)=>prepareData(resData.volumeInfo))
    }, [])

    function prepareData(resData){
        
        setdata({
            image: resData.imageLinks,
            authors: (resData.authors) ? resData.authors.join(", ") : "",
            categories: (resData.categories) ? resData.categories.join(", ") : "",
            title: resData.title,
            description: resData.description
        })
        console.log(resData)
    }

    return (
        <div className="infoBookWrapper">
            <div className="bookImageWrapper">
            {data.image === "" ?
                <div className="noBookImage"></div>
            :
                <img className="bookImage" style={{backgroundImage: `url(${data.image.medium})`}}></img>
            }
            </div>
            <div className="infoBook">
                <div className="categoryInfoWrapper"><p>{data.categories}</p></div>
                <div className="titleInfoWrapper"><p>{data.title}</p></div>
                <div className="authorsInfoWrapper"><p>{data.authors}</p></div>
                <div className="descriptionInfoWrapper"><p>{data.description}</p></div>
            </div>
        </div>
    );
}

export default InfoBook;