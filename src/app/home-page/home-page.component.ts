import {
  Component,
  ElementRef,
  HostListener,
  OnInit,
  ViewChild,
} from '@angular/core';
import { ImagesService } from '../Service/images.service';
import { Image } from '../Entity/Image';
@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css'],
})
export class HomePageComponent implements OnInit {
  images: Image[] = [];
  searchfilter: string = '';
  imagesFiltred: Image[] = [];
  imagesList: Image[] = [];
  limit: number = 10;
  @ViewChild('loadDiv', { static: false })
  private loadDiv: ElementRef<HTMLDivElement>;
  isTestDivScrolledIntoView: boolean;
  checkeditems: any = {};

  constructor(private ImageService: ImagesService) {}

  ngOnInit(): void {
    for (let i = 0; i < 1083; i++) {
      this.ImageService.getData(i).subscribe(
        (data: any) => {
          this.images.push({
            id: data.id,
            photo: `https://picsum.photos/id/${data.id}/500/500.jpg`,
            author: data.author,
            text: 'random_lorem_ipsum_text',
          });
          if (this.exists(data))
          {
            this.checkeditems[i] = true;
          }
          
        },
        (err: any) => {
          if (err.status == 404)
            this.images.push({
              id: i,
              photo:
                'https://th.bing.com/th/id/R.280456bcd65b24e0eb75cdb02b24827f?rik=Qg4FyuvpUNK%2bYw&pid=ImgRaw&r=0&sres=1&sresct=1',
              author: 'No one',
              text: 'image does not exist',
            });
        },
        () => {
          this.imagesFiltred = this.images;
          this.imagesList = this.imagesFiltred.slice(0, this.limit);
        }
      );
    }
  }
  @HostListener('window:scroll', ['$event'])
  isScrolledIntoView() {
    if (this.loadDiv) {
      const rect = this.loadDiv.nativeElement.getBoundingClientRect();
      const topShown = rect.top >= 0;
      const bottomShown = rect.bottom <= window.innerHeight;
      this.isTestDivScrolledIntoView = topShown && bottomShown;
      if (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <=
          (window.innerHeight || document.documentElement.clientHeight) &&
        rect.right <=
          (window.innerWidth || document.documentElement.clientWidth)
      ) {
        this.loadMore();
      }
    }
  }
  loadMore(): void {
    if (this.imagesList.length < this.imagesFiltred.length) {
      this.imagesList.push(
        ...this.imagesFiltred.slice(
          this.imagesList.length,
          this.imagesList.length + this.limit
        )
      );
    }
  }

  search(): void {
    this.imagesFiltred = this.images.filter((elem: Image) => {
      const search = this.searchfilter.toString().toLowerCase();
      return (
        elem.id.toString() == search ||
        elem.author.toLowerCase().includes(search) ||
        elem.text.toLowerCase().includes(search)
      );
    });
    this.imagesList = this.imagesFiltred.slice(0, this.limit);
  }

  addtofavs(image: any,) {
    let exist: boolean = false;
    var existingEntries = JSON.parse(localStorage.getItem('images'));
    if (existingEntries == null) existingEntries = [];
    exist = this.exists(image);
    if (exist === false) {
      localStorage.setItem('image', JSON.stringify(image));
      existingEntries.push(image);
      localStorage.setItem('images', JSON.stringify(existingEntries));
    } else {
      const index = existingEntries.findIndex(
        (imageIn) => imageIn.id == image.id
      );
      existingEntries.splice(index, 1);
      localStorage.setItem('images', JSON.stringify(existingEntries));
    }
  }
  exists(image:any) : boolean {
    var existingEntries = JSON.parse(localStorage.getItem('images'));
    if (existingEntries == null) existingEntries = [];
    for (let i = 0; i < existingEntries.length; i++) {
      if (existingEntries[i].id == image.id) 
      return true;
    }
    return false
  }
}
