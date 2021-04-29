import { FormControl, FormGroup, ValidatorFn, Validators } from '@angular/forms';
import { EditingState } from '../shared/services/admin-panel-posts.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AdminPanelPostsService } from '../shared/services/admin-panel-posts.service';
import { Post, PostsService } from '../shared/services/posts.service';
import { emptyValidator } from '../shared/validators/empty.validator';

export interface ValidatorParams {
  minLength: number;
  maxLength: number;
}

@Component({
  selector: 'app-admin-panel-post',
  templateUrl: './admin-panel-post.component.html',
  styleUrls: ['./admin-panel-post.component.scss']
})
export class AdminPanelPostComponent implements OnInit {
  id = +this.route.snapshot.params.id;
  confirm = false;
  activePost!: Post;
  editingState!: EditingState;
  postTitleParams: ValidatorParams = {
    minLength: 10,
    maxLength: 70
  };
  postContentParams: ValidatorParams = {
    minLength: 30,
    maxLength: 5000
  };

  // reactive forms

  postTitleForm = new FormGroup({
    postTitleTextarea: new FormControl('', [
      Validators.required,
      Validators.minLength(this.postTitleParams.minLength),
      Validators.maxLength(this.postTitleParams.maxLength),
      emptyValidator(this.postTitleParams.minLength)
    ])
  });

  postContentForm = new FormGroup({
    postContentTextarea: new FormControl('', [
      Validators.required,
      Validators.minLength(this.postContentParams.minLength),
      Validators.maxLength(this.postContentParams.maxLength),
      emptyValidator(this.postContentParams.minLength)
    ])
  });

  constructor(private postsService: PostsService, private route: ActivatedRoute, private adminPostsServ: AdminPanelPostsService) { }

  ngOnInit(): void {
    this.postsService.getPosts()
      .subscribe((posts: Post[]) => {
        this.postsService.posts = posts;
        this.activePost = this.postsService.defineActivePost(this.id);
      });

    this.adminPostsServ.setAdminPanel();
    this.editingState = this.adminPostsServ.editingState;
    this.editingState.isEditing = false;
  }

  // Edit post

  editBtnClick(): void {
    this.editingState.isEditing = !this.editingState.isEditing;
    console.log(this.activePost);
  }

  confirmEdit(event: Event): void {
    event.preventDefault();

    console.log(this.postContentForm.valid && this.postTitleForm.valid);

    if (this.postContentForm.valid && this.postTitleForm.valid) {

      this.adminPostsServ.editPost(
        this.activePost,
        this.postTitleForm.controls.postTitleTextarea.value,
        this.postContentForm.controls.postContentTextarea.value).subscribe((updatedPost: Post) => {
          console.log(updatedPost);
          this.activePost = updatedPost;
        });

      this.editBtnClick();
    }
  }

  //  Delete post

  showWarn(): void {
    this.confirm = true;
  }

  hideWarn(): void {
    this.confirm = false;
  }

  onConfirmBtnClick(): void {
    this.adminPostsServ.removePost(this.activePost);
  }

  // Delete comment

  onDeleteBtnClick(id: number | undefined): void {
    this.adminPostsServ.removeComment(id, this.activePost)
      .subscribe((updatedPost) => {
        console.log(updatedPost);
        this.activePost = updatedPost;
      });
  }
}
