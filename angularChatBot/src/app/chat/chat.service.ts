import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient, HttpHeaders } from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class ChatService {

  constructor(private http: HttpClient) { }

  httpOptions = {
    headers: new HttpHeaders({
      "Access-Control-Allow-Origin": "*"
    })
  };

  sendMessage(textMessage: String){
    var reqBody = {
      "projectId": environment.dialogflow.projectId,
      "requestText": textMessage
    }
    console.log("Sending request to backend at: " + environment.backend.requestTextUrl);
    console.log("Request message from user: " + reqBody.requestText)
    return this.http.post(environment.backend.requestTextUrl, reqBody, this.httpOptions);
  }

}
