import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

const CONSONANTS = ['B','C','D','F','G','H','J','K','L','M','N','P','Q','R','S','T','V','W','X','Z'];
const VOWELS = ['A','E','I','O','U','Y'];// y is treated as a vowel

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
    return CONSONANTS.indexOf(letter.toUpperCase()) > -1;
  }

  private isVowel(letter:string=''):boolean {
    return VOWELS.indexOf(letter.toUpperCase()) > -1;
  }

  private updateTranslationHistory(originalText, translatedText):void {
    const newTranslationHistory = this.dataStore.translationHistory.concat({
      translateFrom: originalText,
      translateTo: translatedText
    }).slice(-10);

    this.dataStore = {
      translationHistory: newTranslationHistory
    };

    this._translationHistory.next(this.dataStore.translationHistory);
  }

  private convertWordBeginningWithConsonant(word:string):string {
    const len:number = word.length;
    let startOfVowel:number = 0;

    //should cater for consonant clusters e.g. [sh]ip [sw]agger
    for (let i:number=0;i<len;i++) {
      if (VOWELS.indexOf(word.charAt(i).toUpperCase()) > -1) {
        startOfVowel = i;
        break;
      }
    }

    return (word.substr(startOfVowel) + word.substring(0,startOfVowel) + 'ay').toLowerCase();
  }

  private convertWordBeginningWithVowel(word:string):string {
    return word + 'way'
  }

  translate(textToTranslate:string='') {
    const words = textToTranslate.split(/[ ]+/);
    let resultInArr = [];

    for (let i=0;i<words.length;i++) {
      const word:string = words[i];
      const letter = word.substr(0,1);
      if(this.isVowel(letter)) {
        let result:string = this.convertWordBeginningWithVowel(word);
        resultInArr.push(result);
      } else if (this.isConsonant(letter)) {
        let result:string = this.convertWordBeginningWithConsonant(word);
        resultInArr.push(result);
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
