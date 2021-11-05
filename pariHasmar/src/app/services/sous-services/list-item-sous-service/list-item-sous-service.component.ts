import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { SousServiceModel } from 'src/app/models/sousservice.model';
import { AgentSousServiceService } from 'src/app/shared/agent-sousservice.service';

@Component({
  selector: 'app-list-item-sous-service',
  templateUrl: './list-item-sous-service.component.html',
  styleUrls: ['./list-item-sous-service.component.css']
})
export class ListItemSousServiceComponent implements OnInit {

  TousLesSousServices: SousServiceModel[];
  constructor(private toastr: ToastrService, private monSousService: AgentSousServiceService, private modalService: NgbModal) {
    this.monSousService.TousLesSousServices.subscribe(res => {
      this.TousLesSousServices = res;
      // this.monSousService.show("");
    })
  }

  ngOnInit(): void {
  }

}
