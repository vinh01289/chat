import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { UserProfile } from 'src/app/model/user';
import { ActivatedRoute, Router } from '@angular/router';
import { orderDto } from 'src/app/model/orderDto';
import { Conversation } from 'src/app/model/conversation';

import { SocketService } from 'src/app/services/socket.service';
import { ChatService } from 'src/app/services/chatservice';
import { ConversationComponent } from '../chat/conversation/conversation.component';
import { AuthService } from 'src/app/services/auth.service';
import { shopService } from 'src/app/services/shopservice.service';
import { shopDto } from 'src/app/model/shopDto';
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
  listAll: any;
  lsOrder: orderDto[] = [];
  idShop: string;
  isShopOrder = false;
  isConversation = true;
  Conversation: Conversation;
  lstShopConversation: Conversation;
  lstShop: shopDto;
  isShowConversation = false;
  Content: string;
  flagProduct = false;
  flagOrder = false;
  // callingInfo = { name: '', content: '', type: '' };
  // receiverId: string;
  // showModal = false;
  // phoneNumber: string;
  @ViewChild(ConversationComponent) conversationComponent: ConversationComponent;
  // @ViewChild(SearchComponent) searchComponent: SearchComponent;

  constructor(private auth: AuthService, public chatService: ChatService, private socketService: SocketService, private route: ActivatedRoute, private router: Router, private shopservice: shopService) {
    this.chatService.changeDataListShop().subscribe(res => {
      this.lstShop = res;
    });
  }

  ngOnInit(): void {
    this.p_getChat();
    let token = {} as Token;
    token.accessToken = localStorage.getItem('accessToken');
    token.refreshToken = localStorage.getItem('refreshToken');
    this.auth.currentUser$.subscribe(
      (res) => {
        this.user = res;
        console.log('user', this.user);
      }
    )
    this.idShop = this.route.snapshot.paramMap.get('idShop');
    this.chatService.getConversationShop(this.idShop);
    this.getAllList();
    this.getIdShop(this.idShop);
    // this.chatService.getConversationShop(this.idShop);
    this.onGetMessage(this.Conversation);
  }
  getAllList() {
    this.shopservice.getList().subscribe(res => {
      console.log("list", res);
      this.listAll = res;
    })
  }

  getIdShop(idShop: string) {
    this.flagProduct = false;
    this.flagOrder = true;
    this.idShop = idShop;
    this.isConversation = false;
  }

  public orderFlag() {
    if (this.flagOrder === false) {
      this.flagProduct = !this.flagProduct;
      this.flagOrder = true;
      this.isConversation = false;
    }
    this.isConversation = false;
  }

  public productFlag() {
    if (this.flagProduct === false) {
      this.flagOrder = !this.flagOrder;
      this.flagProduct = true;
      this.isConversation = false;
    }
    this.isConversation = false;
  }

  public onToggle(): void {
    this.isShowConversation = !this.isShowConversation;
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

  showChat(): void {
    this.flagOrder = false;
    this.isConversation = true;
    this.flagProduct = false;
    this.getConversationShop();
  }
  getConversationShop() {
    this.chatService.getConversationShop(this.idShop).subscribe(res => {
      this.lstShopConversation = res;
      console.log("lstConversation", this.lstShopConversation)
    });
  }
  sendMessage(content: string): void {
    if (!content) {
      return;
    }
    if (this.Conversation.conversationId) {
      const message = {} as Message;
      message.content = content;
      message.conversationId = this.Conversation.conversationId;
      message.senderId = this.user.id;
      message.messageType = 0;
      message.type = 'text';

      this.chatService.sentMessage(message.content, message.type, message.conversationId, message.messageType, null).
        subscribe(res => {
          this.Content = null;
          // this.chatService.getConversation();
          this.chatService.listMessage = [...this.chatService.listMessage, ...[message]];
        });
    }
  }
  private p_getChat(): void {
    this.socketService.listen('chat').subscribe(data => {
      if (this.Conversation != null && data.conversationId === this.Conversation.conversationId) {
        if (this.socketService.socket.id !== data.socketId) {
          this.chatService.listMessage = [...this.chatService.listMessage, ...[data]];
        }
      }
      this.chatService.getConversationShop(this.idShop);

    });
  }

}

