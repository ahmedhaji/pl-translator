import { TestBed, inject, async } from '@angular/core/testing';

import { PigLatinTranslationService } from './pig-latin-translation.service';

describe('PigLatinTranslatorService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PigLatinTranslationService]
    });
  });

  it(`should translate word beginning with vowel`, inject([PigLatinTranslationService], (service: PigLatinTranslationService) => {
    expect(service.translate('apple')).toBe('appleway');
  }));


  it(`should translate word beginning with consonant`, inject([PigLatinTranslationService], (service: PigLatinTranslationService) => {
    expect(service.translate('pig')).toBe('igpay');
  }));

  it('should translate consonant clusters', inject([PigLatinTranslationService], (service: PigLatinTranslationService) => {
    expect(service.translate('rhythm')).toBe('ythmrhay');
  }));

  it(`should treat 'y' as a vowel`, inject([PigLatinTranslationService], (service: PigLatinTranslationService) => {
    expect(service.translate('yellow')).toBe('yellowway');
  }));

  it(`should translate sentences `, inject([PigLatinTranslationService], (service: PigLatinTranslationService) => {
    expect(service.translate('pig latin')).toBe('igpay atinlay');
  }));

  it(`should keep a log of last 10 translations`, inject([PigLatinTranslationService], (service: PigLatinTranslationService) => {
    let result:Array<{translateFrom:string,translateTo:string}> = [];

    service.translationHistory.subscribe((data) => {
      result = data
    });

    service.translate('world');//add item to store;
    service.translate('hello');//add item to store;

    expect(result.length).toBe(2);
    expect(result[0]).toEqual({translateFrom:'world',translateTo:'orldway'});
    expect(result[1]).toEqual({translateFrom:'hello',translateTo:'ellohay'});
  }));

  it(`should not store more than 10 translations in history`, inject([PigLatinTranslationService], (service: PigLatinTranslationService) => {
    let result:Array<{translateFrom:string,translateTo:string}> = [];

    service.translationHistory.subscribe((data) => {
      result = data
    });

    //add 10 items to list
    service.translate('world');
    service.translate('world');
    service.translate('world');
    service.translate('world');
    service.translate('world');
    service.translate('world');
    service.translate('world');
    service.translate('world');
    service.translate('world');
    service.translate('world');

    service.translate('hello');//adding 1 more should append the last 1 to the list and remove the oldest record

    expect(result.length).toBe(10);
    expect(result[9]).toEqual({translateFrom:'hello',translateTo:'ellohay'});//the last item added
  }));


});
