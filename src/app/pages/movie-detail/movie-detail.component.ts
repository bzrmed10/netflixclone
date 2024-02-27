import { AfterViewInit, Component, OnInit } from '@angular/core';
import { MovieService } from '../../shared/services/movie.service';
import { IVideoContent } from '../../shared/models/IVideoContent.interface';
import { ImagePipe } from '../../shared/pipe/image.pipe';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import {
  NgIconComponent,
  provideIcons,
  provideNgIconsConfig,
} from '@ng-icons/core';
import {
  heroStar,
  heroHeart,
  heroLanguage,
  heroHandThumbUp,
  heroFilm,
  heroPlayCircle,
} from '@ng-icons/heroicons/outline';
import { Observable } from 'rxjs';
@Component({
  selector: 'app-movie-detail',
  standalone: true,
  imports: [CommonModule, ImagePipe, NgIconComponent],
  providers: [
    provideIcons({
      heroStar,
      heroHeart,
      heroLanguage,
      heroHandThumbUp,
      heroFilm,
      heroPlayCircle,
    }),
    provideNgIconsConfig({
      size: '20px',
      color: 'white',
    }),
  ],
  templateUrl: './movie-detail.component.html',
  styleUrl: './movie-detail.component.scss',
})
export class MovieDetailComponent implements OnInit {
  selectedMovie: IVideoContent | null = null;
  videotrailerUrl: string = '';

  constructor(
    private route: ActivatedRoute,
    private movieService: MovieService
  ) {
    /* const navigation = window.history.state;
    if (navigation && navigation.movieData) {
      this.selectedMovie = navigation.movieData;
    }*/
  }
  ngOnInit(): void {
    this.movieService.selectedMovie$.subscribe((movie) => {
      if (movie) {
        this.movieService.getBannerVideo(movie.id).subscribe((res) => {
          if (res.results[0])
            this.videotrailerUrl = `https://www.youtube.com/embed/${res.results[0].key}?autoplay=1&mute=1&loop=1&controls=0`;
        });
      }
      this.selectedMovie = movie;
    });
  }
}
