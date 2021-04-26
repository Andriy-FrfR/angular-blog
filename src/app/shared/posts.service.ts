import { LocalStorageService } from './local-storage.service';
import { LoginService } from './login.service';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

export interface Post {
  id: number;
  title: string;
  author: string;
  content: string;
  comments: Array<Comment>;
}

export interface Comment {
  id?: number;
  author: string;
  body: string;
  date: Date;
}

@Injectable({
  providedIn: 'root'
})
export class PostsService {
  loading = true;
  posts: Post[] = [];
  activePost!: Post;

  constructor(private http: HttpClient, private localStorageServ: LocalStorageService) { }

  getPosts(): any {
    return this.http.get<Post[]>(`${environment.baseUrl}/posts`);
  }

  defineActivePost(id: number): any {
    console.log(this.posts);
    this.activePost = this.posts[this.posts.findIndex((post) => {
      if (post.id === id) {
        return true;
      } else {
        return false;
      }
    })];
    return this.activePost;
  }

  addComment(obj: any): void {
    console.log(this.localStorageServ.getUser());
    console.log(this.activePost);
    this.activePost.comments.push({
      author: this.localStorageServ.getUser().name,
      body: obj.body,
      date: new Date()
    });
    this.http.patch<Post>(`${environment.baseUrl}/posts/${this.activePost.id}/`, {
      comments: this.activePost.comments
    }).subscribe((data: Post) => {
      console.log(data);
    });
  }
}
