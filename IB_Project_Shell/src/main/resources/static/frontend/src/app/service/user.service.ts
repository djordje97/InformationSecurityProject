import { Injectable, Type } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http:HttpClient) { }

  public login(credential:any):any{
    return this.http.post("api/auth/login",credential);
  }

  public getUsernames():any{
    return this.http.get("api/users/all/username");
  }

  public register(user:any):any{
    return this.http.post("api/users",user);
  }

  public getAllActive():any{
    var token=localStorage.getItem("token");
    var head={
      "Authorization": "Bearer " + token,
      'Content-Type': 'application/json'
    };
    let  httpOptions= {
  header: new  HttpHeaders(head)
    };
    return this.http.get("api/users/all/active",{headers:httpOptions.header});
  }

  getAll():any{
    var token=localStorage.getItem("token");
    var head={
      "Authorization": "Bearer " + token,
      'Content-Type': 'application/json'
    };
    let  httpOptions= {
  header: new  HttpHeaders(head)
    };
    return this.http.get("api/users",{headers:httpOptions.header});
  }

  logged():any{
    var token=localStorage.getItem("token");
    var head={
      "Authorization": "Bearer " + token,
      'Content-Type': 'application/json'
    };
let  httpOptions= {
  header: new  HttpHeaders(head)
};
    return this.http.get("api/users/logged",{headers:httpOptions.header});
  }

  activate(email:string):any{
    var token=localStorage.getItem("token");
    console.log(token);
    var head={
      "Authorization": "Bearer " + token,
      'Content-Type': 'application/json'
    };
  let  httpOptions= {
  header: new  HttpHeaders(head)
    };
    console.log("U service: "+email);
    return this.http.put("api/users/edit",email,{headers:httpOptions.header});
  }
  uploadCer(file:File,email:string):any{
    var token=localStorage.getItem("token");
    console.log(token);
    var head={
      "Authorization": "Bearer " + token,
    };
  let  httpOptions= {
  header: new  HttpHeaders(head)
    };
   let formData:FormData=new FormData();
   formData.append('file',file);
   formData.append('email',email);


   return this.http.post("api/demo/upload",formData,{headers:httpOptions.header});
  }
  downloadJks(username:string):any{
    var token=localStorage.getItem("token");
    console.log(token);
    var head={
      "Authorization": "Bearer " + token,
    };
  let  httpOptions= {
  header: new  HttpHeaders(head)
    };
    return this.http.post("api/demo/download/jks",username,{headers:httpOptions.header,responseType:"blob",observe:'response'});
  }
  downloadCer(username:string):any{
    var token=localStorage.getItem("token");
    console.log(token);
    var head={
      "Authorization": "Bearer " + token,
    };
  let  httpOptions= {
  header: new  HttpHeaders(head)
    };
    return this.http.post("api/demo/download/cer",username,{headers:httpOptions.header,responseType:"blob",observe:'response'});
  }
}
