import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiCallService } from '../api-call.service';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.css'],
})
export class PostsComponent implements OnInit {
  constructor(private router: Router, private apiCall: ApiCallService) {}
  user: any = localStorage.getItem('userinfo');

  id: any = JSON.parse(this.user)._id;
  postArray: any = [];

  ngOnInit(): void {
    this.apiCall.getPosts(this.id).subscribe(
      (res) => {
        console.log(res);
        this.postArray = res;
      },
      (err: any) => {
        alert(err.error.error);
      }
    );
  }

  blockPost(postId: any) {
    const ids = {
      postId: postId,
      userId: this.id,
    };
    this.apiCall.blockPost(ids).subscribe(
      (res) => {
        console.log(res);
        this.router.routeReuseStrategy.shouldReuseRoute = function () {
          return false;
        };
        this.router.onSameUrlNavigation = 'reload';
        this.router.navigate(['']);
      },
      (err: any) => {
        alert(err.error.error);
      }
    );
  }

  blockUser(id: any) {
    console.log(id);

    const ids = {
      id: id,
      userId: this.id,
    };
    this.apiCall.blockUser(ids).subscribe(
      (res) => {
        console.log(res);
      },
      (err: any) => {
        console.log(err);

        alert(err.error.err);
      }
    );
    this.router.routeReuseStrategy.shouldReuseRoute = function () {
      return false;
    };
    this.router.onSameUrlNavigation = 'reload';
    this.router.navigate(['']);
  }
}
