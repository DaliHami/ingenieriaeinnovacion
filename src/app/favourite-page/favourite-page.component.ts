import { Component, Input, OnInit } from '@angular/core';
import { Image } from '../Entity/Image';

@Component({
  selector: 'app-favourite-page',
  templateUrl: './favourite-page.component.html',
  styleUrls: ['./favourite-page.component.css']
})
export class FavouritePageComponent implements OnInit {
  imagesFavs : Image[] = []
  @Input() imageFav : Image;
  constructor() { 
    
  }

  ngOnInit(): void {
    
    this.imagesFavs = JSON.parse(localStorage.getItem("images"));

  }
  removefromfavs(id : any){
    const index = this.imagesFavs.findIndex(image => image.id === id)
    this.imagesFavs.splice(index, 1);
    localStorage.setItem('images',JSON.stringify(this.imagesFavs));
  }
  
}
