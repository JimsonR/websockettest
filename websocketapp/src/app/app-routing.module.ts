import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SockettestComponent } from './sockettest/sockettest.component';

const routes: Routes = [
  {path:"", redirectTo:"", pathMatch:'full'},
  {path:"socket", component:SockettestComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { 
  
}
