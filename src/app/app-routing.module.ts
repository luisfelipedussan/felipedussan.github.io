import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { AboutComponent } from './pages/about/about.component';
import { GalleryComponent } from './pages/gallery/gallery.component';
import { BookComponent } from './pages/book/book.component';
import { ShopComponent } from './pages/shop/shop.component';
import { BlogComponent } from './pages/blog/blog.component';
import { MusicComponent } from './pages/music/music.component';
import { ContactComponent } from './pages/contact/contact.component';
//import { AIProyectComponent } from './pages/AIProyect/AIProyect.component';

const routes: Routes = [

  { path: '', redirectTo: '/home', pathMatch: 'full' },
  {path:'home',component: HomeComponent},
  {path:'gallery',component:GalleryComponent},
  {path:'about',component:AboutComponent},
  //{path:'book',component:BookComponent},
  //{path:'shop',component:ShopComponent},
  //{path:'blog',component:BlogComponent},
  {path:'contact',component:ContactComponent},
  {path:'music',component:MusicComponent}
  //{path:'AIProyect',component:AIProyectComponent},


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
