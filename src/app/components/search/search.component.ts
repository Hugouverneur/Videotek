import { Component, OnInit } from '@angular/core';
import { TmdbService } from 'src/app/services/tmdb.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

  searchFilms: any = [];
  isSearching: boolean = false; // True si l'utilisateur saisie du texte dans le champs

  constructor(private tmdbService: TmdbService) { }

  ngOnInit(): void { }

  search(terms: string) {
    this.tmdbService.searchFilm(terms).subscribe(
      (data: any) => {
        this.searchFilms = data;
        this.searchFilms = this.searchFilms.results;

        this.searchFilms.splice(4, this.searchFilms.length)
      }
    );
  }

  onTypeSearch(event: any) {
    let getSearch: string = event.target.value;
    if(getSearch.length > 2) {
      this.isSearching = true;
      this.search(getSearch);
    }
  }

}
