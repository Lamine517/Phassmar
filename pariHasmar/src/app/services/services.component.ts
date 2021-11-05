import { Component, OnInit } from '@angular/core';
import * as $ from 'jquery';
import { AgentServiceService } from '../shared/agent-service.service';
import { ToastrService } from 'ngx-toastr';
import { ServiceModel } from '../models/service.model';

import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
@Component({
  selector: 'app-services',
  templateUrl: './services.component.html',
  styleUrls: ['./services.component.css']
})
export class ServicesComponent implements OnInit {

  // recuperer l'identifiant
  id: any = "";
  TousLesServices: ServiceModel[];
  serviceModelObj: ServiceModel = new ServiceModel;

  constructor(private toastr: ToastrService, private monService: AgentServiceService, private modalService: NgbModal) {
    this.monService.TousLesServices.subscribe(res => {
      this.TousLesServices = res;
    })
  }

  ngOnInit(): void {
  }

  reset() {
    var formulaire = new FormData();

    formulaire.append("libelle_service", $('#libelle_service').val(""))
  }
  ajouterService() {
    var formulaire = new FormData();

    formulaire.append("libelle_service", $('#libelle_service').val())

    this.monService.ajouterService(formulaire).subscribe(res => {
      var resultat: any = res;
      this.toastr.success(resultat.message, "Success");
      this.reset();
      this.monService.show("");
    }, error => {
      error.error.error.forEach(el => {
        this.toastr.error(el, "Error");
      });
    })
  }

  showUpdateModel(id) {
    this.TousLesServices.forEach(el => {
      if (id == el.id) {
        this.id = el.id;
        $('#updateLibelleService').prop("value", el.libelle_service);
      }
    })
  }

  update(id) {
    var formulaire = new FormData();
    formulaire.append("id", this.id)
    formulaire.append("libelle_service", $('#updateLibelleService').val())

    this.monService.update(formulaire).subscribe(res => {
      var resultat: any = res;
      this.toastr.success(resultat.message, "Success");
      this.monService.show("");
    }, error => {
      error.error.error.forEach(el => {
        this.toastr.error(el, "Error");
      });
    })
  }


  delete(id) {
    this.monService.delete(id).subscribe(res => {
      // console.log(data);

      var r: any = res;
      this.toastr.success(r.message, "Success");
      this.monService.show("");
    }, error => {
      error.error.error.forEach(el => {
        this.toastr.error(el, "Error");
      });
    })
  }

  search(v) {
    this.monService.show(v);
  }

  closeModal: string | undefined;

  // constructor(private modalService: NgbModal) {}

  triggerModal(content: any) {
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' }).result.then((res) => {
      this.closeModal = `Closed with: ${res}`;
    }, (res) => {
      this.closeModal = `Dismissed ${this.getDismissReason(res)}`;
    });
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }

}
