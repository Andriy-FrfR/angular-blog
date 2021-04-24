import { LocalStorageService } from './../shared/local-storage.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {

  constructor(private localStorageServ: LocalStorageService) { }

  ngOnInit(): void {
  }

  onSignOut(): void {
    this.localStorageServ.signOut();
  }

}
