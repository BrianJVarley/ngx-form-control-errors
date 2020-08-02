import { Component, Input } from '@angular/core';
import { SpectatorDirective, createDirectiveFactory } from '@ngneat/spectator';

import { ControlErrorContainerDirective } from './control-error-container.directive';

@Component({
  // tslint:disable-next-line: component-selector
  selector: 'get-container',
  template: '',
})
class GetContainerComponent {
  @Input()
  anchor: ControlErrorContainerDirective;
}

describe('ControlErrorContainerDirective', () => {
  let spectator: SpectatorDirective<ControlErrorContainerDirective>;
  const createDirective = createDirectiveFactory({
    directive: ControlErrorContainerDirective,
    declarations: [GetContainerComponent],
  });

  beforeEach(() => {
    spectator = createDirective(`
      <div controlErrorContainer #anchor="controlErrorContainer"></div>
      <get-container [anchor]="anchor"></get-container>
    `);
  });

  spectator = createDirective(`
      <div controlErrorAnchor #anchor="controlErrorAnchor"></div>
      <get-anchor [anchor]="anchor"></get-anchor>
    `);

  it('should create', () => {
    expect(spectator.directive).toBeTruthy();
  });

  it('should contain ViewContainerRef instance', () => {
    expect(spectator.directive.vcr).toBeTruthy();
  });

  it('should be exported as `controlErrorContainer`', () => {
    spectator.detectChanges();
    expect(spectator.query(GetContainerComponent).anchor).toBe(
      spectator.directive
    );
  });
});
