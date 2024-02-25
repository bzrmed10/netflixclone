import { NgFor } from '@angular/common';
import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
} from '@angular/core';

@Component({
  selector: 'app-pagination',
  standalone: true,
  imports: [NgFor],
  templateUrl: './pagination.component.html',
  styleUrl: './pagination.component.scss',
})
export class PaginationComponent implements OnChanges {
  pages: number[] = [];
  @Input() current: number = 1;
  @Input() total: number = 20;
  @Output() goTo: EventEmitter<number> = new EventEmitter<number>();
  @Output() next: EventEmitter<number> = new EventEmitter<number>();
  @Output() previous: EventEmitter<number> = new EventEmitter<number>();

  ngOnChanges(changes: SimpleChanges): void {
    this.pages = this.getPages(this.current, this.total);
  }

  public onGoTo(page: number): void {
    this.goTo.emit(page);
  }
  public onNext(): void {
    this.next.emit(this.current);
  }
  public onPrevious(): void {
    this.previous.next(this.current);
  }

  private getPages(current: number, total: number): number[] {
    if (total <= 7) {
      return [...Array(total).keys()].map((x) => ++x);
    }

    if (current > 5) {
      if (current >= total - 4) {
        return [1, total - 4, total - 3, total - 2, total - 1, total];
      } else {
        return [1, current - 1, current, current + 1, total];
      }
    }

    return [1, 2, 3, 4, 5, total];
  }
}
