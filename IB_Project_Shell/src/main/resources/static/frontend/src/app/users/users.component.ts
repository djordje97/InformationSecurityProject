import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../service/user.service';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {

  users;
  dataSource;
  admin=false;
  username;
  fileList:FileList;
  file:File;
  message=false;
  displayedColumns: string[] = ['email', 'cer'];
  constructor(private routre:Router,private userService:UserService) { }
  

  ngOnInit() {
    this.userService.logged().subscribe(res =>{
      console.log("Logged: "+res);
      this.username=res.email;
      this.userService.getAllActive().subscribe(data =>{
        console.log(data);
        this.users=data;
        console.log("After: "+this.users);
        this.dataSource = new MatTableDataSource(this.users);
      });
    },error =>{
      this.userService.getAll().subscribe(dat =>{
        this.displayedColumns.push("activate");
        this.admin=true;  
        this.users=dat;
        console.log(this.users);
        this.dataSource = new MatTableDataSource(this.users);
      });
      

    });

    
  }
  
  

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
  logout(){
    localStorage.removeItem("token");
    localStorage.clear();
    this.routre.navigate(['/login']);
  }

  activate(event){
    var target=event.target;
    var attr=target.attributes.name;
    console.log("IZ node: "+attr.nodeValue);
    let email: string=String(attr.nodeValue);
    console.log("Posle node: "+email);
    this.userService.activate(email).subscribe(data =>{
        window.location.reload(true);
    });
  
  }
  selectFile(event) {
    this.fileList = event.target.files;
  }

  upload(){
    this.file=this.fileList.item(0);
    this.userService.uploadCer(this.file,this.username).subscribe(data=>{
        this.message=true;
    });
  }

  downloadJks(){
    var jwtoken=localStorage.getItem("token");
    // var xhr=new XMLHttpRequest();
    // xhr.open('GET','api/demo/download/jks/'+this.username,true);
    // xhr.responseType='blob';
    // xhr.setRequestHeader('Authorization', 'Bearer ' + jwtoken);
    // xhr.onload=function(e){
    //   if(this.status == 200){
    //     var blob=this.response;
    //     var a=document.createElement('a');
    //     var url=window.URL.createObjectURL(blob);
    //     a.href=url;
    //     a.download=xhr.getResponseHeader('filename');
    //     a.click();
    //     window.URL.revokeObjectURL(url);
    //   }
    // }
    this.userService.downloadJks(this.username).subscribe(data =>{
      console.log(data);
      var blob=data
        var a=document.createElement('a');
        var url=window.URL.createObjectURL(blob);
        a.href=url;
        a.download=data.getResponseHeader('filename');
        a.click();
        window.URL.revokeObjectURL(url);
    });
  }
}
