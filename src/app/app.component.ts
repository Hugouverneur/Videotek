import { Component } from '@angular/core';
import firebase from 'firebase';
import 'firebase/firestore';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'VideoTek';

  constructor() {
    var firebaseConfig = {
      apiKey: "AIzaSyBY5NRDtHuyaG_c9Ro4oX2grCvJlFf2-w8",
      authDomain: "videotek.firebaseapp.com",
      databaseURL: "https://videotek-default-rtdb.europe-west1.firebasedatabase.app",
      projectId: "videotek",
      storageBucket: "videotek.appspot.com",
      messagingSenderId: "81364185538",
      appId: "1:81364185538:web:cf75f5fcc89b725604665b"
    };
    // Initialize Firebase
    firebase.initializeApp(firebaseConfig);
  
  }
}
