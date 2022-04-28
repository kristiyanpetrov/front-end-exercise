import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { File } from "../models/file.model";
import { User } from "../models/user.model";
import { Type } from "../models/type.model";
import { Observable } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class SharedService {

  constructor(private httpClient: HttpClient) {}
  api = 'http://localhost:3001';

  getUsers(): Observable<User[]> {
    const url = `${this.api}/users`
    return this.httpClient.get<User[]>(url);
  }

  getFiles(): Observable<File[]> {
    const url = `${this.api}/files`
    return this.httpClient.get<File[]>(url);
  }

  getTypes(): Observable<Type[]> {
    const url = `${this.api}/types`
    return this.httpClient.get<Type[]>(url);
  }
}
