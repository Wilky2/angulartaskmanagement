import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TaskRoutingModule } from './task-routing.module';
import { AddTaskComponent } from './components/add-task/add-task.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { TaskListComponent } from './components/task-list/task-list.component';
import { TaskCalendarComponent } from './components/task-calendar/task-calendar.component';


@NgModule({
  declarations: [
    AddTaskComponent,
    TaskListComponent,
    TaskCalendarComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    TaskRoutingModule
  ],
  exports : [
    TaskListComponent
  ]
})
export class TaskModule { }
