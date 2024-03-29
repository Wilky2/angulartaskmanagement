import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path : 'user',
    loadChildren : ()=>import('./components/user/user.module').then(m=>m.UserModule)
  },
  {
    path : 'task',
    loadChildren : ()=>import('./components/task/task.module').then(m=>m.TaskModule)
  },
  {
    path : '',
    redirectTo : 'user',
    pathMatch : 'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
