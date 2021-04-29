import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AddVideotekComponent } from './components/add-videotek/add-videotek.component';
import { ConnexionComponent } from './components/connexion/connexion.component';
import { DiscoverComponent } from './components/discover/discover.component';
import { HomeComponent } from './components/home/home.component';
import { InscriptionComponent } from './components/inscription/inscription.component';
import { MyVideotekComponent } from './components/my-videotek/my-videotek.component';
import { MyWatchlistComponent } from './components/my-watchlist/my-watchlist.component';
import { SearchComponent } from './components/search/search.component';
import { SingleFilmComponent } from './components/single-film/single-film.component';
import { UpdateVideotekComponent } from './components/update-videotek/update-videotek.component';
import { AuthGuardService } from './services/auth-guard.service';


const routes: Routes = [
  { path: '', pathMatch: "full", component: HomeComponent },
  { path: 'home', component: HomeComponent },
  { path: 'connexion', component: ConnexionComponent },
  { path: 'inscription', component: InscriptionComponent },

  { path: 'discover', canActivate: [AuthGuardService], component: DiscoverComponent},
  {path: 'search', canActivate: [AuthGuardService], component: SearchComponent},

  { path: 'my-videotek', canActivate: [AuthGuardService], component: MyVideotekComponent},
  { path: 'my-videotek/add', canActivate: [AuthGuardService], component: AddVideotekComponent},
  { path: 'my-videotek/update/:id', canActivate: [AuthGuardService], component: UpdateVideotekComponent},
  { path: 'single-film/:tmdbId', canActivate: [AuthGuardService], component: SingleFilmComponent},

  { path: 'my-watchlist', canActivate: [AuthGuardService], component: MyWatchlistComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
