import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { NubanComponent } from './components/nuban/nuban.component';

const routes: Routes = [
  { path: '', redirectTo: 'aggregate-solution/nuban/home', pathMatch: 'full' },
  { path: 'aggregate-solution/nuban', redirectTo: 'aggregate-solution/nuban/home', pathMatch: 'full' },
  { path: 'aggregate-solution', redirectTo: 'aggregate-solution/nuban/home', pathMatch: 'full' },
  { path: 'aggregate-solution/nuban', 
    children: [
      {path: 'home', component: HomeComponent},
      {path:'create-nuban', component: NubanComponent}
    ]

},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
