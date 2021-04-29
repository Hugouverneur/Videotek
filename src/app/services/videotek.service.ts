import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import firebase from 'firebase';
import { VideotekFilm } from '../models/videotek-film.model';

@Injectable({
  providedIn: 'root'
})
export class VideotekService {

  allMyVideotekFilms: VideotekFilm[] = [];
  allMyVideotekFilmsSubject = new Subject<VideotekFilm[]>();

  constructor() {
    this.getVideotekFilms();
  }

  emitVideotekFilms() {
    this.allMyVideotekFilmsSubject.next(this.allMyVideotekFilms);
  }

  // Sauvegarde l'array local dans la base de donnée
  saveVideotekFilms() {
    const userUid = firebase.auth().currentUser.uid; // Récupère le uid du l'utilisateur
    firebase.database().ref(`${userUid}/videotek`).set(this.allMyVideotekFilms);
  }

  getVideotekFilms() {
    const userUid = firebase.auth().currentUser.uid; // Récupère le uid du l'utilisateur
    firebase.database().ref(`${userUid}/videotek`).on('value', (data) => {
      this.allMyVideotekFilms = data.val() ? data.val() : [];
      this.emitVideotekFilms();
    });
  }

  getSingleVideotekFilm(id: number) {
    return new Promise(
      (resolve, reject) => {
        const userUid = firebase.auth().currentUser.uid; // Récupère le uid du l'utilisateur
        firebase.database().ref(`${userUid}/videotek/${id}`).once('value').then(
          (data) => {
            resolve(data.val());
          }, (error) => {
            reject(error);
          }
        );
      }
    );
  }

  createVideotekFilm(videotekFilm: VideotekFilm) {
    this.allMyVideotekFilms.push(videotekFilm);
    this.saveVideotekFilms();
    this.emitVideotekFilms();
  }

  removeVideotekFilm(tmdbId: number) {
    const videotekFilmIndexToRemove = this.allMyVideotekFilms.findIndex(
      (el) => {
        if(el.tmdbId === tmdbId) {
          
          return true;
        }
      }
    );
    
    this.allMyVideotekFilms.splice(videotekFilmIndexToRemove, 1);
    this.saveVideotekFilms();
    this.emitVideotekFilms();
  }

  isVideotekExists(tmdbId: number) {
    const videotekExists = this.allMyVideotekFilms.find(
      (el) => {
        if(el.tmdbId === tmdbId) {
          return true;
        }
      }
    );

    // Si l'id correspond à un element de l'objet
    if(videotekExists != undefined) {
      return true
    } else {
      return false
    }
  }


}
