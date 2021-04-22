import { PostsService } from './../shared/posts.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-comments-form',
  templateUrl: './comments-form.component.html',
  styleUrls: ['./comments-form.component.scss']
})
export class CommentsFormComponent implements OnInit {

  commentsForm: FormGroup = new FormGroup({
    commentBody: new FormControl('', [
      Validators.minLength(3),
      Validators.maxLength(300)
    ])
  });

  constructor(private postService: PostsService) { }

  ngOnInit(): void {
  }

  onSubmit(): void {
    this.postService.addComment();
  }

}
