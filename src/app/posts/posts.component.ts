import { Post, PostsService } from '../shared/posts.service';
import { Component, OnInit } from '@angular/core';
import { AdminPanelPostsService } from '../shared/admin-panel-posts.service';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.scss']
})
export class PostsComponent implements OnInit {
  posts: Post[] = [];
  loading = true;

  constructor(private postsService: PostsService, private adminPostsServ: AdminPanelPostsService) { }

  ngOnInit(): void {
    this.postsService.getPosts()
      .subscribe((posts: Post[]) => {
        this.postsService.posts = posts;
        this.posts = this.postsService.posts;
        this.loading = false;
      });

    this.adminPostsServ.setNotEditing();
  }

}
