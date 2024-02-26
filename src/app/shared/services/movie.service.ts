import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IVideoContent } from '../models/IVideoContent.interface';
import { BehaviorSubject, Subject, map } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class MovieService {
  pageSubject = new BehaviorSubject<number>(1);
  private selectedMovieSubject = new BehaviorSubject<IVideoContent | null>(
    null
  );
  selectedMovie$ = this.selectedMovieSubject.asObservable();

  constructor(private http: HttpClient) {}

  setSelectedMovie(movie: IVideoContent) {
    this.selectedMovieSubject.next(movie);
  }

  private getParams() {
    return new HttpParams()
      .set('include_adult', 'false')
      .set('include_video', 'true')
      .set('language', 'en-En')
      .set('page', this.pageSubject.value.toString()) // Update page dynamically
      .set('sort_by', 'popularity.desc');
  }

  private getHeaders() {
    return new HttpHeaders({
      Accept: 'application/json',
      Authorization:
        'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI5MmViYjFmYTZkZWNlMzgzNWNlOTk1YjJjMGZmYTM0ZSIsInN1YiI6IjY1YmY4YjJhYjMzOTAzMDE2NTk3N2JkNiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.fxQcYXndtQ0Obrw7C43AF3Kihmes4rJThBtl_TwpNbE',
    });
  }

  getMovies() {
    return this.http.get<any>('https://api.themoviedb.org/3/discover/movie', {
      params: this.getParams(),
      headers: this.getHeaders(),
    });
  }
  getTvShows() {
    return this.http.get<any>('https://api.themoviedb.org/3/discover/tv', {
      params: this.getParams(),
      headers: this.getHeaders(),
    });
  }

  getRatedMovies() {
    return this.http.get(
      'https://api.themoviedb.org/3/account/20966996/rated/movies',
      {
        params: this.getParams(),
        headers: this.getHeaders(),
      }
    );
  }

  getBannerImage(id: number) {
    return this.http.get(`https://api.themoviedb.org/3/movie/${id}/images`, {
      params: this.getParams(),
      headers: this.getHeaders(),
    });
  }

  getBannerVideo(id: number) {
    return this.http.get<any>(
      `https://api.themoviedb.org/3/movie/${id}/videos`,
      {
        params: this.getParams(),
        headers: this.getHeaders(),
      }
    );
  }

  getBannerDetail(id: number) {
    return this.http.get<IVideoContent>(
      `https://api.themoviedb.org/3/movie/${id}`,
      {
        params: this.getParams(),
        headers: this.getHeaders(),
      }
    );
  }

  getNowPlayingMovies() {
    return this.http.get('https://api.themoviedb.org/3/movie/now_playing', {
      params: this.getParams(),
      headers: this.getHeaders(),
    });
  }

  getPopularMovies() {
    return this.http.get('https://api.themoviedb.org/3/movie/popular', {
      params: this.getParams(),
      headers: this.getHeaders(),
    });
  }

  getTopRated() {
    return this.http.get('https://api.themoviedb.org/3/movie/top_rated', {
      params: this.getParams(),
      headers: this.getHeaders(),
    });
  }

  getUpcomingMovies() {
    return this.http.get('https://api.themoviedb.org/3/movie/upcoming', {
      params: this.getParams(),
      headers: this.getHeaders(),
    });
  }

  getSearchedMovie(name: string) {
    return this.http.get<any>(
      `https://api.themoviedb.org/3/search/movie?query=${name}`,
      {
        params: this.getParams(),
        headers: this.getHeaders(),
      }
    );
  }
  getSearchedTvShows(name: string) {
    return this.http.get<any>(
      `https://api.themoviedb.org/3/search/tv?query=${name}`,
      {
        params: this.getParams(),
        headers: this.getHeaders(),
      }
    );
  }
}
