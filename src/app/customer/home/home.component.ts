import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { UserProfile } from 'src/app/model/user';
import { ActivatedRoute, Router } from '@angular/router';
import { Conversation } from 'src/app/model/conversation';
import { SocketService } from 'src/app/services/socket.service';
import { ChatService } from 'src/app/services/chatservice';
import { ConversationComponent } from '../chat/conversation/conversation.component';
import { AuthService } from 'src/app/services/auth-service.service';
import { shopService } from 'src/app/services/shopservice.service';
import { Message } from 'src/app/model/message';
import { Token } from 'src/app/model/token';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  user: UserProfile;
  isCollapsed = false;
  isConversation = false;
  Conversation: Conversation;
  lstShopConversation : Conversation;
  isShowConversation = false;
  Content: string;
  listConversationCustomer : Conversation;
  @ViewChild(ConversationComponent) conversationComponent: ConversationComponent;
    // @ViewChild(SearchComponent) searchComponent: SearchComponent;

  constructor(private auth: AuthService, public chatService: ChatService,private socketService: SocketService, private route: ActivatedRoute, private router: Router, private shopservice: shopService) {
   
   }

  ngOnInit(): void {
    if(!this.auth.loginIn()){
      this.router.navigate(['customer/login']);
    }
    let token = {} as Token;
    token.accessToken  = localStorage.getItem('accessToken');
    token.refreshToken  = localStorage.getItem('refreshToken');
    this.auth.loadCurrentUser(token).subscribe((res: UserProfile) => {
      if (res) {
          this.user = res;
          console.log("this.user",this.user);
        }
      }
    );
    
    this.p_getChat();
    //  this.chatService.getConversation();
    this.chatService.getConversationCustomer().subscribe(res=>{
      this.listConversationCustomer = res;
      console.log('listConversation', res);
    });
     //this.onGetMessage(this.Conversation);
    //  this.chatService.getConversationCustomer();
  }

  public onGetMessage(item: any): void {
    this.Content = '';
    this.Conversation = item;
    const newLocal = this;
    newLocal.isShowConversation = true;
    this.chatService.getMessage(item.conversationId).subscribe(res => {
      this.chatService.listMessage = res;
      console.log('list message', this.chatService.listMessage);
    });
  }
  sendMessage(content: string): void {
    if (!content) {
      return;
    }
    if (this.Conversation.conversationId) {
      const customObj = new Message();
      customObj.content = content;
      customObj.conversationId = this.Conversation.conversationId;
      customObj.senderId = this.user.id;
      customObj.messageType = 0;
      this.chatService.sentMessage(customObj.content, customObj.conversationId, customObj.messageType).
        subscribe(res => {
          this.Content = null;
          // this.chatService.getConversation();
          this.chatService.listMessage = [...this.chatService.listMessage, ...[customObj]];
        });
    }
  }
  private p_getChat(): void {
    this.socketService.listen('chat').subscribe(data => {
      if (this.Conversation != null && data.conversationId === this.Conversation.conversationId) {
        // this.chatService.listMessage.filter(res => {
        //   if (res.id !== data.messageId) {
        //     this.chatService.listMessage = [...this.chatService.listMessage, ...[data]];
        //   }
        // });
        const exist = this.chatService.listMessage.filter(res => res.id === data.id)[0];
        if (!exist) {
          this.chatService.listMessage = [...this.chatService.listMessage, ...[data]];
        }
      }
      this.chatService.getConversationCustomer();
    });
  }
  
}

