import { PlTranslatorPage } from './app.po';

describe('pl-translator App', () => {
  let page: PlTranslatorPage;

  beforeEach(() => {
    page = new PlTranslatorPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
