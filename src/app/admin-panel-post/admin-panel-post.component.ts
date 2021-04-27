import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AdminPanelPostsService } from '../shared/admin-panel-posts.service';
import { Post, PostsService } from '../shared/posts.service';

@Component({
  selector: 'app-admin-panel-post',
  templateUrl: './admin-panel-post.component.html',
  styleUrls: ['./admin-panel-post.component.scss']
})
export class AdminPanelPostComponent implements OnInit {
  id = +this.route.snapshot.params.id;
  confirm = false;
  activePost!: Post;

  constructor(private postsService: PostsService, private route: ActivatedRoute, private adminPostsServ: AdminPanelPostsService) { }

  ngOnInit(): void {
    this.postsService.getPosts()
      .subscribe((posts: Post[]) => {
        this.postsService.posts = posts;
        this.activePost = this.postsService.defineActivePost(this.id);
      });

    this.adminPostsServ.setEditing();
  }

  changeBtnClick(): void {

  }

  showWarn(): void {
    this.confirm = true;
  }

  hideWarn(): void {
    this.confirm = false;
  }

  onConfirmBtnClick(): void {
    this.adminPostsServ.removePost(this.activePost);
  }
}
