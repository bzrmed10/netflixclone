import { CommonModule, NgFor, NgIf } from '@angular/common';
import {
  AfterViewInit,
  Component,
  ElementRef,
  Input,
  OnInit,
  ViewChild,
} from '@angular/core';
import Swiper from 'swiper';
import { IVideoContent } from '../../models/IVideoContent.interface';
import { ImagePipe } from '../../pipe/image.pipe';
import { DescriptionPipe } from '../../pipe/description.pipe';
import { animate, style, transition, trigger } from '@angular/animations';
import { MovieService } from '../../services/movie.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-movie-carousel',
  standalone: true,
  imports: [NgFor, NgIf, ImagePipe, DescriptionPipe],
  templateUrl: './movie-carousel.component.html',
  styleUrl: './movie-carousel.component.scss',
  animations: [
    trigger('fade', [
      transition('void => *', [
        style({ opacity: 0 }),
        animate(300, style({ opacity: 1 })),
      ]),
    ]),
  ],
})
export class MovieCarouselComponent implements OnInit, AfterViewInit {
  @Input() videoContents: IVideoContent[] = [];
  @Input() title!: string;
  @ViewChild('swiperContainer') swiperContainer!: ElementRef;
  selectedContent: string | null = null;
  constructor(
    private movieService: MovieService,
    private route: ActivatedRoute,
    private router: Router
  ) {}
  ngAfterViewInit(): void {
    this.initSwiper();
  }
  ngOnInit(): void {}

  private initSwiper() {
    return new Swiper(this.swiperContainer.nativeElement, {
      slidesPerView: 3,
      slidesPerGroup: 2,
      centeredSlides: true,
      loop: true,
      breakpoints: {
        600: {
          slidesPerView: 2,
          slidesPerGroup: 2,
          spaceBetween: 5,
          centeredSlides: true,
        },
        900: {
          slidesPerView: 3,
          slidesPerGroup: 3,
          spaceBetween: 5,
          centeredSlides: true,
        },
        1200: {
          slidesPerView: 4,
          slidesPerGroup: 4,
          spaceBetween: 5,
          centeredSlides: false,
        },
        1500: {
          slidesPerView: 5,
          slidesPerGroup: 5,
          spaceBetween: 5,
          centeredSlides: false,
        },
        1800: {
          slidesPerView: 5,
          slidesPerGroup: 6,
          spaceBetween: 5,
          centeredSlides: false,
        },
      },
    });
  }

  selectMovie(movie: IVideoContent) {
    this.movieService.setSelectedMovie(movie);
    this.router.navigate(['/home/movie'], {
      relativeTo: this.route,
    });
  }
  setHoverContent(movie: IVideoContent) {
    this.selectedContent = movie.title ?? movie.name;
  }

  clearHoverContent() {
    this.selectedContent = null;
  }
}
