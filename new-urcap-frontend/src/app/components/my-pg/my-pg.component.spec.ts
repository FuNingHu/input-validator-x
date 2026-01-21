import {ComponentFixture, TestBed} from '@angular/core/testing';
import {my-pgComponent} from "./my-pg.component";
import {TranslateLoader, TranslateModule} from "@ngx-translate/core";
import {Observable, of} from "rxjs";

describe('MyPgComponent', () => {
  let fixture: ComponentFixture<MyPgComponent>;
  let component: MyPgComponent;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MyPgComponent],
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

    fixture = TestBed.createComponent(MyPgComponent);
    component = fixture.componentInstance;
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });
});
