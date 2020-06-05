import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { EditCancelPage } from './edit-cancel.page';

describe('EditCancelPage', () => {
  let component: EditCancelPage;
  let fixture: ComponentFixture<EditCancelPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditCancelPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(EditCancelPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
