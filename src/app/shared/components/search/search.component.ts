import { Component, EventEmitter, Output } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';

@Component({
  selector: 'app-search',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './search.component.html',
  styleUrl: './search.component.scss',
})
export class SearchComponent {
  @Output() search: EventEmitter<string> = new EventEmitter<string>();

  onSearch(searchform: NgForm) {
    this.search.emit(searchform.form.value.search);
  }
}
