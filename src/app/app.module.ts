import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { MainComponent } from './main/main.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { PostsComponent } from './posts/posts.component';
import { PostComponent } from './post/post.component';
import { CommentsFormComponent } from './comments-form/comments-form.component';
import { AdminPanelComponent } from './admin-panel/admin-panel.component';
import { AdminPanelPostComponent } from './admin-panel-post/admin-panel-post.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    MainComponent,
    PostsComponent,
    PostComponent,
    CommentsFormComponent,
    AdminPanelComponent,
    AdminPanelPostComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
