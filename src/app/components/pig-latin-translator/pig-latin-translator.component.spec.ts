import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PigLatinTranslatorComponent } from './pig-latin-translator.component';
import { PigLatinTranslatorHistoryComponent } from '../pig-latin-translator-history/pig-latin-translator-history.component';

import { PigLatinTranslationService } from '../../services/pig-latin-translation/pig-latin-translation.service';

class PigLatinTranslationServiceSpy extends PigLatinTranslationService {

}

describe('PigLatinTranslatorComponent', () => {
  let component: PigLatinTranslatorComponent;
  let fixture: ComponentFixture<PigLatinTranslatorComponent>;
  let pigLatinTranslationServiceSpy:PigLatinTranslationServiceSpy;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        PigLatinTranslatorComponent,
        PigLatinTranslatorHistoryComponent
      ]
    })
    .overrideComponent(PigLatinTranslatorComponent, {
      set: {
        providers: [
          { provide: PigLatinTranslationService, useClass: PigLatinTranslationServiceSpy },
        ]
      }
    })
    .overrideComponent(PigLatinTranslatorHistoryComponent, {
      set: {
        template: `<div class="pig-latin-translator-history">Mock Component</div>`
      }
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PigLatinTranslatorComponent);
    component = fixture.componentInstance;
    // get the component's injected PigLatinTranslationServiceSpy
    pigLatinTranslationServiceSpy = fixture.debugElement.injector.get(PigLatinTranslationService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render a text field for user to enter text to translate', () => {
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('.translate-from')).not.toBeNull();
  });

  it('should render the translation history component', () => {
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('.pig-latin-translator-history')).not.toBeNull();
  });

  it('should make a call translation service when onTranslate is called', () => {
    let inputElem = {
      value: 'hello'
    };
    spyOn(pigLatinTranslationServiceSpy, 'translate');
    component.onTranslate(inputElem);
    expect(pigLatinTranslationServiceSpy.translate).toHaveBeenCalledWith('hello');
  });

  it('should clear input field', () => {
    let inputElem = {
      value: 'hello'
    };
    component.onTranslate(inputElem);
    expect(inputElem.value).toBe('');
  });

});
