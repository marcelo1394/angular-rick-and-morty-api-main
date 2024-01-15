import {Component, OnInit} from '@angular/core';
import {Location} from "@angular/common";
import {ActivatedRoute} from "@angular/router";
import {Observable, take} from "rxjs";
import {Character} from "../../../../shared/interface/character";
import {CharacterService} from "../../../../shared/services/character.service";

@Component({
  selector: 'app-character-details',
  templateUrl: './character-details.component.html',
  styleUrl: './character-details.component.css'
})
export class CharacterDetailsComponent implements OnInit {
  character$!: Observable<Character>;

  constructor(private route: ActivatedRoute,
              private characterSvc: CharacterService,
              private location: Location) {
  }

  ngOnInit(): void {
    this.route.params.pipe(take(1))
        .subscribe((params) => {
          const id = params['id'];
          this.character$ = this.characterSvc.getDetails(id);
        })
  }

  onGoBack(): void {
    this.location.back();
  }

}
