import { fileHandle } from "./File-handle";

export class PostPayload {
    id!: string;
    title!: string;
    content!: string;
    userName!: string;
    category!: string;
    createdOn!: string;
    ImageUrl!: fileHandle[];
}