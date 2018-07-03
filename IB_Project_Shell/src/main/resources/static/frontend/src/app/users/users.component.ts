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
    this.userService.downloadJks(this.username).subscribe(data =>{
      console.log(data);
      console.log("oo je : "+data.headers.get('filename'))
      var url = window.URL.createObjectURL(data.body);
      var a = document.createElement('a');
      document.body.appendChild(a);
      a.setAttribute('style', 'display: none');
      a.href = url;
      a.download = data.headers.get('filename');
      a.click();
      window.URL.revokeObjectURL(url);
      a.remove(); // remove the elemen
    });
  }

  downloadCer(email){
    console.log("Parametar: ",email)
    this.userService.downloadCer(email).subscribe(data =>{
      console.log(data);
      console.log("oo je : "+data.headers.get('filename'))
      var url = window.URL.createObjectURL(data.body);
      var a = document.createElement('a');
      document.body.appendChild(a);
      a.setAttribute('style', 'display: none');
      a.href = url;
      a.download = data.headers.get('filename');
      a.click();
      window.URL.revokeObjectURL(url);
      a.remove(); // remove the elemen
    });
  }
}
