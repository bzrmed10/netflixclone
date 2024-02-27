import {
  Component,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
} from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { Observable } from 'rxjs';
import { IVideoContent } from '../../../shared/models/IVideoContent.interface';
import { MovieService } from '../../../shared/services/movie.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-banner',
  standalone: true,
  imports: [],
  templateUrl: './banner.component.html',
  styleUrl: './banner.component.scss',
})
export class BannerComponent implements OnChanges {
  @Input() bannerDetails?: Observable<IVideoContent>;
  @Input() bannerTitle?: string = '';
  @Input() bannerOverview?: string = '';
  @Input() key = 'r_pUE7OcN8w';
  videoUrl = this.sanitizer.bypassSecurityTrustResourceUrl(
    `https://www.youtube.com/embed/${this.key}?autoplay=1&mute=1&loop=1&controls=0`
  );

  constructor(
    private sanitizer: DomSanitizer,
    private movieService: MovieService,
    private route: ActivatedRoute,
    private router: Router
  ) {}
  ngOnChanges(changes: SimpleChanges): void {
    if (changes['key']) {
      this.videoUrl = this.sanitizer.bypassSecurityTrustResourceUrl(
        `https://www.youtube.com/embed/${this.key}?autoplay=1&mute=1&loop=1&controls=0`
      );
    }
  }

  selectMovie() {
    this.bannerDetails?.subscribe((movie) => {
      this.movieService.setSelectedMovie(movie);
      this.router.navigate(['/home/movie'], {
        relativeTo: this.route,
      });
    });
  }
}
