
export default async function(param) {
    let infoBook = await fetch(`https://www.googleapis.com/books/v1/volumes/${param}?key=AIzaSyCcd3yzDrqSSLD8SyNnleU-UAaFX5pPHps`, {method: 'get'})
    infoBook = await infoBook.json();
    return infoBook
}