import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { VideotekFilm } from 'src/app/models/videotek-film.model';
import { VideotekService } from 'src/app/services/videotek.service';

@Component({
  selector: 'app-my-videotek',
  templateUrl: './my-videotek.component.html',
  styleUrls: ['./my-videotek.component.css']
})
export class MyVideotekComponent implements OnInit, OnDestroy {

  allMyVideotekFilms: VideotekFilm[] = [];
  allMyVideotekFilmsSubscription: Subscription;

  constructor(private videotekService: VideotekService, private router: Router) { }

  ngOnInit(): void {
    this.allMyVideotekFilmsSubscription = this.videotekService.allMyVideotekFilmsSubject.subscribe(
      (videotekFilms: VideotekFilm[]) => {
        this.allMyVideotekFilms = videotekFilms;
      }
      );
    this.videotekService.getVideotekFilms();
    this.videotekService.emitVideotekFilms();
  }

  ngOnDestroy(): void {
    this.allMyVideotekFilmsSubscription.unsubscribe();
    
  }

}
