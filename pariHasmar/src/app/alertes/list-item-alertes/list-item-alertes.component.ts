import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { AlerteModel } from 'src/app/models/alerte.model';
import { AlerteService } from 'src/app/shared/alerte.service';

@Component({
  selector: 'app-list-item-alertes',
  templateUrl: './list-item-alertes.component.html',
  styleUrls: ['./list-item-alertes.component.css']
})
export class ListItemAlertesComponent implements OnInit {

  Allalertes: AlerteModel[];


  constructor(private toastr: ToastrService,
    private alerteService: AlerteService,
    private modalService: NgbModal) {
    this.alerteService.Allalertes.subscribe(res => {
      this.Allalertes = res;
    })
  }

  ngOnInit(): void {
  }

}
