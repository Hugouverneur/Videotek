import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { ConnexionComponent } from './components/connexion/connexion.component';
import { HomeComponent } from './components/home/home.component';
import { InscriptionComponent } from './components/inscription/inscription.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MyVideotekComponent } from './components/my-videotek/my-videotek.component';
import { AddVideotekComponent } from './components/add-videotek/add-videotek.component';
import { UpdateVideotekComponent } from './components/update-videotek/update-videotek.component';
import { SingleFilmComponent } from './components/single-film/single-film.component';
import { FilmCardComponent } from './components/film-card/film-card.component';
import { DiscoverComponent } from './components/discover/discover.component';
import { SearchComponent } from './components/search/search.component';
import { MyWatchlistComponent } from './components/my-watchlist/my-watchlist.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    ConnexionComponent,
    HomeComponent,
    InscriptionComponent,
    MyVideotekComponent,
    AddVideotekComponent,
    UpdateVideotekComponent,
    SingleFilmComponent,
    FilmCardComponent,
    DiscoverComponent,
    SearchComponent,
    MyWatchlistComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
