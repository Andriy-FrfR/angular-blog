import { Post, PostsService } from '../shared/posts.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss']
})
export class PostComponent implements OnInit {
  id = +this.route.snapshot.params.id;

  activePost: Post = this.postService.activePost;

  constructor(private postService: PostsService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.activePost = this.postService.defineActivePost(this.id);
  }

}
