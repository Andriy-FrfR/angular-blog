import { AdminPanelPostsService } from './../shared/admin-panel-posts.service';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Post, PostsService } from '../shared/posts.service';

@Component({
  selector: 'app-admin-panel',
  templateUrl: './admin-panel.component.html',
  styleUrls: ['./admin-panel.component.scss']
})
export class AdminPanelComponent implements OnInit {
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

    this.adminPostsServ.setEditing();
  }
}
