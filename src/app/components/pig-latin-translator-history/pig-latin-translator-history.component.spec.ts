import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PigLatinTranslatorHistoryComponent } from './pig-latin-translator-history.component';
import { PigLatinTranslationService } from '../../services/pig-latin-translation/pig-latin-translation.service';

class PigLatinTranslationServiceSpy extends PigLatinTranslationService {

}

describe('PigLatinTranslatorHistoryComponent', () => {
  let component: PigLatinTranslatorHistoryComponent;
  let fixture: ComponentFixture<PigLatinTranslatorHistoryComponent>;
  let pigLatinTranslationServiceSpy:PigLatinTranslationService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PigLatinTranslatorHistoryComponent ]
    })
    .overrideComponent(PigLatinTranslatorHistoryComponent, {
      set: {
        providers: [
          { provide: PigLatinTranslationService, useClass: PigLatinTranslationServiceSpy },
        ]
      }
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PigLatinTranslatorHistoryComponent);
    component = fixture.componentInstance;
    pigLatinTranslationServiceSpy = fixture.debugElement.injector.get(PigLatinTranslationService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display 1 translated item when 1 item is in history', () => {
    component.translationHistory = [{translateFrom:'hello', translateTo:'ellohay'}];
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelectorAll('label').length).toBe(1);
    expect(compiled.querySelectorAll('label')[0].textContent).toBe('hello = ellohay')
  });
});
