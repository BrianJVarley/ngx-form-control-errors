import { Spectator, createComponentFactory, byText } from '@ngneat/spectator';
import { ControlErrorComponent } from './control-error.component';

describe('ControlErrorComponent', () => {
  let spectator: Spectator<ControlErrorComponent>;
  const createComponent = createComponentFactory(ControlErrorComponent);

  beforeEach(() => (spectator = createComponent()));

  it('should create', () => {
    expect(spectator.component).toBeTruthy();
  });

  describe('when text is set', () => {
    it('should show text error when it is set', () => {
      spectator.component.text = 'test';

      spectator.detectChanges();

      expect(spectator.component._text).toBe('test');
      expect(spectator.component.hide).toBeFalse();
      expect(spectator.query(byText('test'))).toBeTruthy();
    });

    it('should hide text when error is empty', () => {
      spectator.component.text = 'test';

      spectator.detectChanges();

      spectator.component.text = '';

      spectator.detectChanges();

      expect(spectator.component._text).toBe('');
      expect(spectator.component.hide).toBeTrue();
      expect(spectator.query(byText('test'))).toBeNull();
    });

    it('should do nothing when text has not changed', () => {
      spectator.component.text = 'test';

      let setHasNotBeenCalled = true;

      Object.defineProperty(spectator.component, '_text', {
        get() {
          return 'test';
        },
        set() {
          setHasNotBeenCalled = false;
        },
      });

      spectator.component.text = 'test';

      expect(setHasNotBeenCalled).toBeTrue();
    });
  });
});
