import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AdminPanelPostsService } from '../shared/services/admin-panel-posts.service';
import { Component, OnDestroy, OnInit, Renderer2 } from '@angular/core';
import { Post, PostsService } from '../shared/services/posts.service';
import { ValidatorParams } from '../admin-panel-post/admin-panel-post.component';
import { emptyValidator } from '../shared/validators/empty.validator';
import { BreakpointObserver, BreakpointState } from '@angular/cdk/layout';

@Component({
  selector: 'app-admin-panel',
  templateUrl: './admin-panel.component.html',
  styleUrls: ['./admin-panel.component.scss']
})
export class AdminPanelComponent implements OnInit {
  posts: Post[] = [];
  loading = true;
  postFormVisible = false;
  postTitleParams: ValidatorParams = {
    minLength: 10,
    maxLength: 70
  };
  postContentParams: ValidatorParams = {
    minLength: 30,
    maxLength: 5000
  };
  breakEditButtons = false;

  // Add post form

  addPostForm: FormGroup = new FormGroup({
    postTitle: new FormControl('', [
      Validators.required,
      Validators.minLength(this.postTitleParams.minLength),
      Validators.maxLength(this.postTitleParams.maxLength),
      emptyValidator(this.postTitleParams.minLength)
    ]),
    postContent: new FormControl('', [
      Validators.required,
      Validators.minLength(this.postContentParams.minLength),
      Validators.maxLength(this.postContentParams.maxLength),
      emptyValidator(this.postContentParams.minLength)
    ])
  });

  constructor(private postsService: PostsService,
              private adminPostsServ: AdminPanelPostsService,
              private breakpointObserver: BreakpointObserver,
              private renderer: Renderer2) { }

  ngOnInit(): void {
    this.postsService.getPosts()
      .subscribe((posts: Post[]) => {
        this.postsService.posts = posts;
        this.posts = this.postsService.posts;
        this.loading = false;
      });

    this.adminPostsServ.setAdminPanel();

    this.breakpointObserver
      .observe(['(max-width: 768px)'])
      .subscribe((state: BreakpointState) => {
        if (state.matches) {
          this.breakEditButtons = true;
        } else {
          this.breakEditButtons = false;
        }
      });
  }

  // Add posts

  showPostForm(): void {
    this.postFormVisible = true;
    this.renderer.addClass(document.body, 'overflow-hidden');
  }

  hidePostForm(): void {
    this.postFormVisible = false;
    this.renderer.removeClass(document.body, 'overflow-hidden');
  }

  preventNewLine(event: Event): void {
    event.preventDefault();
  }

  addPost(): void {
    if (this.addPostForm.valid) {
      this.adminPostsServ.addPost(this.addPostForm.controls.postTitle.value, this.addPostForm.controls.postContent.value)
        .subscribe((newPost: Post) => {
          console.log(newPost);
          this.hidePostForm();
          this.postsService.getPosts()
            .subscribe((posts: Post[]) => {
              this.postsService.posts = posts;
              this.posts = this.postsService.posts;
              console.log(this.postsService.posts);
            });
        });
    }
  }
}
