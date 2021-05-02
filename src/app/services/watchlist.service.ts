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
  }

  emitWatchList() {
    this.allMyWatchlistSubject.next(this.allMyWatchlist);
  }

  saveWatchList() {
    const userUid = firebase.auth().currentUser.uid; // Récupère le uid du l'utilisateur
    firebase.database().ref(`${userUid}/watchList`).set(this.allMyWatchlist);
  }

  // Récupère tous les films de la watchlist
  getWatchList() {
    const userUid = firebase.auth().currentUser.uid; // Récupère le uid du l'utilisateur
    firebase.database().ref(`${userUid}/watchList`).on('value', (data) => {
      this.allMyWatchlist = data.val() ? data.val() : [];
      this.emitWatchList();
    });
  }

  // Récupères les données de watchlist d'un film
  getSingleFilmWatchlist(tmdbId: number) {
    return new Promise(
      (resolve, reject) => {
        const userUid = firebase.auth().currentUser.uid; // Récupère le uid du l'utilisateur
        firebase.database().ref(`${userUid}/watchList`).orderByChild('tmdbId').equalTo(tmdbId).once('value').then(
          (data) => {
            resolve(data.val());
          }, (error) => {
            reject(error);
          }
        );
      }
    );
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
