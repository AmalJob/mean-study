import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ApiCallService } from './api-call.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  constructor(private router: Router, private apiCall: ApiCallService) {}
 
  // button click navigation
  clickMe() {
    this.router.navigate(['/contact-us']);
  }
}
