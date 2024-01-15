import {Component, HostListener, Inject} from '@angular/core';
import {Character} from "../../../../shared/interface/character";
import {CharacterService} from "../../../../shared/services/character.service";
import {filter, take} from "rxjs";
import {ActivatedRoute, NavigationEnd, ParamMap, Router} from "@angular/router";
import {DOCUMENT} from "@angular/common";

type RequestInfo = {
  next: string | null;
};

@Component({
  selector: 'app-character-list',
  templateUrl: './character-list.component.html',
  styleUrl: './character-list.component.css'
})
export class CharacterListComponent {
  characters: Character[] = [];
  // Comprobar si hay otra pagina de personajes para evitar 404
  info: RequestInfo = {
    next: null,
  };
  showGoUpButton: boolean = false;
  private pageNum: number = 1;
  private queryName: string = '';
  private hideScrollHeight: number = 200;
  private showScrollHeight: number = 500;

  constructor(@Inject(DOCUMENT)
              private document: Document,
              private characterService: CharacterService,
              private route: ActivatedRoute,
              private router: Router) {
    this.onUrlChanged();
  }

  private getCharactersByName(): void {
    // route
    this.route.queryParams.pipe(take(1))
        .subscribe((params: any) => {
          console.log('Params->', params);
          this.queryName = params['q'];
          this.getDataFromService();
        })
  }

  private getDataFromService(): void {
    this.characterService.searchCharacters(this.queryName, this.pageNum).pipe(take(1))
        .subscribe((response: any) => {
          console.log('Response->', response);
          // Validacion
          if (response?.results?.length) {
            // Deconstuct
            const {info, results} = response;
            this.characters = [...this.characters, ...results];
            this.info = info;
          } else {
            //  response vacio
            this.characters = [];
          }
        })
    ;
  }

  private onUrlChanged(): void {
    this.router.events.pipe(
      filter((event) =>
        event instanceof NavigationEnd)
    ).subscribe(() => {
      // limpiar array
      this.characters = [];
      this.pageNum = 1;
      // agregar nuev aquery
      this.getCharactersByName();
    })
  }

  @HostListener('window:scroll', [])
  onWindowScroll(): void {
    const yOffSet = window.pageYOffset;
    if ((yOffSet || this.document.documentElement.scrollTop || this.document.body.scrollTop) > this.showScrollHeight) {
      this.showGoUpButton = true;
    } else if (this.showGoUpButton && (yOffSet || this.document.documentElement.scrollTop || this.document.body.scrollTop) < this.hideScrollHeight) {
      this.showGoUpButton = false;
    }
  }

  onScrollDown(): void {
    if (this.info.next) {
      this.pageNum++;
      this.getDataFromService();
    }

  }

  onScrollTop(): void {
    this.document.body.scrollTop = 0; // safari
    this.document.documentElement.scrollTop = 0; // demas navegadores
  }
}
