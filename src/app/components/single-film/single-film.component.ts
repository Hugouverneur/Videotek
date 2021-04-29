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
export class SingleFilmComponent implements OnInit, OnDestroy {

  tmdbId = this.activatedRoute.snapshot.params['tmdbId']
  tmdbFilm: any;
  allMyWatchListSubscription: Subscription;
  allMyWatchList: WatchListFilm[] = [];
  

  constructor(private videotekService: VideotekService,
              private watchlistService: WatchlistService,
              private tmdbService: TmdbService,
              private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.getTmdbData();
    this.getAllWatchList();
    this.getSingleFilmWatchlist(this.tmdbId);
  }

  getTmdbData() {
    this.tmdbService.getFilmData(this.tmdbId)
    .subscribe((data: any) => {
      this.tmdbFilm = data;
    });
  }

  // Récupération de tous les films de la watchlist
  getAllWatchList() {
    this.allMyWatchListSubscription = this.watchlistService.allMyWatchlistSubject.subscribe(
      (watchList: WatchListFilm[]) => {
        this.allMyWatchList = watchList;
      }
    );
    console.log(this.allMyWatchList);
    this.watchlistService.getWatchList();
    this.watchlistService.emitWatchList();
    
  }

  getSingleFilmWatchlist(tmdbId: number) {
    const watchListFilm = this.allMyWatchList.find(
      (el) => {
        if(el.tmdbId === tmdbId) {          
          return true;
        }
      }
    );
  }

  ngOnDestroy(): void {
    this.allMyWatchListSubscription.unsubscribe();
    
  }

}
