import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { AdminComponent } from './pages/admin/admin.component';
import { AboutComponent } from './pages/about/about.component';

export const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: '', component: HomeComponent },
  { path: 'admin', component: AdminComponent },
  { path: 'about', component: AboutComponent },
];
