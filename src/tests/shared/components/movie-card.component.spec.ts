import 'zone.js';
import 'zone.js/testing';
import { ComponentFixture, TestBedStatic, waitForAsync } from '@angular/core/testing';
import { TestBedInitializer } from '../../test-bed-initializer';
import { MovieCardComponent } from '../../../app/shared/components/movie-card/movie-card.component';
import { componentsModuleImports, componentsModuleProviders } from '../../../app/shared/components/components.module';
import { movieStub } from '../../../app/models/movie.model';
import { BehaviorSubject } from 'rxjs';
import { Component } from '@angular/core';

describe('MovieCardComponent', () => {
  let TestBed: TestBedStatic;
  let testHostComponent: TestHostComponent;
  let component: MovieCardComponent;
  let testHostFixture: ComponentFixture<TestHostComponent>;
  let fixture: ComponentFixture<MovieCardComponent>;
  let likedMoviesBehaviorSubject = new BehaviorSubject<string[]>([]);
  let movie = movieStub();

  beforeAll(() => {
      TestBed = TestBedInitializer.getTestBed();
  });

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MovieCardComponent, TestHostComponent],
      imports: componentsModuleImports,
      providers: componentsModuleProviders
    }).compileComponents();
    testHostFixture = TestBed.createComponent(TestHostComponent);
    testHostComponent = testHostFixture.componentInstance;
    fixture = TestBed.createComponent(MovieCardComponent);
    component = fixture.componentInstance;
    testHostFixture.detectChanges();
  });

  it('Cria o componente', () => {
    expect(component).toBeTruthy();
  });

  it('Testa se o botão de Like chama a função correta', () => {
    component.likeMovie = jest.fn()

    const likeButton: HTMLElement = fixture.nativeElement.querySelector('.like-button');
    likeButton.dispatchEvent(new Event('click'));

    expect((component.likeMovie as jest.Mock).mock.calls.length).toBe(1);
  });

  @Component({
    selector: `host-component`,
    template: `<app-movie-card [movie]="movie"></app-movie-card>`
  })
  class TestHostComponent {
    movie = movieStub();
  }
});
