import { RouterModule, Routes } from "@angular/router";
import { MainComponent } from "./Main.component";
import { NgModule } from "@angular/core";

const routes: Routes = [
    { path : "question" , component : MainComponent}
];



@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})


export class MianRoutingModule {}