import { Component, Input, OnInit } from '@angular/core';
import { NgbActiveModal, NgbModal, NgbModalConfig } from '@ng-bootstrap/ng-bootstrap';
import { CancelModalComponent } from '../../modals/cancel-modal/cancel-modal.component';
import { ToastsService } from 'src/app/services/toasts/toasts.service';

@Component({
  selector: 'app-event-types-form',
  templateUrl: './event-types-form.component.html',
  styleUrls: ['./event-types-form.component.css', '../../../../styles.css'],
  providers: [NgbModalConfig, NgbModal]
})
export class EventTypesFormComponent implements OnInit {
  @Input() title: any;

  constructor(
    private toastService: ToastsService,
    private modalService: NgbModal,
    private activeModal: NgbActiveModal
  ) {}

	cancel() {
		const modalRef = this.modalService.open(CancelModalComponent);
    modalRef.componentInstance.cancelData.subscribe(() => {
      this.activeModal.close();
    })
	}

  save() {
    this.activeModal.close();
    this.toastService.showSuccess('Cadastro realizado com sucesso.');
  }

  ngOnInit(): void { }
}