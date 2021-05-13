import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { UserProfile } from 'src/app/model/user';
import { ActivatedRoute, Router } from '@angular/router';
import { orderDto } from 'src/app/model/orderDto';
import { Conversation } from 'src/app/model/conversation';

import { SocketService } from 'src/app/services/socket.service';
import { ChatService } from 'src/app/services/chatservice';
import { ConversationComponent } from '../chat/conversation/conversation.component';
import { AuthService } from 'src/app/services/auth-service.service';
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
  listAll : any;
  lsOrder:orderDto[]=[];
  idShop: string;
  isShopOrder = false;
  isConversation = false;
  Conversation: Conversation;
  lstShopConversation : Conversation;
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

  constructor(private auth: AuthService, public chatService: ChatService,private socketService: SocketService, private route: ActivatedRoute, private router: Router, private shopservice: shopService) {
    this.chatService.changeDataListShop().subscribe(res => {
      this.lstShop=res;
    });
   }

  ngOnInit(): void {
    if(!this.auth.loginIn()){
      this.router.navigate(['shop/login']);
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
    console.log("kak")
    this.p_getChat();
     this.getAllList();
     this.getIdShop(this.idShop);
    //  this.chatService.getConversation();
     this.getConversationShop();
     this.onGetMessage(this.Conversation);
     
  }
  getAllList(){
    this.shopservice.getList().subscribe(res=>{
      this.listAll = res;
    })
  }
  
  getIdShop(idShop: string){
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

  showChat(): void{
    this.flagOrder= false;
    this.isConversation = true;
    this.flagProduct= false;
    this.getConversationShop();
  }
  getConversationShop(){
    this.chatService.getConversationShop(this.idShop).subscribe(res => {
        this.lstShopConversation= res;
        console.log("lstConversation",this.lstShopConversation)
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
          // console.log(1);
          this.chatService.listMessage = [...this.chatService.listMessage, ...[customObj]];
        });
    }
  }
  private p_getChat(): void {
    this.socketService.listen('chat').subscribe(data => {
      console.log("scoket", data);
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
      this.chatService.getConversationShop(this.idShop);
    });
  }
  
}

