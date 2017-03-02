import { Injectable } from '@angular/core';
import {Observable,BehaviorSubject} from 'rxjs';

@Injectable()
export class PigLatinTranslationService {
  private dataStore: {translationHistory: {translateFrom:string,translateTo:string}[]};
  private _translationHistory: BehaviorSubject<{translateFrom:string,translateTo:string}[]>;

  constructor() {
    this._translationHistory = <BehaviorSubject<{translateFrom:string,translateTo:string}[]>>new BehaviorSubject([]);
    this.dataStore = {
      translationHistory: []
    };
  }

  private isConsonant(letter:string='') {
    return ['B','C','D','F','G','H','J','K','L','M','N','P','Q','R','S','T','V','W','X','Y','Z'].indexOf(letter.toUpperCase()) > -1;
  }

  private isVowel(letter:string='') {
    return ['A','E','I','O','U'].indexOf(letter.toUpperCase()) > -1;
  }

  private updateTranslationHistory(originalText, translatedText) {
    const newTranslationHistory = this.dataStore.translationHistory.concat({
      translateFrom: originalText,
      translateTo: translatedText
    }).slice(-10);

    this.dataStore = {
      translationHistory: newTranslationHistory
    };

    this._translationHistory.next(this.dataStore.translationHistory);
  }

  translate(textToTranslate:string='') {
    const words = textToTranslate.split(/[ ]+/);
    let resultInArr = [];

    for (let i=0;i<words.length;i++) {
      const word = words[i];
      const letter = word.substr(0,1);
      if(this.isVowel(letter)) {
        resultInArr.push(word.substr(1) + letter + 'i');
      } else if (this.isConsonant(letter)) {
        resultInArr.push(word.substr(1) + letter + 'ay');
      }
    }

    let resultInStr = resultInArr.join(' ');
    this.updateTranslationHistory(textToTranslate,resultInStr);
    return resultInStr;
  }

  get translationHistory() {
    return this._translationHistory.asObservable();
  }

}
