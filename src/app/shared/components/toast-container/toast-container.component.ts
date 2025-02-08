import {Component, TemplateRef} from '@angular/core';

import {NgbToast} from '@ng-bootstrap/ng-bootstrap';
import {ToastService} from '../../services/toast.service';
import {NgForOf, NgIf, NgTemplateOutlet} from '@angular/common';


@Component({
  selector: 'app-toasts',
  template: `
    <ngb-toast
      *ngFor="let toast of toastService.toasts"
      [class]="toast.classname"
      [autohide]="true"
      [delay]="toast.delay || 5000"
      (hidden)="toastService.remove(toast)"
    >
      <ng-template [ngIf]="isTemplate(toast)" [ngIfElse]="text">
        <ng-template [ngTemplateOutlet]="toast.textOrTpl"></ng-template>
      </ng-template>

      <ng-template #text>{{ toast.textOrTpl }}</ng-template>
    </ngb-toast>
  `,
  imports: [
    NgbToast,
    NgTemplateOutlet,
    NgIf,
    NgForOf
  ],
  styles: `
    :host {
    position: fixed;
    top: 0;
    right: 0;
    margin: 0.5em;
    z-index: 1200;
  }`,
  host: {'[class.ngb-toasts]': 'true'}
})
export class ToastsContainer {
  constructor(public toastService: ToastService) {
  }

  isTemplate(toast: any) {
    return toast.textOrTpl instanceof TemplateRef;
  }
}
