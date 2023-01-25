import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiCallService } from '../api-call.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  constructor(private router: Router, private apiCall: ApiCallService) {}
  data = {
    name: '',
    email: '',
    phone:'',
    password: '',
  };

  postArray: any = [];
  ngOnInit(): void {
   
  }

  onSubmit() {
    JSON.stringify(this.data);
    this.apiCall.register(this.data).subscribe((res) => {
      console.log(res);
    });
    this.router.navigate(['/login']);
  }

}
