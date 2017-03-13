import { Component, OnInit, Input, ChangeDetectionStrategy, EventEmitter, Output } from '@angular/core';
import { PigLatinTranslationService } from '../../services/pig-latin-translation/pig-latin-translation.service'
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'plt-pig-latin-translator-history',
  templateUrl: './pig-latin-translator-history.component.html',
  styleUrls: ['./pig-latin-translator-history.component.css']
})
export class PigLatinTranslatorHistoryComponent implements OnInit {

  public translationHistory$:Observable<{translateFrom:string,translateTo:string}[]>;

  constructor(private pigLatinTranslationService:PigLatinTranslationService) {
  }

  ngOnInit() {
    this.translationHistory$ = this.pigLatinTranslationService.translationHistory
      .map((resp)=>resp);
  }

}
