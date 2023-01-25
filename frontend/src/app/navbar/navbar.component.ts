import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiCallService } from '../api-call.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements OnInit {
  constructor(private router: Router, private apiCall:ApiCallService ) {}
  user: any = localStorage.getItem('userinfo');

  id: any = JSON.parse(this.user)._id;
  userDetails: any = {};
  profilPic:any=''
  image:any=''
  demoImg: any = 'https://bootdey.com/img/Content/avatar/avatar7.png';
  ngOnInit(): void {
    this.apiCall.userDetails(this.id).subscribe(
      (res) => {
        console.log(res);
        this.userDetails=res
        this.profilPic = res.profilePic;
        this.image = `http://localhost:8880/images/${this.profilPic}`;
      },
      (err: any) => {
        alert(err.error.error);
      }
    );
  }

  logout() {
    localStorage.removeItem('userinfo');
    this.router.navigate(['login']);
  }
}
