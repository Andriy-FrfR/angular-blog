import { PostsService } from '../shared/services/posts.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { emptyValidator } from '../shared/validators/empty.validator';

@Component({
  selector: 'app-comments-form',
  templateUrl: './comments-form.component.html',
  styleUrls: ['./comments-form.component.scss']
})
export class CommentsFormComponent implements OnInit {

  commentsForm: FormGroup = new FormGroup({
    commentBody: new FormControl('', [
      Validators.minLength(10),
      Validators.maxLength(300),
      emptyValidator(10)
    ])
  });

  constructor(private postService: PostsService) { }

  ngOnInit(): void {
  }

  onSubmit(event: Event | null): void {

    if (event !== null) {
      event.preventDefault();
    }

    console.log(this.commentsForm.valid);
    if (this.commentsForm.valid) {
      this.postService.addComment({
        body: this.commentsForm.controls.commentBody.value,
      });
    }
  }

}
