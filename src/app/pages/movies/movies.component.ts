import { Component, OnInit } from '@angular/core';
import { HeaderComponent } from '../../core/components/header/header.component';
import { NgFor, NgIf } from '@angular/common';
import { MovieService } from '../../shared/services/movie.service';
import { Observable } from 'rxjs';
import { IVideoContent } from '../../shared/models/IVideoContent.interface';
import { ImagePipe } from '../../shared/pipe/image.pipe';
import { DescriptionPipe } from '../../shared/pipe/description.pipe';
import { PaginationComponent } from '../../shared/components/pagination/pagination.component';
import { SearchComponent } from '../../shared/components/search/search.component';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { NoresultComponent } from '../../shared/components/noresult/noresult.component';

@Component({
  selector: 'app-movies',
  standalone: true,
  imports: [
    HeaderComponent,
    NgFor,
    NgIf,
    ImagePipe,
    DescriptionPipe,
    PaginationComponent,
    SearchComponent,
    NoresultComponent,
  ],
  templateUrl: './movies.component.html',
  styleUrl: './movies.component.scss',
})
export class MoviesComponent implements OnInit {
  current: number = 1;
  total: number = 500;
  isSearching: boolean = false;
  searchName: string = '';
  urlPage: string = '';

  movies: IVideoContent[] = [];

  constructor(
    private movieService: MovieService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.route.url.subscribe((segments) => {
      const lastSegment = segments[segments.length - 1].path;
      this.urlPage = lastSegment;
    });

    this.getPageData(this.urlPage);
  }

  public searchMovie(name: string) {
    if (name === '') {
      this.isSearching = false;
      this.current = 1;
      this.getPageData(this.urlPage);
    } else {
      this.isSearching = true;
      this.current = 1;
      this.searchName = name;
      this.getPageData(this.urlPage);
    }
  }

  public onGoTo(page: number): void {
    this.current = page;
    this.movieService.pageSubject.next(this.current);
    this.getPageData(this.urlPage);
  }

  public onNext(page: number): void {
    this.current = page + 1;
    this.movieService.pageSubject.next(this.current);
    this.getPageData(this.urlPage);
  }

  public onPrevious(page: number): void {
    this.current = page - 1;
    this.movieService.pageSubject.next(this.current);
    this.getPageData(this.urlPage);
  }

  private getMovies() {
    if (this.isSearching) {
      this.movieService.getSearchedMovie(this.searchName).subscribe((res) => {
        this.movies = res.results;
        this.total = res.total_pages;
      });
    } else {
      this.movieService.getMovies().subscribe((res) => {
        this.movies = res.results;
        this.total = 500;
      });
    }
  }

  private getTvShows() {
    if (this.isSearching) {
      this.movieService.getSearchedTvShows(this.searchName).subscribe((res) => {
        this.movies = res.results;
        this.total = res.total_pages;
      });
    } else {
      this.movieService.getTvShows().subscribe((res) => {
        this.movies = res.results;
        this.total = 500;
      });
    }
  }

  private getPageData(url: string) {
    if (url == 'movies') this.getMovies();
    else if (url == 'tvshows') this.getTvShows();
  }

  selectMovie(movie: IVideoContent) {
    this.movieService.setSelectedMovie(movie);
    this.router.navigate(['/home/movie'], {
      relativeTo: this.route,
    });
    /*this.router.navigate(['/home/movie'], {
      relativeTo: this.route,
      state: { movieData: movie },
    });*/
    //this.movieService.selectedMovie.next(movie);
  }
}
