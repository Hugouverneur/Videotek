import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { VideotekFilm } from 'src/app/models/videotek-film.model';
import { TmdbService } from 'src/app/services/tmdb.service';
import { VideotekService } from 'src/app/services/videotek.service';

@Component({
  selector: 'app-add-videotek',
  templateUrl: './add-videotek.component.html',
  styleUrls: ['./add-videotek.component.css']
})
export class AddVideotekComponent implements OnInit {

  addVideotekFilmForm: FormGroup;
  tmdbSuggestions: any = [];
  getTitleFromSelection: string = '';

  constructor(private formBuilder: FormBuilder,
              private videotekService: VideotekService,
              private tmdbService: TmdbService,
              private router: Router) { }

  ngOnInit(): void {
    this.initForm();
  }

  initForm() {
    this.addVideotekFilmForm = this.formBuilder.group({
      tmdbId: ['', [Validators.required]],
    });
  }

  onSubmit() {
    const tmdbId = this.addVideotekFilmForm.get('tmdbId').value;
    const newVideotekFilm = new VideotekFilm(tmdbId);

    this.videotekService.createVideotekFilm(newVideotekFilm);
    this.router.navigate(['my-videotek']);
  }

  autocomplete(event: any) {
    if(event.target.value.length > 2) {
      this.tmdbService.searchFilm(event.target.value).subscribe(
        (data) => {this.tmdbSuggestions = data;
        }
      );
    }
  }

  onSelectFilm(event: any) {
    this.getTitleFromSelection = event.target.firstChild.firstChild.data;
  }

}
