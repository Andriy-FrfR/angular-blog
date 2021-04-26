import { AdminPanelPostComponent } from './admin-panel-post/admin-panel-post.component';
import { AdminGuard } from './admin.guard';
import { AdminPanelComponent } from './admin-panel/admin-panel.component';
import { PostsComponent } from './posts/posts.component';
import { PostComponent } from './post/post.component';
import { MainComponent } from './main/main.component';
import { LoginComponent } from './login/login.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './auth.guard';

const mainRoutes: Routes = [
  { path: 'post/:id', component: PostComponent },
  { path: 'posts', component: PostsComponent },
  { path: 'admin-panel/posts', component: AdminPanelComponent, canActivate: [AdminGuard]},
  { path: 'admin-panel/post/:id', component: AdminPanelPostComponent, canActivate: [AdminGuard]}
];

const routes: Routes = [
  {path: 'main', component: MainComponent, children: mainRoutes, canActivate: [AuthGuard]},
  {path: '', component: LoginComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
