import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TmdbService {

  apiKey = '8a53005729d2862b94de9c850faf77c0';
  baseUrl = 'https://api.themoviedb.org/3';

  constructor(private httpClient: HttpClient) { }

  getFilmData(id: number) {
    return this.httpClient.get(`${this.baseUrl}/movie/${id}?api_key=${this.apiKey}&language=fr-FR`);
  }

  getDayTrendings() {
    return this.httpClient.get(`${this.baseUrl}/trending/movie/day?api_key=${this.apiKey}&language=fr-FR`);
  }

  getBestVotes() {
    return this.httpClient.get(`${this.baseUrl}/discover/movie?api_key=${this.apiKey}&language=fr-FR&sort_by=vote_count.desc&include_adult=false&include_video=false&page=1`);
  }

  getLastRelease() {
    let currentDate: any = new Date();
    let month = (currentDate.getMonth() < 10)? '0' + currentDate.getMonth() : currentDate.getMonth();
    let day = (currentDate.getDate() < 10)? '0' + currentDate.getDate() : currentDate.getDate();
    currentDate = currentDate.getFullYear() + '-' + month + '-' + day;
    console.log(currentDate);
    
    return this.httpClient.get(`${this.baseUrl}/discover/movie?api_key=${this.apiKey}&language=fr-FR&sort_by=primary_release_date.desc&release_date.lte=${currentDate}&include_adult=false&include_video=false&page=1`);
  }

  searchFilm(search: string) {    
    return this.httpClient.get(`${this.baseUrl}/search/movie?api_key=${this.apiKey}&query=${search}&language=fr-FR`);
  }

}
