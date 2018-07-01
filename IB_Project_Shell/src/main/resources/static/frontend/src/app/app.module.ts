import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import {BrowserAnimationsModule} from "@angular/platform-browser/animations"
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatInputModule} from "@angular/material/input"
import {HttpClientModule} from "@angular/common/http"
import {MatButtonModule} from "@angular/material/button";
import { RegisterComponent } from './register/register.component'
import { UserService } from './service/user.service';
import {FormsModule} from '@angular/forms';
import { UsersComponent } from './users/users.component';
import {MatTableModule} from '@angular/material/table';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    UsersComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MatCheckboxModule,
    MatInputModule,
    MatButtonModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    MatTableModule
  ],
  providers: [UserService],
  bootstrap: [AppComponent]
})
export class AppModule { }
