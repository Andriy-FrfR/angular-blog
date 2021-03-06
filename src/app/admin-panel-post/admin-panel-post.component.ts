import { FormControl, FormGroup, Validators } from '@angular/forms';
import { EditingState } from '../shared/services/admin-panel-posts.service';
import { Component, HostBinding, OnInit, Renderer2 } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AdminPanelPostsService } from '../shared/services/admin-panel-posts.service';
import { Post, PostsService } from '../shared/services/posts.service';
import { emptyValidator } from '../shared/validators/empty.validator';
import { BreakpointObserver, BreakpointState } from '@angular/cdk/layout';

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
  breakEditButtons = false;

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

  constructor(private postsService: PostsService,
              private route: ActivatedRoute,
              private adminPostsServ: AdminPanelPostsService,
              private breakpointObserver: BreakpointObserver,
              private renderer: Renderer2) { }

  ngOnInit(): void {
    this.postsService.getPosts()
      .subscribe((posts: Post[]) => {
        this.postsService.posts = posts;
        this.activePost = this.postsService.defineActivePost(this.id);
      });

    this.adminPostsServ.setAdminPanel();
    this.editingState = this.adminPostsServ.editingState;
    this.editingState.isEditing = false;

    // media quires

    this.breakpointObserver
      .observe(['(max-width: 480px)'])
      .subscribe((state: BreakpointState) => {
        if (state.matches) {
          this.breakEditButtons = true;
        } else {
          this.breakEditButtons = false;
        }
      });
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
    this.renderer.addClass(document.body, 'overflow-hidden');
  }

  hideWarn(): void {
    this.confirm = false;
    this.renderer.removeClass(document.body, 'overflow-hidden');
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
