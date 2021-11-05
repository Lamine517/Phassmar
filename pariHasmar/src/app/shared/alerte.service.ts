import { Injectable } from "@angular/core";
// import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';
import { BehaviorSubject } from 'rxjs';
import { AlerteModel } from "../models/alerte.model";
import { HttpClient } from '@angular/common/http';
@Injectable({
    providedIn: 'root'
})

export class AlerteService {
    Allalertes = new BehaviorSubject<AlerteModel[]>(null);
    private baseURL = "http://127.0.0.1:8000/api/auth/profile/";
    constructor(private http: HttpClient) {
        this.show("");
    }

    ajouterAlerte(form) {
        return this.http.post(this.baseURL + 'ajouter-alerte', form);
    }

    update(form) {
        return this.http.post(this.baseURL + 'update-alerte', form);
    }

    show(keys) {
        return this.http.post(this.baseURL + 'show-alerte?keywords=' + keys, null).subscribe(res => {
            var r: any = res;
            this.Allalertes.next(r.alertes)
        });
    }

    delete(id) {
        return this.http.post(this.baseURL + 'delete-alerte?id=' + id, null);
    }
}
