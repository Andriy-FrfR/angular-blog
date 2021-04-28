import { Post, PostsService } from '../shared/services/posts.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AdminPanelPostsService } from '../shared/services/admin-panel-posts.service';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss']
})
export class PostComponent implements OnInit {
  id = +this.route.snapshot.params.id;
  activePost!: Post;

  constructor(private postsService: PostsService, private route: ActivatedRoute, private adminPostsServ: AdminPanelPostsService) { }

  ngOnInit(): void {
    this.postsService.getPosts()
      .subscribe((posts: Post[]) => {
        this.postsService.posts = posts;
        this.activePost = this.postsService.defineActivePost(this.id);
      });

    this.adminPostsServ.setNotAdminPanel();
  }

}
