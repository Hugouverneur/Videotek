import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { VideotekFilm } from 'src/app/models/videotek-film.model';
import { WatchListFilm } from 'src/app/models/watchlist-film.model';
import { TmdbService } from 'src/app/services/tmdb.service';
import { VideotekService } from 'src/app/services/videotek.service';
import { WatchlistService } from 'src/app/services/watchlist.service';

@Component({
  selector: 'app-single-film',
  templateUrl: './single-film.component.html',
  styleUrls: ['./single-film.component.css']
})
export class SingleFilmComponent implements OnInit {

  tmdbId = this.activatedRoute.snapshot.params['tmdbId']
  tmdbFilm: any;
  

  constructor(private videotekService: VideotekService,
              private watchlistService: WatchlistService,
              private tmdbService: TmdbService,
              private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.getTmdbData();

  }

  getTmdbData() {
    this.tmdbService.getFilmData(this.tmdbId)
    .subscribe((data: any) => {
      this.tmdbFilm = data;
    });
  }

}
