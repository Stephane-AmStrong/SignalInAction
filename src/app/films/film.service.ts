import { HttpClient } from '@angular/common/http';
import { Injectable, computed, effect, inject, signal } from '@angular/core';
import { rxResource } from '@angular/core/rxjs-interop'

@Injectable({
   providedIn: 'root'
})
export class FilmService {
   private filmUrl = 'https://swapi.py4e.com/api/films';

   // Injected services
   private http = inject(HttpClient);

   // Signals managed by the service
   episodeNum = signal<number | undefined>(undefined);
   startRange = signal<string | undefined>('1977-05-25');
   endRange = signal<string | undefined>('2024-12-31');
   // validatedEpisodeNum = computed(() => {
   //    const ep = this.episodeNum();
   //    (!ep || ep < 1 || ep > 7) ? undefined : this.episodeNum;
   // });

   // The code from the video has an error. See corrected code below
   // private filmsResource = rxResource({
   //    request: () => ({
   //       start: this.startRange,
   //       end: this.endRange
   //    }),
   //    loader: ({ request }) => this.http.get<Film>(
   //       `${this.filmUrl}?start=${request.start()}&end=${request.end()}`)
   // });

   // Corrected code (the code shown in the video is incorrect)
   // READ the signals in the request property or the loader won't be re-executed.
   private filmsResource = rxResource({
      params: () => ({
         start: this.startRange(),
         end: this.endRange()
      }),
      stream: ({ params }) => this.http.get<Film>(
         `${this.filmUrl}?start=${params.start}&end=${params.end}`)
   });

   private filmResource = rxResource({
      params: this.episodeNum,
      stream: ({ params }) => this.http.get<Film>(`${this.filmUrl}/${params}`)
   });
   film = computed(() => this.filmResource.value());
   isLoading = this.filmResource.isLoading;

   // HACK to update the startRange and ensure the loader function is re-executed.
   //eff = effect(() => { if (this.episodeNum()) this.startRange.update((org) => org + '*') });
}

export interface Film {
   title: string;
   release_date: string;
   opening_crawl: string;
}