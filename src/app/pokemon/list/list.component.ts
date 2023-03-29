import { Component } from '@angular/core';
import { PokemonService } from '../pokemon.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent {


  offset: number = 0;
  limit: number = 12;
  size: number = 100;
  pokemons:any = [];
  
  constructor(
    private pokemonService: PokemonService
  ) { }

  ngOnInit() {
    this.onPageChange(this.offset);
  }

  

  onPageChange(offset: number) {
    this.offset = offset;
    this.getUserList();
  }

  getUserList() {
    this.pokemonService.getPokemons({offset: this.offset}).subscribe((pokemons:any) => {
      console.log('pokemon', pokemons);
      this.pokemons = pokemons.results.map(item=>{
        let urlArr = item.url.split('/');
        let id = urlArr[urlArr.length - 2];
        item.id = id;
        return item;
      });
      this.size = pokemons.count;
    });
  }

  getImage(pokemonId) {
    return `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemonId}.png`;
  }

}
