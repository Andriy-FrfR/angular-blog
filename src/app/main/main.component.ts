import { AdminPanelPostsService, EditingState } from '../shared/services/admin-panel-posts.service';
import { LocalStorageService } from '../shared/services/local-storage.service';
import { Component, OnInit } from '@angular/core';
import { User } from '../login/login.component';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {
  editingState!: EditingState;
  loggedUser!: User;

  constructor(private localStorageServ: LocalStorageService, private adminPostsServ: AdminPanelPostsService) { }

  ngOnInit(): void {
    this.loggedUser = this.localStorageServ.getUser();
    this.editingState = this.adminPostsServ.editingState;
  }

  onSignOut(): void {
    this.localStorageServ.signOut();
  }

}
