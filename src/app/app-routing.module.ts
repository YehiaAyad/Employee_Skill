import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminChoiceComponent } from './admin-choice/admin-choice.component';
import { EnterIdComponent } from './enter-id/enter-id.component';
import { SkillsComponent } from './skills/skills.component';
import { WelcomeComponent } from './welcome/welcome.component';
import { EmployeesComponent } from './employees/employees.component';
import { SingleemployeeComponent } from './singleemployee/singleemployee.component';
import { ViewerComponent } from './viewer/viewer.component';
import { SkillformComponent } from './skillform/skillform.component';
import { EmpformComponent} from './empform/empform.component'
import {CertformComponent} from './certform/certform.component'
import { ZeroComponent } from './zero/zero.component';
import {TrialComponent} from './trial/trial.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LoadingComponent } from './loading/loading.component';
const routes: Routes = [
  {path:'',redirectTo:'/Main',pathMatch:'full',data:{animation:'isRight'}},
  {path:'login',component:WelcomeComponent,data:{animation:'isRight'}},
  {path:'id-entry',component:EnterIdComponent,data:{animation:'isLeft'}},
  {path:'admin-choice',component:AdminChoiceComponent,data:{animation:'isLeft'}},
  {path:'skills',component:SkillsComponent,data:{animation:'isRight'}},
  {path:'employees',component:EmployeesComponent,data:{animation:'isRight'}},
  {path:'singleemployee/:id',component:SingleemployeeComponent,data:{animation:"*"}},
  {path:"skillform/:id",component:SkillformComponent,data:{animation:'isLeft'}},
  {path:"empform/:id",component:EmpformComponent,data:{animation:'isLeft'}},
  {path:"certform/:id",component:CertformComponent,data:{animation:'isRight'}},
  {path:"Main",component:ZeroComponent},
  {path:"trial/:id",component:TrialComponent},

  {path:'**',component:LoadingComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {useHash: true}),BrowserAnimationsModule],
  exports: [RouterModule]
})
export class AppRoutingModule { }
export const routingComponents = [WelcomeComponent,EnterIdComponent,AdminChoiceComponent
  ,SkillsComponent,EmployeesComponent,SingleemployeeComponent,ViewerComponent,SkillformComponent
  ,EmpformComponent,CertformComponent,ZeroComponent,TrialComponent,LoadingComponent]
