import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { ServiceModel } from 'src/app/models/service.model';
import { AgentServiceService } from 'src/app/shared/agent-service.service';

@Component({
  selector: 'app-list-item-service',
  templateUrl: './list-item-service.component.html',
  styleUrls: ['./list-item-service.component.css']
})
export class ListItemServiceComponent implements OnInit {

  TousLesServices: ServiceModel[];

  constructor(private toastr: ToastrService, private monService: AgentServiceService, private modalService: NgbModal) {
    this.monService.TousLesServices.subscribe(res => {
      this.TousLesServices = res;
    })
  }

  ngOnInit(): void {
  }

}
