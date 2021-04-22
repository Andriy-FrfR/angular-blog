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
  id: number;
  author: string;
  body: string;
  date: Date;
}

@Injectable({
  providedIn: 'root'
})
export class PostsService {
  posts: Post[] = [];

  loading = true;

  constructor(private http: HttpClient) { }

  getPosts(): any {
    return this.http.get<Post[]>(`${environment.baseUrl}/posts`);
  }

  addComment(): void {
    console.log('add comment works');
  }
}
