import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AccueilComponent } from './accueil/accueil.component';
import { ConnexionComponent } from './connexion/connexion.component';
import { InscriptionComponent } from './inscription/inscription.component';


const routes: Routes = [
  { path:'accueil',component:AccueilComponent},
  { path:'connexion',component:ConnexionComponent},
  { path:'inscription',component:InscriptionComponent},
  { path:'',redirectTo:'/accueil',pathMatch:'full'},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
