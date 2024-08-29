import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './components/Navbar/Navbar.component';
import { HeaderCompnent } from './components/Lower-Header/Lower-Header.component';
import { MainComponent } from './components/Main/Main.component';
import { FormsModule } from '@angular/forms';
import { CorrectAnsComponent } from './components/Main/correct-ans/correct-ans.component';
import { StarterComponent } from './components/starter/starter.component';
import { TitleHeaderComponent } from './components/title-header/title-header.component';

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
  ],
  declarations: [
    MainComponent,
    AppComponent,
    NavbarComponent,
    HeaderCompnent,
    CorrectAnsComponent,
    StarterComponent,
    TitleHeaderComponent,
    TitleHeaderComponent
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
