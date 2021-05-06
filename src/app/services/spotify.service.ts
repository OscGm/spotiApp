import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class SpotifyService {

  constructor(private http: HttpClient) {
    console.log('Spotify Service');
  }

  getQuery(query: string): any {
    const url = `https://api.spotify.com/v1/${query}`;

    const headers = new HttpHeaders({
      Authorization: 'Bearer BQAePDFcSISdZ5Nppem8kO07vuv6F3_zRDVdt1PREHIGgdgzgdHPO5u3hlQ2JawZhRG1t0syKPvnXGIgvZU'
    });

    return this.http.get(url, {headers});
  }



  getNewReleases(): any {
    return this.getQuery('browse/new-releases?limit=20')
    .pipe( map( data => data['albums'].items));
  }

  getArtistas(termino: string): any {
    return this.getQuery(`search?q=${termino}&type=artist&limit=15`)
    .pipe( map( data => data['artists'].items));
  }

  getArtista(id: string): any {
    return this.getQuery(`artists/${id}`);
    // .pipe( map( data => data['artists'].items));
  }

  getTopTracks(id: string): any {
    return this.getQuery(`artists/${id}/top-tracks?country=us`)
    .pipe( map( data => data['tracks']));
  }

}
