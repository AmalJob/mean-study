import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiCallService } from '../api-call.service';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css'],
})
export class ContactComponent implements OnInit {
  constructor(private apiCall: ApiCallService, private router: Router) {}
  user: any = localStorage.getItem('userinfo');

  id: any = JSON.parse(this.user)._id;
  userDetails: any = {};
  profilPic: any = '';
  data: any = {
    username: '',
    email: '',
    phone: '',
    DOB: '',
    id: this.id,
  };
  demoImg: any = 'https://bootdey.com/img/Content/avatar/avatar7.png';
  image: any = '';

  ngOnInit(): void {
    this.apiCall.userDetails(this.id).subscribe(
      (res) => {
        console.log(res);
        this.userDetails = res;
        this.data.username = res.username;
        this.data.email = res.email;
        this.data.phone = res.phone;
        this.data.DOB = res.DOB;
        this.profilPic = res.profilePic;
        this.image = `http://localhost:8880/images/${this.profilPic}`;
      },
      (err: any) => {
        alert(err.error.error);
      }
    );
  }

  editProfile() {
    this.apiCall.editUser(this.data).subscribe(
      (res) => {
        console.log(res);
        this.router.routeReuseStrategy.shouldReuseRoute = function () {
          return false;
        };
        this.router.onSameUrlNavigation = 'reload';
        this.router.navigate(['profile']);
      },
      (err: any) => {
        alert(err.error.error);
      }
    );
  }

  deactivate() {
    this.apiCall.deactivateUser(this.id).subscribe(
      (res) => {
        console.log(res);
        this.router.routeReuseStrategy.shouldReuseRoute = function () {
          return false;
        };
        this.router.onSameUrlNavigation = 'reload';
        this.router.navigate(['profile']);
      },
      (err: any) => {
        alert(err.error.error);
      }
    );
  }

  activate() {
    this.apiCall.activateUser(this.id).subscribe(
      (res) => {
        console.log(res);
        this.router.routeReuseStrategy.shouldReuseRoute = function () {
          return false;
        };
        this.router.onSameUrlNavigation = 'reload';
        this.router.navigate(['profile']);
      },
      (err: any) => {
        alert(err.error.error);
      }
    );
  }
  file: any = '';
  img: any = '';

  onImageChange = (event: any) => {
    console.log('e', event);

    this.file = event.target.files[0];
    console.log('file', this.file);

    if (event.target.files && event.target.files[0]) {
      let reader = new FileReader();
      reader.onload = (e) => {
        this.image = e.target?.result;
        console.log('hhhhh', this.img);
      };

      reader.readAsDataURL(event.target.files[0]);
    }
  };

  imageUpload() {
    if (this.file) {
      const data = new FormData();
      const fileName = Date.now() + this.file.name;
      data.append('name', fileName);
      data.append('file', this.file);
      var image = fileName;
      console.log(image);

      this.apiCall.imageUpload(data).subscribe(
        (res) => {
          if (res) {
            const data = {
              id: this.id,
              pic: image,
            };
            console.log('data', data);

            this.apiCall.imageidUpload(data).subscribe(
              (response) => {
                console.log(response);

                this.router.routeReuseStrategy.shouldReuseRoute = function () {
                  return false;
                };
                this.router.onSameUrlNavigation = 'reload';
                this.router.navigate(['profile']);
              },
              (err: any) => {
                alert(err.error);
              }
            );
          }
        },
        (err: any) => {
          alert(err);
        }
      );
    }
  }
}
