import { FormControl, FormGroup, Validators } from '@angular/forms';
import { EditingState } from '../shared/services/admin-panel-posts.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AdminPanelPostsService } from '../shared/services/admin-panel-posts.service';
import { Post, PostsService } from '../shared/services/posts.service';

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

  // reactive forms

  postTitleForm = new FormGroup({
    postTitleTextarea: new FormControl('', [
      Validators.minLength(5),
      Validators.maxLength(70)
    ])
  });

  postContentForm = new FormGroup({
    postContentTextarea: new FormControl('', [
      Validators.minLength(30),
      Validators.maxLength(5000)
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

  // Edit post

  editBtnClick(): void {
    this.editingState.isEditing = !this.editingState.isEditing;
    console.log(this.activePost);
  }

  confirmEdit(): void {
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
}
