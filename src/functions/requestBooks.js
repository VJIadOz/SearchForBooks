
export default async function(searchParameters) {
    let books = await fetch(`https://www.googleapis.com/books/v1/volumes?q=${searchParameters[0]}+subject:${(searchParameters[1]!=="all") ? searchParameters[1] :""}&orderBy=${searchParameters[2]}&startIndex=${searchParameters[3]}&maxResults=30&key=AIzaSyCcd3yzDrqSSLD8SyNnleU-UAaFX5pPHps`,{method: "get"})
    books = await books.json();
    return books
}