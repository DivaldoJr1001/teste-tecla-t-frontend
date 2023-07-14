import 'zone.js';
import 'zone.js/testing';
import "@angular/compiler";
import { ComponentFixture, TestBedStatic } from '@angular/core/testing';
import { PopularMoviesComponent } from '../../app/tabs/popular-movies/popular-movies.component';
import { TestBedInitializer } from '../test-bed-initializer';
import { appModuleImports, appModuleDeclarations, appModuleProviders } from '../../app/app.module';

describe('PopularMoviesComponent', () => {
  let TestBed: TestBedStatic;
  let component: PopularMoviesComponent;
  let fixture: ComponentFixture<PopularMoviesComponent>;

  beforeAll(() => {
      TestBed = TestBedInitializer.getTestBed();
  });

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: appModuleDeclarations,
      imports: appModuleImports,
      providers: appModuleProviders
    });
    fixture = TestBed.createComponent(PopularMoviesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('Cria o componente', () => {
    expect(component).toBeTruthy();
  });
});
