export default class Like {
    constructor(){
        this.likes = [];
    }

    addLike(id, author, image, title){
        const like = {
            id : id,
            author: author,
            image: image,
            title: title
        }
        this.likes.push(like);
        // update the local storage;
        this.setLikeStorage();
        return like;
    }

    deleteLike(id){
        const index = this.likes.findIndex(el => el.id === id);
        this.likes.splice(index,1);
        // update the local storage
        this.setLikeStorage();
    }

    isLiked(id){
        return this.likes.findIndex(el => el.id === id) !== -1;
    }

    getLikes(){
        return this.likes.length;
    }

    setLikeStorage(){
        localStorage.setItem('likes', JSON.stringify(this.likes));
    }

    getLikeStorage(){
        // if is empty string, the result is null
        const result = JSON.parse(localStorage.getItem('likes'));
        if(result){
            this.likes = result;
        }
    }
    
}