import { Component } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { PokemonService } from '../pokemon.service';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.scss'],
})
export class DetailComponent {
  pokemon: any;
  tabselector = 'firsttab';
  pokemonId = '';
  pokemonName = '';
  evolutionData: any = [];
  constructor(
    private route: ActivatedRoute,
    private pokemonService: PokemonService
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((params: ParamMap) => {
      this.pokemonId = params.get('id');
      this.pokemonName = params.get('name');
    });
    this.getSinglePokemonDetail();
  }

  getSinglePokemonDetail() {
    this.pokemonService.getDetails(this.pokemonId).subscribe((data) => {
      this.pokemonService
        .getSinglePokemonDetails(this.pokemonName)
        .subscribe((data1) => {
          this.pokemonService
            .getSinglePokemonDetails(this.pokemonName)
            .subscribe((data2: any) => {
              let finalData = { ...data, ...data1, ...data2 };
              finalData.mainPokemonAvatar = data2.sprites.front_default;
              const tempArr = [];

              finalData.abilities.forEach((element) => {
                tempArr.push(element.ability.name);
              });
              finalData.abilities = tempArr.join(',');
              finalData.eggGroups = '';
              finalData.egg_groups.forEach((element) => {
                finalData.eggGroups = finalData.eggGroups + element.name + ',';
              });
              finalData.evolution = [];
              finalData.subtypes = [];
              finalData.types.forEach((element) => {
                finalData.subtypes.push(element.type.name);
              });
              
              this.pokemon = { ...finalData };
            });
          console.log('this.pokemon', this.pokemon);
          this.getPokemonEvolutionDetails();
        });
    });
    
  }


  searchPokemon(pokemonName: string) {
    this.pokemonService
      .getSinglePokemonDetails(pokemonName)
      .subscribe((res: any) => {
        this.pokemon.evolvedPokemonAvatar = res.sprites.front_default;
      });
  }

  getPokemonEvolutionDetails() {
    this.pokemonService
      .getDetails(this.pokemonId)
      .subscribe((response: any) => {
        this.pokemonService
          .getEvolution(response.evolution_chain.url)
          .subscribe((data: any) => {
            var evoChain = [];
            var evoData = data.chain;
            do {
              var evoDetails = evoData['evolution_details'][0];
              evoChain.push({
                species_name: evoData.species.name,
                min_level: !evoDetails ? 1 : evoDetails.min_level,
              });

              evoData = evoData['evolves_to'][0];
            } while (!!evoData && evoData.hasOwnProperty('evolves_to'));
            let currentPokemonIndexInEvoltionChain = evoChain.findIndex(
              (element) => element.species_name === this.pokemon.name
            );
            if (currentPokemonIndexInEvoltionChain !== evoChain.length - 1) {
              let nextPokemonIndexInEvolutionChain =
                currentPokemonIndexInEvoltionChain + 1;
                this.pokemon.evolution.push(
                evoChain[nextPokemonIndexInEvolutionChain]
              ); // This array contains evolution
              this.searchPokemon(
                evoChain[nextPokemonIndexInEvolutionChain].species_name
              ); // to do handle super form
            }
          });
      });
  }
}
