import { NO_ERRORS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Observable, BehaviorSubject } from 'rxjs';


import { PigLatinTranslatorHistoryComponent } from './pig-latin-translator-history.component';
import { PigLatinTranslationService } from '../../services/pig-latin-translation/pig-latin-translation.service';
import { ReversePipe } from '../../shared/reverse.pipe';

class PigLatinTranslationServiceSpy extends PigLatinTranslationService {
}

describe('PigLatinTranslatorHistoryComponent', () => {
  let component: PigLatinTranslatorHistoryComponent;
  let fixture: ComponentFixture<PigLatinTranslatorHistoryComponent>;
  let pigLatinTranslationServiceSpy:PigLatinTranslationService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        PigLatinTranslatorHistoryComponent,
        ReversePipe
      ],
      schemas: [NO_ERRORS_SCHEMA]
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
    let subject = <BehaviorSubject<{translateFrom:string,translateTo:string}[]>>new BehaviorSubject([
        {translateFrom:'hello', translateTo:'ellohay'}
    );
    component.translationHistory$ = subject.asObservable();
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelectorAll('md-list div.row').length).toBe(2);//includes header and rows
    let row = compiled.querySelectorAll('md-list div.row')[1];
    expect(row.querySelectorAll('div')[0].textContent).toBe('hello');
    expect(row.querySelectorAll('div')[1].textContent).toBe('ellohay');
  });

  it('should display list in reverse order i.e. last item added should be shown at the top', () => {
    let subject = <BehaviorSubject<{translateFrom:string,translateTo:string}[]>>new BehaviorSubject([
      {translateFrom:'hello', translateTo:'ellohay'},
      {translateFrom:'bye', translateTo:'yebay'},
    ]);
    component.translationHistory$ = subject.asObservable();
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;

    expect(compiled.querySelectorAll('md-list div.row').length).toBe(3);//includes headers and rows

    let row1 = compiled.querySelectorAll('md-list div.row')[1];
    expect(row1.querySelectorAll('div')[0].textContent).toBe('bye');
    expect(row1.querySelectorAll('div')[1].textContent).toBe('yebay');

    let row2 = compiled.querySelectorAll('md-list div.row')[2];
    expect(row2.querySelectorAll('div')[0].textContent).toBe('hello');
    expect(row2.querySelectorAll('div')[1].textContent).toBe('ellohay');
  });
});
