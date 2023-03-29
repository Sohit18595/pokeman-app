import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PokemonRoutingModule } from './pokemon-routing.module';
import { ListComponent } from './list/list.component';
import { DetailComponent } from './detail/detail.component';
import { SharedModule } from '../shared/shared.module';
import { ProgressbarModule } from 'ngx-bootstrap/progressbar';
import { NgxSpinnerModule } from 'ngx-spinner';

@NgModule({
  declarations: [
    ListComponent,
    DetailComponent
  ],
  imports: [
    CommonModule,
    PokemonRoutingModule,
    SharedModule,
    NgxSpinnerModule,
    ProgressbarModule
  ]
})
export class PokemonModule { }
