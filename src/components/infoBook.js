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

        for(let key in resData.imageLinks){
            switch(key){
                case "extraLarge":
                    setdata({image:resData.imageLinks.extraLarge});
                    break;
                case "large":
                    setdata({image:resData.imageLinks.large});
                    break;
                case "medium":
                    setdata({image:resData.imageLinks.medium});
                    break;
                case "small":
                    setdata({image:resData.imageLinks.small});
                    break;
                case "thumbnail":
                    setdata({image:resData.imageLinks.thumbnail});
                    break;
                case "smallThumbnail":
                    setdata({image:resData.imageLinks.smallThumbnail});
                    break;
                default:
                    setdata({image: ""});
            }
        }
        let description = document.querySelector(".descriptionInfoWrapper");
        if(resData.description)
            description.insertAdjacentHTML('afterbegin', resData.description);
        else 
            description.insertAdjacentHTML('afterbegin', '<p>Описание отсутствует</p>');
        setdata({
            image: resData.imageLinks,
            authors: (resData.authors) ? resData.authors.join(", ") : "",
            categories: (resData.categories) ? resData.categories.join(", ") : "",
            title: resData.title,
        })
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