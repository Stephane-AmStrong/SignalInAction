import { Component, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Film, FilmService } from '../film.service';

@Component({
   selector: 'app-film-selection',
   imports: [FormsModule],
   templateUrl: './film-selection.component.html',
   styleUrl: './film-selection.component.css'
})
export class FilmSelectionComponent {
   pageTitle = "Select a StarWars Film";

   // Injected services
   private filmService = inject(FilmService);

   // Signals to support the template
   // episodeNum = signal(undefined);
   // film = signal<Film | undefined>(undefined);
   // isLoading = signal(false);
   episodeNum = this.filmService.episodeNum;
   film = this.filmService.film;
   isLoading = this.filmService.isLoading;
}
