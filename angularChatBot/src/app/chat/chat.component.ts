import { Component, Input, OnInit } from '@angular/core';
import { ResponseMessage } from '../models/response-message.model';
import { ChatService } from './chat.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {

  BACK_ENABLED: boolean = true;
  @Input('messages') messages: any[] = [];

  textInput = '';

  constructor(private chatService: ChatService) { }

  ngOnInit(): void {
    this.addBotMessage('Hello. How can I help you today?');
  }

  sendMessage(event: any) {
    console.log(event);
    const text = event.message;
    this.addUserMessage(text);

    //this.loading = true;

    this.chatService.sendMessage(text)
    .subscribe((res: ResponseMessage) => {
      if (res.responseMessage == '') {
        this.addBotMessage("I'm sorry, I don't understand that")
      }
      else {
        this.addBotMessage(res.responseMessage);
      }
      //this.loading = false;
    });
  }


  // Helpers

  addUserMessage(text: any) {
    this.messages?.push({
      text,
      sender: 'You',
      reply: true,
      //date: new Date()
    });
  }

  addBotMessage(text: any) {
    this.messages.push({
      text,
      sender: 'Bot',
      avatar: '/assets/bot.jpg',
      //date: new Date()
    });
  }

}
