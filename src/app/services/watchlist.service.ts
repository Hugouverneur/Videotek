import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import firebase from 'firebase';
import { WatchListFilm } from '../models/watchlist-film.model';

@Injectable({
  providedIn: 'root'
})
export class WatchlistService {

  allMyWatchlist: WatchListFilm[] = [];
  allMyWatchlistSubject = new Subject<WatchListFilm[]>();

  constructor() {
    this.getWatchList();
    console.log(this.allMyWatchlist);
    
  }

  emitWatchList() {
    this.allMyWatchlistSubject.next(this.allMyWatchlist);
  }

  saveWatchList() {
    firebase.database().ref('/watchList').set(this.allMyWatchlist);
  }

  // Récupère tous les films de la watchlist
  getWatchList() {
    firebase.database().ref('/watchList').on('value', (data) => {
      this.allMyWatchlist = data.val() ? data.val() : [];
      this.emitWatchList();
    });
  }

  // Récupères les données de watchlist d'un film
  getSingleFilmWatchlist(tmdbId: number) {
    const watchListFilm = this.allMyWatchlist.find(
      (el) => {
        if(el.tmdbId === tmdbId) {          
          return true;
        }
      }
    );
    console.log(watchListFilm);
    
    return watchListFilm;
  }

  // Ajoute le film dans la watchlist
  createWatchListFilm(watchListFilm: WatchListFilm) {
    this.allMyWatchlist.push(watchListFilm);
    this.saveWatchList();
    this.emitWatchList();
  }

  // Supprime le film de la watchlist
  removeWatchListFilm(tmdbId: number) {
    const watchListFilmIndexToRemove = this.allMyWatchlist.findIndex(
      (el) => {
        if(el.tmdbId === tmdbId) {
          return true;
        }
      }
    );

    this.allMyWatchlist.splice(watchListFilmIndexToRemove, 1);
    this.saveWatchList();
    this.emitWatchList();
  }

  // Renvoi true si le film exist dans la watchlist
  isWatchListExists(tmdbId: number) {
    const watchListExists = this.allMyWatchlist.find(
      (el) => {
        if(el.tmdbId === tmdbId) {
          return true;
        }
      }
    );

    // Si l'id correspond à un element de l'objet
    if(watchListExists != undefined) {
      return true
    } else {
      return false
    }
  }

}
