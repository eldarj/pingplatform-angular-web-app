import {Component, OnInit} from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { Client, Message, Stomp, StompSubscription } from '@stomp/stompjs';
import * as SockJS from 'sockjs-client';

@Component({
  selector: 'app-dataspace-navigation',
  templateUrl: './dataspace-navigation.component.html',
  styleUrls: ['./dataspace-navigation.component.scss']
})
export class DataspaceNavigationComponent implements OnInit {
  webSocketEndPoint: string = 'http://localhost:8089/ws-api';
  topic: string = "/user/topic/greetings/Sabaha";

  stompClient: any;

  constructor(){
  }

  ngOnInit(): void {
    this._connect();
  }

  _connect() {
    console.log("Initialize WebSocket Connection");
    this.stompClient = Stomp.over(new SockJS(this.webSocketEndPoint));
    const _this = this;
    this.stompClient.connect({}, function (frame) {
        _this.stompClient.subscribe(_this.topic, function (sdkEvent) {
            _this.onMessageReceived(sdkEvent);
        });
        //_this.stompClient.reconnect_delay = 2000;
    }, this.errorCallBack);
	}

  _disconnect() {
      if (this.stompClient !== null) {
          this.stompClient.disconnect();
      }
      console.log("Disconnected");
  }

  // on error, schedule a reconnection attempt
  errorCallBack(error) {
      console.log("errorCallBack -> " + error);
      setTimeout(() => {
          this._connect();
      }, 5000);
  }

  /**
  * Send message to sever via web socket
  * @param {*} message
  */
  _send(message) {
      console.log("calling logout api via web socket");
    this.stompClient.send("/topic/hello", {}, JSON.stringify(message));
  }

  onMessageReceived(message) {
      console.log("Message Recieved from Server :: " + message);
  }

  helloThere() {
    this._send({sender: 'Eldar', receiver: 'Sabaha', content: 'Hello there!'});
  }
}
