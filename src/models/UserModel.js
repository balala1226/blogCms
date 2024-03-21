export class UserModel{
    constructor(){
        this.id = '';
        this.title = '';
        this.blogImageUrl = '';
        this.content = '';
        this.date = new Date();
        this.user = '';
        this.comments = [];
        this.isPublished = false;
        this.reactions = [];
    }
}