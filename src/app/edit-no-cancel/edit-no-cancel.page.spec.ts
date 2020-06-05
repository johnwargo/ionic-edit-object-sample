import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { EditNoCancelPage } from './edit-no-cancel.page';

describe('EditNoCancelPage', () => {
  let component: EditNoCancelPage;
  let fixture: ComponentFixture<EditNoCancelPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditNoCancelPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(EditNoCancelPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
