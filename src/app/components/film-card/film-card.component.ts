import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { VideotekFilm } from 'src/app/models/videotek-film.model';
import { WatchListFilm } from 'src/app/models/watchlist-film.model';
import { TmdbService } from 'src/app/services/tmdb.service';
import { VideotekService } from 'src/app/services/videotek.service';
import { WatchlistService } from 'src/app/services/watchlist.service';
import firebase from 'firebase';
import * as moment from 'moment';

@Component({
  selector: 'app-film-card',
  templateUrl: './film-card.component.html',
  styleUrls: ['./film-card.component.css']
})
export class FilmCardComponent implements OnInit {

  tmdbFilm: any = [];
  videotekFilm: VideotekFilm;
  userUid = firebase.auth().currentUser.uid;
  
  @Input() tmdbFilmId: number;
  @Input() videotekFilmIndex: number;

  constructor(private tmdbService: TmdbService,
              private videotekService: VideotekService,
              private watchListService: WatchlistService) { }

  ngOnInit(): void {
    this.getTmdbData();
    this.getVideotekFilm(this.videotekFilmIndex);
  }

  getTmdbData() {
    this.tmdbService.getFilmData(this.tmdbFilmId)
    .subscribe((data: any) => {
      this.tmdbFilm = data;
    });
  }

  getVideotekFilm(videotekFilmIndex: number) {
    this.videotekService.getSingleVideotekFilm(videotekFilmIndex).then(
      (videotekFilm: VideotekFilm) => {this.videotekFilm = videotekFilm;}
    );
  }

  // Ajout et Suppression videotek
  onAddVideotekFilm(tmdbId: number) {
    
    const videotekFilm = new VideotekFilm(tmdbId);
    console.log(videotekFilm);
    this.videotekService.createVideotekFilm(videotekFilm);
  }

  onDeleteVideotekFilm(tmdbId: number) {
    this.videotekService.removeVideotekFilm(tmdbId);
  }

  // Ajout et Suppression watchlist
  onCreateWatchlistFilm(tmdbId: number) {
    // Utilisation de la lib moment pour la date
    moment.locale('fr');
    let date = moment().format('DD/MM/YYYY h:mm:ss');
    const watchListFilm = new WatchListFilm(tmdbId, date);
    
    this.watchListService.createWatchListFilm(watchListFilm);
  }

  onDeleteWatchlistFilm(tmdbId: number) {
    this.watchListService.removeWatchListFilm(tmdbId);
  }

  // Affichage conditionnel des boutons
  isWatchListExists(tmdbId: number) {
    return this.watchListService.isWatchListExists(tmdbId);
  }

  isVideotekExists(tmdbId: number) {
    return this.videotekService.isVideotekExists(tmdbId);
  }

}
