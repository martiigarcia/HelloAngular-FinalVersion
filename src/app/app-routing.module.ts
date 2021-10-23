import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {LoginFormComponent} from "./login/login-form/login-form.component";
import {AuthGuard} from "./security/guard/auth.guard";
import {LayoutComponent} from "./layout/layout.component";

const routes: Routes = [
  {path: '', redirectTo: 'home', pathMatch: 'full'},
  {
    path: '', component: LayoutComponent, canActivate: [AuthGuard],
    children: [
      {
        path: 'home',
        loadChildren: () => import('./home/home.module').then(mod => mod.HomeModule)
      },
      {
        path: 'persons',
        loadChildren: () => import('./person/person.module').then(mod => mod.PersonModule)
      },
      {
        path: 'buses',
        loadChildren: () => import('./buses/buses.module').then(mod => mod.BusesModule)
      },
      {
        path: 'trips',
        loadChildren: () => import('./trips/trips.module').then(mod => mod.TripsModule)
      },
    ]
  },
  {path: 'login', component: LoginFormComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {useHash: true})],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
