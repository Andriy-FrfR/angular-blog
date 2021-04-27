import { Router } from '@angular/router';
import { environment } from './../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Post, PostsService } from './posts.service';
import { Injectable } from '@angular/core';

export interface EditingState {
  isEditing: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class AdminPanelPostsService {
  editingState = {
    isEditing: false
  };

  constructor(private http: HttpClient, private postServ: PostsService, private router: Router) { }

  setEditing(): void {
    this.editingState.isEditing = true;
  }

  setNotEditing(): void {
    this.editingState.isEditing = false;
  }

  removePost(post: Post): void {
    this.http.delete(`${environment.baseUrl}/posts/${post.id}`)
      .subscribe(() => {
        this.router.navigate(['main/admin-panel/posts']);
      });
  }
}
