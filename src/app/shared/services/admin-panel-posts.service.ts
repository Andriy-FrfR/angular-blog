import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Post, PostsService } from './posts.service';
import { Injectable } from '@angular/core';

export interface EditingState {
  isAdminPanel: boolean;
  isEditing: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class AdminPanelPostsService {
  editingState = {
    isAdminPanel: false,
    isEditing: false
  };

  constructor(private http: HttpClient, private postServ: PostsService, private router: Router) { }

  setAdminPanel(): void {
    this.editingState.isAdminPanel = true;
  }

  setNotAdminPanel(): void {
    this.editingState.isAdminPanel = false;
  }

  // delete post

  removePost(post: Post): void {
    this.http.delete(`${environment.baseUrl}/posts/${post.id}`)
      .subscribe(() => {
        this.router.navigate(['main/admin-panel/posts']);
      });
  }

  // edit post

  editPost(post: Post, newTitle: string, newContent: string): Observable<Post> {
    const updatedPost: Post = {
      author: post.author,
      title: newTitle,
      content: newContent,
      comments: post.comments,
      id: post.id
    };

    return this.http.patch<Post>(`${environment.baseUrl}/posts/${post.id}`, updatedPost);
  }
}
