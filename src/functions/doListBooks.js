export default function(data) {
    let mas = [];
    let book = {};
    for(let i=0; i<data.items.length;i++){
        let volumeinfo = data.items[i].volumeInfo;
        book.authors = volumeinfo['authors'] ? volumeinfo['authors'].length > 2 ? volumeinfo['authors'][0] + ", " + volumeinfo['authors'][1] : volumeinfo['authors'] : " "
        book.title = volumeinfo['title'].length > 60 ? volumeinfo['title'].substring(0,60) + "..." : volumeinfo['title'];
        book.categorie = (volumeinfo['categories']) ? volumeinfo['categories'].join(", ") : " ";
        book.imageLink = (volumeinfo['imageLinks']) ? Object.values(volumeinfo['imageLinks']).reverse()[0] : "";
        book.id = data.items[i].id;
        mas.push(book);

        book = {}
    }
    return mas;
}