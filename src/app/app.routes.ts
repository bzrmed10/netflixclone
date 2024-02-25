import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { MoviesComponent } from './pages/movies/movies.component';
import { BrowseComponent } from './pages/browse/browse.component';
import { MovieDetailComponent } from './pages/movie-detail/movie-detail.component';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./pages/login/login.component').then((a) => a.LoginComponent),
  },
  {
    path: 'home',
    component: HomeComponent,
    children: [
      {
        path: '',
        component: BrowseComponent,
      },
      {
        path: 'movies',
        component: MoviesComponent,
      },
      {
        path: 'tvshows',
        component: MoviesComponent,
      },
      {
        path: 'movie',
        component: MovieDetailComponent,
      },
    ],
  },
];
