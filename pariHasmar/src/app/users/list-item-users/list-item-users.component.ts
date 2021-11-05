import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { UserModel } from 'src/app/models/user.model';
import { UserService } from 'src/app/shared/user.service';

@Component({
  selector: 'app-list-item-users',
  templateUrl: './list-item-users.component.html',
  styleUrls: ['./list-item-users.component.css']
})
export class ListItemUsersComponent implements OnInit {

  TousLesUtilisateurs: UserModel[];
  constructor(private toastr: ToastrService, private monUtilisateur: UserService, private modalService: NgbModal) {
    this.monUtilisateur.TousLesUtilisateurs.subscribe(res => {
      this.TousLesUtilisateurs = res;
    })
  }

  ngOnInit(): void {
  }

}
