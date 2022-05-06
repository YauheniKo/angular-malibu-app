import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ArticleTextComponent } from './article-text.component';

describe('ArticleTextComponent', () => {
  let component: ArticleTextComponent;
  let fixture: ComponentFixture<ArticleTextComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ArticleTextComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ArticleTextComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
