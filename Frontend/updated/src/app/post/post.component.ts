import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css']
})
export class PostComponent {
  @Input()
  visible!: boolean;
  @Output() usernameSubmitted = new EventEmitter<string>();
  username!: string;
  showError = false;
  constructor(private router: Router) {}

  submitUsername(): void {
    if (this.username && this.username.trim() !== '') {
      this.showError = false;
    this.usernameSubmitted.emit(this.username);
    
    this.router.navigate(['List',this.username]);
    }
    else {
      this.showError = true;
    } // Navigate to UserPostListComponent
  }
}
