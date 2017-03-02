import { TestBed, async } from '@angular/core/testing';

import { AppComponent } from './app.component';
import { PigLatinTranslatorComponent } from './components/pig-latin-translator/pig-latin-translator.component';
import { PigLatinTranslatorHistoryComponent } from './components/pig-latin-translator-history/pig-latin-translator-history.component';

describe('AppComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        AppComponent,
        PigLatinTranslatorComponent,
        PigLatinTranslatorHistoryComponent
      ],
    }).compileComponents();
  }));

  it('should create the app', async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  }));

  it(`should have as title 'Pig!'`, async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app.title).toEqual('Pig Latin Translator');
  }));

  it('should render title in a h1 tag', async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('h1').textContent).toContain('Pig Latin Translator');
  }));
});
