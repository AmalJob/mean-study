import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiCallService } from '../api-call.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
})
export class ProfileComponent implements OnInit {
  constructor(private router: Router, private apiCall: ApiCallService) {}
  user: any = localStorage.getItem('userinfo');

  id: any = JSON.parse(this.user)._id;
  postArray: any = [];
  post: any = [];
  postText: any = this.post.text;

  ngOnInit(): void {
    this.apiCall.getUserPosts(this.id).subscribe((res) => {
      console.log(res);
      this.postArray = res;
    });
  }
  getPost(idd: any) {
    this.apiCall.getPost(idd).subscribe((res) => {
      console.log(res);
      this.post = res;
      this.postText = res.text;
      console.log(this.postText);
    });
  }
  createPost() {
    this.router.navigate(['create-post']);
  }

  editPost() {
    const data = {
      text: this.postText,
      postId: this.post._id,
    };
    console.log(data);
    this.apiCall.editPost(data).subscribe((res) => {
      console.log(res);
      this.router.routeReuseStrategy.shouldReuseRoute = function () {
        return false;
      };
      this.router.onSameUrlNavigation = 'reload';
      this.router.navigate(['posts']);
    });
  }

  deletePost(id: any) {
    this.apiCall.deletePost(id).subscribe((res) => {
      console.log(res);
      this.router.routeReuseStrategy.shouldReuseRoute = function () {
        return false;
      };
      this.router.onSameUrlNavigation = 'reload';
      this.router.navigate(['posts']);
    });
  }
}
