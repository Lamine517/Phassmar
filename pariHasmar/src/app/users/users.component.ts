import { Component, OnInit } from '@angular/core';
import * as $ from 'jquery';
import { UserService } from '../shared/user.service';
import { ToastrService } from 'ngx-toastr';
import { UserModel } from '../models/user.model';

import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ServiceModel } from '../models/service.model';
import { SousServiceModel } from '../models/sousservice.model';
@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {

  // recuperer l'identifiant
  id: any = "";
  TousLesServices: ServiceModel[];
  TousLesSousServices: SousServiceModel[];
  TousLesUtilisateurs: UserModel[];
  UserModelObj: UserModel = new UserModel;
  constructor(private toastr: ToastrService, private monUtilisateur: UserService, private modalService: NgbModal) {
    this.monUtilisateur.TousLesUtilisateurs.subscribe(res => {
      this.TousLesUtilisateurs = res;
    })
  }

  ngOnInit(): void {
  }
  reset() {
    var formulaire = new FormData();

    formulaire.append("name", $('#name').val(""))
    formulaire.append("email", $('#email').val(""))
    formulaire.append("password", $('#password').val(""))
    formulaire.append("password_confirmation", $('#password_confirmation').val(""))
    formulaire.append("role", $('#role').val(""))
    formulaire.append("services_id", $('#services_id').val(""))
    formulaire.append("sous_services_id", $('#sous_services_id').val(""))
  }

  ajouterUtilisateur() {
    var formulaire = new FormData();

    formulaire.append("name", $('#name').val())
    formulaire.append("email", $('#email').val())
    formulaire.append("password", $('#password').val())
    formulaire.append("password_confirmation", $('#password_confirmation').val())
    formulaire.append("role", $('#role').val())
    formulaire.append("services_id", $('#services_id').val())
    formulaire.append("sous_services_id", $('#sous_services_id').val())

    this.monUtilisateur.ajouterUtilisateur(formulaire).subscribe(res => {
      var resultat: any = res;
      this.toastr.success(resultat.message, "Success");
      this.reset();
      this.monUtilisateur.show("");
    }, error => {
      error.error.error.forEach(el => {
        this.toastr.error(el, "Error");
      });
    })
  }

  showUpdateModel(id) {
    this.TousLesUtilisateurs.forEach(el => {
      if (id == el.id) {
        this.id = el.id;
        $('#updateName').prop("value", el.name);
        $('#updateEmail').prop("value", el.email);
        $('#updatePassword').prop("value", el.password);
        $('#updatePassword_confirmation').prop("value", el.password_confirmation);
        $('#updateRole').prop("value", el.role);
        $('#services_id').prop("value", el.services_id);
        $('#sous_services_id').prop("value", el.sous_services_id);
      }
    })
  }

  update(id) {
    var formulaire = new FormData();
    formulaire.append("id", this.id)
    formulaire.append("name", $('#updateName').val())
    formulaire.append("email", $('#updateEmail').val())
    formulaire.append("password", $('#updatePassword').val())
    formulaire.append("password_confirmation", $('#updatePassword_confirmation').val())
    formulaire.append("role", $('#updateRole').val())
    formulaire.append("services_id", $('#services_id').val())
    formulaire.append("sous_services_id", $('#sous_services_id').val())

    this.monUtilisateur.update(formulaire).subscribe(res => {
      var resultat: any = res;
      this.toastr.success(resultat.message, "Success");
      this.monUtilisateur.show("");
    }, error => {
      error.error.error.forEach(el => {
        this.toastr.error(el, "Error");
      });
    })
  }


  delete(id) {
    this.monUtilisateur.delete(id).subscribe(res => {
      // console.log(data);

      var r: any = res;
      this.toastr.success(r.message, "Success");
      this.monUtilisateur.show("");
    }, error => {
      error.error.error.forEach(el => {
        this.toastr.error(el, "Error");
      });
    })
  }

  search(v) {
    this.monUtilisateur.show(v);
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
