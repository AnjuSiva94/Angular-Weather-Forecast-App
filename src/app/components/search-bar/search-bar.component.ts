import { Component, EventEmitter, Output, signal } from '@angular/core';
import { NgClass } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-search-bar',
  standalone: true,
  imports: [NgClass,MatIconModule, FormsModule, MatFormFieldModule, MatInputModule, MatButtonModule],
  templateUrl: 'search-bar.component.html',
  styleUrl: 'search-bar.component.scss'

})
export class SearchBarComponent {
  @Output() search = new EventEmitter<string>();
  city = signal('');

  searchCity() {
    if (this.city().trim()) this.search.emit(this.city().trim());
  }
}

