import { Component, OnInit } from '@angular/core';
import { AuthService } from './../../shared/auth.service';
import {ToastrService} from 'ngx-toastr';
import { AlerteModel } from './../../models/alerte.model';
import {AuthAlerteService} from './../../shared/auth-alerte.service';
import {ModalDismissReasons, NgbModal} from '@ng-bootstrap/ng-bootstrap';
import * as $ from 'jquery';
// User interface
export class User {
  name: String;
  email: String;
}

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})

export class UserProfileComponent implements OnInit {
  UserProfile: User;

  id: any = "";
  AuthAllalertes: AlerteModel[];
  alerteModelObj : AlerteModel = new AlerteModel;

  constructor(
    public authService: AuthService,
    private toastr : ToastrService , 
    private authAlerteService: AuthAlerteService,
    private modalService:NgbModal
  ) {
    this.authService.profileUser().subscribe((data:any) => {
      this.UserProfile = data;
    })
  }

  // ngOnInit() { }
  // dtOptions: DataTables.Settings = {};
  // constructor() { }

  ngOnInit(): void {
    // this.dtOptions = {
    //   pagingType: 'full_numbers',
    //   pageLength: 10,
    //   autoWidth:true,
      // language:{url:"/assets/datatable-French.json"},
    // }; 
  }
  ajouterAlerte()
  {
    var form = new FormData();

    form.append("intitule",$("#intitule").val())
    form.append("niveau",$("#niveau").val())
    form.append("description",$("#description").val())
    form.append("fichier",$("#fichier").val())
    form.append("latitude",$("#latitude").val())
    form.append("longitude",$("#longitude").val())
    form.append("destinataire",$("#destinataire").val())

    this.authAlerteService.ajouterAlerte(form).subscribe(res =>{
      // console.log(data);
      
        var r:any = res;
        this.toastr.success(r.message, "Success");
        this.authAlerteService.show("");
    },error=> {
            error.error.error.forEach(el => {
                this.toastr.error(el, "Error");             
          });
    })
  }
// recuperer l'element a modifier
  showUpdateModel(id)
  {
    this.AuthAllalertes.forEach(el =>{
      if(id == el.id)
      {
        this.id = el.id;
        $('$intitule').prop("value",el.intitule);
        $('$niveau').prop("value",el.niveau);
        $('$description').prop("value",el.description);
        $('$fichier').prop("value",el.fichier);
        $('$latitude').prop("value",el.latitude);
        $('$longitude').prop("value",el.longitude);
        $('$destinataire').prop("value",el.destinataire);
      }
    })
  }

  update(id)
  {
    var form = new FormData();

    form.append("id",this.id)
    form.append("intitule",$("#updateIntitule").val())
    form.append("niveau",$("#updateNiveau").val())
    form.append("description",$("#updateDescription").val())
    form.append("fichier",$("#updateFichier").val())
    form.append("latitude",$("#updateLatitude").val())
    form.append("longitude",$("#updateLongitude").val())
    form.append("destinataire",$("#updateDestinataire").val())

    this.authAlerteService.update(form).subscribe(res =>{
      // console.log(data);
      
        var r:any = res;
        this.toastr.success(r.message, "Success");
        this.authAlerteService.show("");
    },error=> {
            error.error.error.forEach(el => {
                this.toastr.error(el, "Error");             
          });
    })    
  }
  delete(id)
  {
    this.authAlerteService.delete(id).subscribe(res =>{
      // console.log(data);
      
        var r:any = res;
        this.toastr.success(r.message, "Success");
        this.authAlerteService.show("");
    },error=> {
            error.error.error.forEach(el => {
                this.toastr.error(el, "Error");             
          });
    })
  }

  search(v)
  {
    this.authAlerteService.show(v);
  }


  closeModal: string | undefined;
  
  // constructor(private modalService: NgbModal) {}
    
  triggerModal(content: any) {
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((res) => {
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
      return  `with: ${reason}`;
    }
  }
}
