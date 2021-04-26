import { Injectable } from '@angular/core';

export interface EditingState {
  isEditing: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class AdminPanelPostsService {
  editingState = {
    isEditing: false
  };

  constructor() { }

  setEditing(): void {
    this.editingState.isEditing = true;
  }

  setNotEditing(): void {
    this.editingState.isEditing = false;
  }
}
