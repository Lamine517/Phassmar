import { Component, OnInit } from '@angular/core';
import * as $ from 'jquery';
import { AgentSousServiceService } from '../../shared/agent-sousservice.service';
import { ToastrService } from 'ngx-toastr';
import { SousServiceModel } from '../../models/sousservice.model';
import { ServiceModel } from '../../models/service.model';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-sous-services',
  templateUrl: './sous-services.component.html',
  styleUrls: ['./sous-services.component.css']
})

export class SousServicesComponent implements OnInit {

  // recuperer l'identifiant
  id: any = "";
  TousLesServices: ServiceModel[];
  TousLesSousServices: SousServiceModel[];
  sousServiceModelObj: SousServiceModel = new SousServiceModel;

  constructor(private toastr: ToastrService, private monSousService: AgentSousServiceService, private modalService: NgbModal) {
    this.monSousService.TousLesSousServices.subscribe(res => {
      this.TousLesSousServices = res;
    })
  }
  getValues() {
    console.log(this.TousLesServices);
  }

  ngOnInit(): void {
  }
  reset() {
    var formulaire = new FormData();

    formulaire.append("libelle_sous_service", $('#libelle_sous_service').val(""))
    formulaire.append("services_id", $('#services_id').val(""))
  }

  ajouterSousService() {
    var formulaire = new FormData();

    formulaire.append("libelle_sous_service", $('#libelle_sous_service').val())
    formulaire.append("services_id", $('#services_id').val())

    this.monSousService.ajouterSousService(formulaire).subscribe(res => {
      var resultat: any = res;
      this.toastr.success(resultat.message, "Success");
      this.reset();
      this.monSousService.show("");
    }, error => {
      error.error.error.forEach(el => {
        this.toastr.error(el, "Error");
      });
    })
  }

  showUpdateModel(id) {
    this.TousLesSousServices.forEach(el => {
      if (id == el.id) {
        this.id = el.id;
        $('#updateLibelleSousService').prop("value", el.libelle_sous_service);
        $('#updateServices_id').prop("value", el.services_id);
      }
    })
  }

  update(id) {
    var formulaire = new FormData();
    formulaire.append("id", this.id)
    formulaire.append("libelle_sous_service", $('#updateLibelleSousService').val())
    formulaire.append("services_id", $('#updateServices_id').val())

    this.monSousService.update(formulaire).subscribe(res => {
      var resultat: any = res;
      this.toastr.success(resultat.message, "Success");
      this.monSousService.show("");
    }, error => {
      error.error.error.forEach(el => {
        this.toastr.error(el, "Error");
      });
    })
  }

  delete(id) {
    this.monSousService.delete(id).subscribe(res => {
      // console.log(data);

      var r: any = res;
      this.toastr.success(r.message, "Success");
      this.monSousService.show("");
    }, error => {
      error.error.error.forEach(el => {
        this.toastr.error(el, "Error");
      });
    })
  }

  search(v) {
    this.monSousService.show(v);
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
