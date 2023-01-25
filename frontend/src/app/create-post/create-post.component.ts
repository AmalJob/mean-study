import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiCallService } from '../api-call.service';

@Component({
  selector: 'app-create-post',
  templateUrl: './create-post.component.html',
  styleUrls: ['./create-post.component.css'],
})
export class CreatePostComponent implements OnInit {
  constructor(private router: Router, private apiCall: ApiCallService) {}
  user: any = localStorage.getItem('userinfo');

  id: any = JSON.parse(this.user)._id;
  username: any = JSON.parse(this.user).username;
  data: any = {
    text: '',
    userId: this.id,
    username: this.username,
  };

  ngOnInit(): void {
    console.log(this.data.post);
  }

  addPost() {
    this.apiCall.addPost(this.data).subscribe((res) => {
      console.log(res);
      if (res.data) {
        this.router.navigate(['profile']);
      }
    });
  }
}
