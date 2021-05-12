import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Conversation } from 'src/app/model/conversation';
import { Message } from 'src/app/model/message';
import { shopDto } from 'src/app/model/shopDto';
import { UserProfile } from 'src/app/model/user';
import { AuthService } from 'src/app/services/auth-service.service';
import { ChatService } from 'src/app/services/chatservice';
import { SocketService } from 'src/app/services/socket.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {

  @Input() ltsData: any;
  @ViewChild('SearchInput', { static: true }) SearchInput: ElementRef;


  constructor(private auth: AuthService, public chatService: ChatService, private socketService: SocketService, private router: Router) { 
  }

  ngOnInit(): void {
    
  }

}
