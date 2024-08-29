import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainComponent } from './components/Main/Main.component';
import { StarterComponent } from './components/starter/starter.component';

const routes: Routes = [
  { path: "", pathMatch: "full", redirectTo: "/start" },
  { path: "start", component: StarterComponent },
  { path: "question", component: MainComponent },
  { path: "**", pathMatch: "full", redirectTo: "/start" }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
