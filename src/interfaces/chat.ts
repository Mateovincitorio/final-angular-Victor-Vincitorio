import { Message } from "./message";

export interface Chat {
    id: string;
    name: string;
    lastMessage?: string;
    messages: Message[] 
}