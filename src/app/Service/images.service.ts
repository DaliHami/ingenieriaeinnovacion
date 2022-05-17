import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class ImagesService {

  constructor(private http:HttpClient) { }

  getData (id:number){
    let url = `https://picsum.photos/id/${id}/info`
    return this.http.get(url);
  }
}
