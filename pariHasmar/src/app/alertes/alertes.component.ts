import { Component, OnInit } from '@angular/core';
import * as $ from 'jquery';
import { AlerteService } from '../shared/alerte.service';
import { ToastrService } from 'ngx-toastr';
import { AlerteModel } from '../models/alerte.model';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { ServiceModel } from '../models/service.model';
import { SousServiceModel } from '../models/sousservice.model';
@Component({
  selector: 'app-alertes',
  templateUrl: './alertes.component.html',
  styleUrls: ['./alertes.component.css'],
  // providers: [NgbModalConfig, NgbModal]
})
export class AlertesComponent implements OnInit {
  id: any = "";
  TousLesServices: ServiceModel[];
  TousLesSousServices: SousServiceModel[];
  Allalertes: AlerteModel[];
  alerteModelObj: AlerteModel = new AlerteModel;

  files: any;
  submitted = false;
  form: any;

  constructor(private toastr: ToastrService,
    private alerteService: AlerteService,
    private modalService: NgbModal) {
    this.alerteService.Allalertes.subscribe(res => {
      this.Allalertes = res;
    })
    this.showSuccess();
  }

  ngOnInit(): void {
  }

  showSuccess() {
    this.toastr.success('Bienvenue', 'Pari-Hassmar');
    this.alerteService.show("");
  }

  reset() {
    var form = new FormData();
    form.append("intitule", $("#intitule").val(""))
    form.append("niveau", $("#niveau").val(""))
    form.append("description", $("#description").val(""))
    form.append("fichier", $("#fichier").val(""))
    form.append("latitude", $("#latitude").val(""))
    form.append("longitude", $("#longitude").val(""))
    form.append("destinataire", $("#destinataire").val(""))
    form.append("alerte_services_id", $("#services_id").val(""))
  }
  ajouterAlerte() {
    var form = new FormData();

    form.append("intitule", $("#intitule").val())
    form.append("niveau", $("#niveau").val())
    form.append("description", $("#description").val())
    // form.append("fichier", $("#fichier").val())
    form.append("latitude", $("#latitude").val())
    form.append("longitude", $("#longitude").val())
    form.append("destinataire", $("#destinataire").val())
    form.append("alerte_services_id", $("#services_id").val())


    this.alerteService.ajouterAlerte(form).subscribe(res => {
      // console.log(data);

      var r: any = res;
      this.toastr.success(r.message, "Success");
      this.reset();
      this.alerteService.show("");
    }, error => {
      error.error.error.forEach(el => {
        this.toastr.error(el, "Error");
      });
    })
  }
  // recuperer l'element a modifier par son id
  showUpdateModel(id) {
    this.Allalertes.forEach(el => {
      if (id == el.id) {
        this.id = el.id;
        $('#updateIntitule').prop("value", el.intitule);
        $('#updateNiveau').prop("value", el.niveau);
        $('#updateDescription').prop("value", el.description);
        $('#updateFichier').prop("value", el.fichier);
        $('#updateLatitude').prop("value", el.latitude);
        $('#updateLongitude').prop("value", el.longitude);
        $('#updateDestinataire').prop("value", el.destinataire);
        $('#services_id').prop("value", el.alerte_services_id);
      }
    })
  }

  // recuperer l'informations supplementaires par son id

  updateDate = new Date();
  infosSupplementaires(id) {
    this.Allalertes.forEach(el => {
      if (id == el.id) {
        this.id = el.id;
        $('#infosIntitule').prop("value", el.intitule);
        $('#infosNiveau').prop("value", el.niveau);
        $('#infosDescription').prop("value", el.description);
        $('#infosFichier').prop("value", el.fichier);
        $('#infosLatitude').prop("value", el.latitude);
        $('#infosLongitude').prop("value", el.longitude);
        $('#infosDestinataire').prop("value", el.destinataire);
        $('#infosCreated').prop("value", el.created_at);
        $('#infosService').prop("value", el.updated_at);
      }
    })
  }

  update(id) {
    var form = new FormData();

    form.append("id", this.id)
    form.append("intitule", $("#updateIntitule").val())
    form.append("niveau", $("#updateNiveau").val())
    form.append("description", $("#updateDescription").val())
    form.append("fichier", $("#updateFichier").val())
    form.append("latitude", $("#updateLatitude").val())
    form.append("longitude", $("#updateLongitude").val())
    form.append("destinataire", $("#updateDestinataire").val())
    form.append("alerte_services_id", $("#services_id").val())

    this.alerteService.update(form).subscribe(res => {
      // console.log(data);

      var r: any = res;
      this.toastr.success(r.message, "Success");
      this.alerteService.show("");
    }, error => {
      error.error.error.forEach(el => {
        this.toastr.error(el, "Error");
      });
    })
  }
  delete(id) {
    this.alerteService.delete(id).subscribe(res => {
      var r: any = res;
      this.toastr.success(r.message, "Success");
      this.alerteService.show("");

    }, error => {
      error.error.error.forEach(el => {
        this.toastr.error(el, "Error");
      });
    })
  }

  search(v) {
    this.alerteService.show(v);
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


  //  uploadImage(event){
  //   this.files = event.target.files[0];
  //   console.log(this.files);

  // }

  uploadImage(event) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.form.get('fichier').setValue(file);
    }
  }


}
