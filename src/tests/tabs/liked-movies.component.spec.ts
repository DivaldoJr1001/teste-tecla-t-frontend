import 'zone.js';
import 'zone.js/testing';
import "@angular/compiler";
import { ComponentFixture, TestBedStatic } from '@angular/core/testing';
import { LikedMoviesComponent } from '../../app/tabs/liked-movies/liked-movies.component';
import { TestBedInitializer } from '../test-bed-initializer';
import { appModuleImports, appModuleDeclarations, appModuleProviders } from '../../app/app.module';

describe('LikedMoviesComponent', () => {
  let TestBed: TestBedStatic;
  let component: LikedMoviesComponent;
  let fixture: ComponentFixture<LikedMoviesComponent>;

  beforeAll(() => {
      TestBed = TestBedInitializer.getTestBed();
  });

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: appModuleDeclarations,
      imports: appModuleImports,
      providers: appModuleProviders
    });
    fixture = TestBed.createComponent(LikedMoviesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('Cria o componente', () => {
    expect(component).toBeTruthy();
  });
});
