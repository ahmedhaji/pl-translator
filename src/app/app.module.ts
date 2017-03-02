import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { PigLatinTranslatorComponent } from './components/pig-latin-translator/pig-latin-translator.component';
import { PigLatinTranslatorHistoryComponent } from './components/pig-latin-translator-history/pig-latin-translator-history.component';

@NgModule({
  declarations: [
    AppComponent,
    PigLatinTranslatorComponent,
    PigLatinTranslatorHistoryComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
