import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-search-bar',
  standalone: true,
  imports: [MatIconModule,CommonModule, FormsModule, MatFormFieldModule, MatInputModule, MatButtonModule],
  templateUrl: 'search-bar.component.html',
  styleUrl: 'search-bar.component.css'

})
export class SearchBarComponent {
  @Output() search = new EventEmitter<string>();
  city = '';

  searchCity() {
    if (this.city.trim()) this.search.emit(this.city.trim());
  }
}

