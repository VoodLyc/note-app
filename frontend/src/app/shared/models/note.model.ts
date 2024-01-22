import { Tag } from "./tag.model";

export interface Note { 
    id: number;
    title: string;
    content: string;
    active: boolean;
    tags : Tag [];
}