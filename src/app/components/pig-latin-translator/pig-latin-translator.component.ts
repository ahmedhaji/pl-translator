import { Component, OnInit, Inject } from '@angular/core';
import { PigLatinTranslationService } from '../../services/pig-latin-translation/pig-latin-translation.service'

@Component({
  selector: 'plt-pig-latin-translator',
  templateUrl: './pig-latin-translator.component.html',
  styleUrls: ['./pig-latin-translator.component.css'],
  providers: [PigLatinTranslationService]
})
export class PigLatinTranslatorComponent implements OnInit {
  constructor(private pigLatinTranslationService:PigLatinTranslationService) {
  }

  ngOnInit() {
  }

  onTranslate(textInput) {
    this.pigLatinTranslationService.translate(textInput.value);
    textInput.value = '';
    textInput.focus();
  }

}
