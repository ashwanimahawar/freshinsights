export interface Post {
    _id: string;
    title: string;
    content: string;
    imgsrc: string;
    author: string;
    createdAt: Date;
    updatedAt: Date;
    comments?: string[];
}

