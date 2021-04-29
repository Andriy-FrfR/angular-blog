import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Post, PostsService, Comment } from './posts.service';
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

  // Edit post

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

  // Delete post

  removePost(post: Post): void {
    this.http.delete(`${environment.baseUrl}/posts/${post.id}`)
      .subscribe(() => {
        this.router.navigate(['main/admin-panel/posts']);
      });
  }

  // Delete comment

  removeComment(id: number | undefined, post: Post): Observable<Post> {
    console.log('Remove comment invoked');

    post.comments.splice(this.defineComment(post, id), 1);

    const updatedPost: Post = {
      author: post.author,
      title: post.title,
      content: post.content,
      comments: post.comments,
      id: post.id
    };

    return this.http.patch<Post>(`${environment.baseUrl}/posts/${post.id}`, updatedPost);
  }

  defineComment(post: Post, id: number | undefined): number {
    return post.comments.findIndex((comment: Comment) => {
      if (comment.id === id) {
        return true;
      } else {
        return false;
      }
    });
  }
}
