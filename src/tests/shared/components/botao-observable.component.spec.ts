import 'zone.js';
import 'zone.js/testing';
import { ComponentFixture, TestBedStatic } from '@angular/core/testing';
import { TestBedInitializer } from '../../test-bed-initializer';
import { BotaoObservableComponent } from '../../../app/shared/components/botao-observable/botao-observable.component';
import { componentsModuleDeclarations, componentsModuleImports, componentsModuleProviders } from '../../../app/shared/components/components.module';

describe('BotaoObservableComponent', () => {
  let TestBed: TestBedStatic;
  let component: BotaoObservableComponent;
  let fixture: ComponentFixture<BotaoObservableComponent>;

  beforeAll(() => {
      TestBed = TestBedInitializer.getTestBed();
  });

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: componentsModuleDeclarations,
      imports: componentsModuleImports,
      providers: componentsModuleProviders
    });
    fixture = TestBed.createComponent(BotaoObservableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('Cria o componente', () => {
    expect(component).toBeTruthy();
  });

  it('Testa se o botão chama a função correta', () => {
    component.buttonPressed = jest.fn()

    const button: HTMLElement = fixture.nativeElement.querySelector('button');
    button.dispatchEvent(new Event('click'));

    expect((component.buttonPressed as jest.Mock).mock.calls.length).toBe(1);
  });
});
