import { LocalStorageService } from './../shared/local-storage.service';
import { Component, OnInit } from '@angular/core';
import { User } from '../login/login.component';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {

  loggedUser!: User;

  constructor(private localStorageServ: LocalStorageService) { }

  ngOnInit(): void {
    this.loggedUser = this.localStorageServ.getUser();
  }

  onSignOut(): void {
    this.localStorageServ.signOut();
  }

}
