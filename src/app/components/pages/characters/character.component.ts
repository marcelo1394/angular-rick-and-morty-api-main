import {Component, Input, ChangeDetectionStrategy} from '@angular/core';
import {Character} from "../../../shared/interface/character";

@Component({
  selector: 'app-character',
  template:
    `
      <!--Image-->
      <div class="card">
        <div class="image">
          <a [routerLink]="['/character-details', character.id]">
            <img
              [src]="character.image"
              [alt]="character.name"
              class="card-img-top">
          </a>
        </div>
      </div>
      <!--Title-->
      <div class="card-inner">
        <div class="header">
          <!--Name with Link-->
          <a  [routerLink]="['/character-details', character.id]">
            <h2>{{ character.name | slice:0:15 }}</h2>
          </a>
          <!--Gender-->
          <h4 class="text-muted">
            {{ character.gender }}
          </h4>
          <!--Date-->
          <small class="text-muted">
            {{ character.created | date }}
          </small>
        </div>
      </div>
    `,
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class CharacterComponent {
  @Input() character!: Character;
}
