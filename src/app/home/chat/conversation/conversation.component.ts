import { Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { Conversation } from 'src/app/model/conversation';
import { ChatService } from 'src/app/services/chatservice';
import { SocketService } from 'src/app/services/socket.service';

@Component({
  selector: 'app-conversation',
  templateUrl: './conversation.component.html',
  styleUrls: ['./conversation.component.css']
})
export class ConversationComponent implements OnInit {
  isActive = true;
  @Output() ConversationId = new EventEmitter<Conversation>();
  @Input() lstData: any
  activeElement: any = null;
  Conversation: Conversation;
  idShop: string;
  lstShopConversation: Conversation;
  @ViewChild('conversation', {read:ElementRef}) conversation: ElementRef;
  constructor(public chatService: ChatService, private socketService: SocketService) {
    this.chatService.changeData().subscribe(res=>{
      this.lstData = res;
      console.log('conver', this.lstData);
    })
   }

  ngOnInit(): void {
    this.chatService.changeData().subscribe(res=>{
      this.lstData = res;
    })
    this.p_getChat();
  }
  getIdConversation(item: Conversation){
    item.unReadMessage = 0;
    this.activeElement = item.conversationId;
    this.ConversationId.emit(item);
  }
  getConversationShop() {
    this.chatService.getConversationShop(this.idShop).subscribe(res => {
      this.lstShopConversation = res;
      console.log("lstConversation", this.lstShopConversation)
    });
  }
  private p_getChat(): void
  {
    this.socketService.listen('chat').subscribe(data => {
      // debugger
      if (this.Conversation != null && data.conversationId === this.Conversation.conversationId) {
        if (this.socketService.socket.id !== data.socketId) {
          this.chatService.listMessage = [...this.chatService.listMessage, ...[data]];
          this.chatService.changeData().subscribe(res=>{
            
            this.lstData = res;
            console.log('conver', this.lstData);
          })        }
      }
      // this.chatService.getConversationShop(this.idShop);
    });
  }

}
