import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

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
}
