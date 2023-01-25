import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiCallService } from '../api-call.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  constructor(private router: Router, private apiCall: ApiCallService) {}
  data = {
    email: '',
    password: '',
  };

  postArray: any = [];
  ngOnInit(): void {}

  onSubmit() {
    JSON.stringify(this.data);
    try {
      this.apiCall.login(this.data).subscribe(
        (res) => {
          console.log('hhhhhh', res);

          localStorage.setItem('userinfo', JSON.stringify(res.user));
          this.router.navigate(['/profile']);
        },
        (err: any) => {
          console.log("er", err);
          
          alert(err.error);
        }
      );
    } catch (error) {
      console.log(error);
    }
  }
}
