import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ChangeLangPage } from './change-lang.page';

describe('ChangeLangPage', () => {
  let component: ChangeLangPage;
  let fixture: ComponentFixture<ChangeLangPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChangeLangPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ChangeLangPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
