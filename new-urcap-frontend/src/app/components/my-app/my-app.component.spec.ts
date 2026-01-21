import {ComponentFixture, TestBed} from '@angular/core/testing';
import { MyAppComponent} from "./MyApp.component";
import {TranslateLoader, TranslateModule} from "@ngx-translate/core";
import {Observable, of} from "rxjs";

describe('MyAppComponent', () => {
  let fixture: ComponentFixture<MyAppComponent>;
  let component: MyAppComponent;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MyAppComponent],
      imports: [TranslateModule.forRoot({
        loader: {
          provide: TranslateLoader, useValue: {
            getTranslation(): Observable<Record<string, string>> {
              return of({});
            }
          }
        }
      })],
    }).compileComponents();

    fixture = TestBed.createComponent(MyAppComponent);
    component = fixture.componentInstance;
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });
});
