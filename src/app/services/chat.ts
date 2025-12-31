import { computed, Injectable, Signal, signal, WritableSignal } from '@angular/core';
import { Chat } from '../../interfaces/chat';
import { Message } from '../../interfaces/message';

@Injectable({
  providedIn: 'root',
})
export class ChatService {
  /* Mook de chats guardado */
  private _chats: WritableSignal<Chat[]> = signal(this.createMook())
  public readonly chats: Signal<Chat[]> = this._chats
  constructor (){}

  /* CARGA DATOS mook (de prueba) */
  private createMook (): Chat[]{
    const now = new Date().toISOString()
    return [
      {
        id: '1',
        name: 'Lucia',
        lastMessage: 'Nos vemos mañana',
        messages: [
          {
            id: '1',
            text: 'Hola!', 
            fromMe: false, 
            date: now
          },
          {
            id: '2',
            text: 'Que tal?', 
            fromMe: true, 
            date: now
          }
        ]
      }
    ]
  }

  getChatsSnapshot(): Chat[]{
    return this._chats()
  }



  /* Obtener chat por id */
  getChatSignal (id:string): Signal<Chat | undefined>{
    return computed(
      () => {
        return this._chats().find(chat => chat.id === id)
      })
  }

  /* Crear un chat */
  createChat (name: string): Chat{
    //Creo el chat a partir de los datos recibidos
    const new_chat : Chat = {
      id: Date.now().toString(),
      name: name,
      lastMessage: '',
      messages: []
    }
    /* Actualizo la señal */
    this._chats.update(
      (chats_actuales) => {
        return [...chats_actuales, new_chat ]
      }
    )
    return new_chat
  }

  sendMessage(chat_id:string, text: string, fromMe = true): Message | undefined {
    const new_message : Message = {
      id: Date.now().toString(),
      text: text,
      fromMe: fromMe,
      date: new Date().toISOString()
    }

    this._chats.update (
      (chats_actuales) => {
        return chats_actuales.map(
          (chat) => {
            /* Si no son el chat que quiero actualizar dejo el mensaje asi como esta */
            if(chat.id !== chat_id){
              return chat
            }
            const updated_messages = [...chat.messages, new_message]
            return {
              ...chat,
              messages: updated_messages,
              lastMessage: text
            }
          }
        )
      }
    )
    return new_message
  }

}
