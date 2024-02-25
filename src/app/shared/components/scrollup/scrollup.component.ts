import { NgClass } from '@angular/common';
import { Component, OnInit, Inject, HostListener } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import {
  NgIconComponent,
  provideIcons,
  provideNgIconsConfig,
} from '@ng-icons/core';
import { heroChevronUp } from '@ng-icons/heroicons/outline';
@Component({
  selector: 'app-scrollup',
  standalone: true,
  imports: [NgClass, NgIconComponent],
  providers: [
    provideIcons({
      heroChevronUp,
    }),
    provideNgIconsConfig({
      size: '20px',
      color: 'white',
    }),
  ],
  templateUrl: './scrollup.component.html',
  styleUrl: './scrollup.component.scss',
})
export class ScrollupComponent implements OnInit {
  windowScrolled?: boolean;
  constructor(@Inject(DOCUMENT) private document: Document) {}
  @HostListener('window:scroll', [])
  onWindowScroll() {
    if (
      window.pageYOffset ||
      document.documentElement.scrollTop ||
      document.body.scrollTop > 100
    ) {
      this.windowScrolled = true;
    } else if (
      (this.windowScrolled && window.pageYOffset) ||
      document.documentElement.scrollTop ||
      document.body.scrollTop < 10
    ) {
      this.windowScrolled = false;
    }
  }
  scrollToTop() {
    (function smoothscroll() {
      var currentScroll =
        document.documentElement.scrollTop || document.body.scrollTop;
      if (currentScroll > 0) {
        window.requestAnimationFrame(smoothscroll);
        window.scrollTo(0, currentScroll - currentScroll / 8);
      }
    })();
  }
  ngOnInit() {}
}
