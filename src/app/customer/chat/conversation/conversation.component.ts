import { Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { Conversation } from 'src/app/model/conversation';
import { ChatService } from 'src/app/services/chatservice';

@Component({
  selector: 'app-conversation',
  templateUrl: './conversation.component.html',
  styleUrls: ['./conversation.component.css']
})
export class ConversationComponent implements OnInit {
  isActive = true;
  @Output() ConversationId = new EventEmitter<Conversation>();
  @Input() lstData: any;
  activeElement: any = null;
  @ViewChild('conversation', {read:ElementRef}) conversation: ElementRef;
  constructor(public chatService: ChatService) {
    
   }

  ngOnInit(): void {
  }
  
  getIdConversation(item: Conversation){
    console.log(item);
    item.unReadMessage = 0;
    this.activeElement = item.conversationId;
    this.ConversationId.emit(item);
  }
}
