import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { WatchListFilm } from 'src/app/models/watchlist-film.model';
import { WatchlistService } from 'src/app/services/watchlist.service';

@Component({
  selector: 'app-my-watchlist',
  templateUrl: './my-watchlist.component.html',
  styleUrls: ['./my-watchlist.component.css']
})
export class MyWatchlistComponent implements OnInit, OnDestroy {

  allMyWatchList: WatchListFilm[] = [];
  allMyWatchListSubscription: Subscription;

  constructor(private watchListService: WatchlistService) { }

  ngOnInit(): void {
    this.getAllWatchList();
  }

  getAllWatchList() {
    this.allMyWatchListSubscription = this.watchListService.allMyWatchlistSubject.subscribe(
      (watchList: WatchListFilm[]) => {
        this.allMyWatchList = watchList;
      }
    );
    this.watchListService.getWatchList();
    this.watchListService.emitWatchList();
  }

  ngOnDestroy(): void {
    this.allMyWatchListSubscription.unsubscribe();
  }

}
