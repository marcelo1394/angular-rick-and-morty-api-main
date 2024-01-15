import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Character} from "../interface/character";
import {environment} from "../../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class CharacterService {
  constructor(private http: HttpClient) {
  }

  searchCharacters(queryName: string = '',
                   queryPage: number = 1) {
    const filter: string = `?name=${queryName}&page=${queryPage}`
    return this.http.get<Character[]>(`${environment.baseUrlAPI}/${filter}`)
  }

  getDetails(id: number) {
    return this.http.get<Character>(`${environment.baseUrlAPI}/${id}`)
  }
}
