import { Component, OnInit } from '@angular/core';
import firebase from 'firebase';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  isAuth: boolean;
  userUid: string;

  constructor(private authService: AuthService) { }

  ngOnInit(): void {

    firebase.auth().onAuthStateChanged(
      (user) => {
        if(user) {
          this.isAuth = true;
          this.userUid = user.uid
        } else {
          this.isAuth = false;
        }
      }
    );

  }

  onSignOut() {
    this.authService.signOut();
  }

}
