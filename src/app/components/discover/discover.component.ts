import { Component, OnInit } from '@angular/core';
import { TmdbService } from 'src/app/services/tmdb.service';

@Component({
  selector: 'app-discover',
  templateUrl: './discover.component.html',
  styleUrls: ['./discover.component.css']
})
export class DiscoverComponent implements OnInit {

  dayTrendings: any = [];
  bestVotes: any = [];
  lastReleases: any = [];

  constructor(private tmdbService: TmdbService) { }

  ngOnInit(): void {
    this.getDayTrending();
    this.getBestVotes();
    this.getLastRelease();
  }

  getDayTrending() {
    this.tmdbService.getDayTrendings().subscribe(
      (data: any) => {
        this.dayTrendings = data;
        this.dayTrendings = this.dayTrendings.results;
      }
    );
  }

  getBestVotes() {
    this.tmdbService.getBestVotes().subscribe(
      (data: any) => {
        this.bestVotes = data;
        this.bestVotes = this.bestVotes.results;
      }
    );
  }

  getLastRelease() {
    this.tmdbService.getLastRelease().subscribe(
      (data: any) => {
        this.lastReleases = data;
        this.lastReleases = this.lastReleases.results;
      }
    );
  }

}
