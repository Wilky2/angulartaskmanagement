import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddTaskComponent } from './components/add-task/add-task.component';
import { TaskCalendarComponent } from './components/task-calendar/task-calendar.component';

const routes: Routes = [
  {
    path : 'add-task',
    component : AddTaskComponent,
    pathMatch : 'full'
  },
  {
    path : 'task-calendar',
    component : TaskCalendarComponent,
    pathMatch : 'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TaskRoutingModule { }
