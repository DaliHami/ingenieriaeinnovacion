import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { FavouritePageComponent } from './favourite-page/favourite-page.component';
import { HomePageComponent } from './home-page/home-page.component';
import { IntroComponent } from './intro/intro.component';
const routes: Routes = [
  {path:'', component:IntroComponent},
  {path:'imagelist', component:HomePageComponent},
  {path:'favslist', component:FavouritePageComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
export const routingComponents = [HomePageComponent,FavouritePageComponent]