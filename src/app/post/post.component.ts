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

  activePost: Post = {
    id: 0,
    title: '',
    author: '',
    content: '',
    comments: {}
  };

  constructor(private postService: PostsService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    console.log(this.postService.posts);
    this.activePost = this.postService.posts[this.postService.posts.findIndex((post) => {
      if (post.id === this.id) {
        return true;
      } else {
        return false;
      }
    })];
  }

}
