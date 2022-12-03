import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CancelModalComponent } from '../../modals/cancel-modal/cancel-modal.component';
import { ToastsService } from 'src/app/services/toasts/toasts.service';
import { ActivatedRoute, Router } from '@angular/router';
import { EstablishmentApiService } from 'src/app/services/establishments/establishment-api.service';
import { Establishment } from 'src/app/classes/establishments/establishment';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-establishments-form',
  templateUrl: './establishments-form.component.html',
  styleUrls: ['./establishments-form.component.css', '../../../../styles.css'],
})
export class EstablishmentsFormComponent implements OnInit {
  title = 'Cadastro';
  id!: number;
  establishment = new Establishment();

	constructor(
    private toastService: ToastsService,
    private modalService: NgbModal,
    private establishmentService: EstablishmentApiService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  navigateToTable() {
    return this.router.navigate(['/establishments']);
  }

	cancel() {
		const modalRef = this.modalService.open(CancelModalComponent);
    modalRef.componentInstance.cancelData.subscribe(() => {
      this.navigateToTable();
    })
	}

  save() {
    if (!this.id) {
      this.establishmentService.createEstablishment(this.establishment).subscribe((res) => {
        this.toastService.showSuccess(res.body.msg);
        this.navigateToTable();
      }, (err: HttpErrorResponse) => {
        this.toastService.showDanger(err.error[0].msg);
      });
    } else {
      this.establishmentService.updateEstablishment(this.id, this.establishment).subscribe((res) => {
        this.toastService.showSuccess(res.body.msg);
        this.navigateToTable();
      }, (err: HttpErrorResponse) => {
        this.toastService.showDanger(err.error[0].msg);
      });
    }
  }

  clearForm() {
    this.establishment.cep = '';
    this.establishment.street = '';
    this.establishment.neighborhood = '';
    this.establishment.city = '';
    this.establishment.state = '';
  }

  myCallback(body: any) {
    if (!('erro' in body)) {
      this.establishment.street = body.logradouro;
      this.establishment.neighborhood = body.bairro;
      this.establishment.city = body.localidade;
      this.establishment.state = body.uf;
    } else {
      this.toastService.showDanger('CEP informado não encontrado.')
      this.clearForm();
    }
  }

  async searchCep() {
    var cep = this.establishment.cep.replace(/\D/g, '');
    if (cep != '') {
      var validateCep = /^[0-9]{8}$/;
      if (validateCep.test(cep)) {
        const body = await (await fetch(`https://viacep.com.br/ws/${cep}/json`)).json();
        this.myCallback(body);
      } else {
        this.toastService.showWarning('CEP informado com formato inválido.')
        this.clearForm();
      }
    } else {
      this.clearForm();
    }
  }

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];
    if (this.id) {
      this.title = "Edição";
      this.establishmentService.findById(this.id).subscribe((data) => {
        this.establishment = data;
      });
    }
  }
}
