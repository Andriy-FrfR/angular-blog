import { PostsComponent } from './posts/posts.component';
import { PostComponent } from './post/post.component';
import { MainComponent } from './main/main.component';
import { LoginComponent } from './login/login.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const mainRoutes: Routes = [
  { path: 'post/:id', component: PostComponent},
  { path: '', component: PostsComponent}
];

const routes: Routes = [
  {path: 'main', component: MainComponent, children: mainRoutes},
  {path: '', component: LoginComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
