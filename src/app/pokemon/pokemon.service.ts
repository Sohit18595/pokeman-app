import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { of, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PokemonService {


  constructor(
    private http: HttpClient) { }
  // GET pokemons from the server
  getPokemons(query: any) {
    let params = new HttpParams();
    params = params.append('offset', query.offset);
    params = params.append('limit', 12);
    return this.http.get('https://pokeapi.co/api/v2/pokemon', {params});
  }
  getPokemon(pokemonId: string) {
    return this.http.get(`https://pokeapi.co/api/v2/pokemon/${pokemonId}`,)
  }
  getDetails(name: string) {
    return this.http.get(`https://pokeapi.co/api/v2/pokemon-species/${name}/`);
  }

  getEvolution(myUrl: string) {
    return this.http.get(myUrl);
  }

  // use this API is search and finding evolved pokemon pic
  getSinglePokemonDetails(pokemonName: string){
    return this.http.get(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`);
  }

}
