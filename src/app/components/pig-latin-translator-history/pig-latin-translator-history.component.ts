import { Component, OnInit, Input, ChangeDetectionStrategy } from '@angular/core';
import { PigLatinTranslationService } from '../../services/pig-latin-translation/pig-latin-translation.service'

@Component({
  selector: 'plt-pig-latin-translator-history',
  templateUrl: './pig-latin-translator-history.component.html',
  styleUrls: ['./pig-latin-translator-history.component.css']
})
export class PigLatinTranslatorHistoryComponent implements OnInit {

  public translationHistory:{translateFrom:string,translateTo:string}[];

  constructor(private pigLatinTranslationService:PigLatinTranslationService) {
  }

  ngOnInit() {
    this.pigLatinTranslationService.translationHistory.subscribe((data) => {
      this.translationHistory = data;
    });
  }

}
