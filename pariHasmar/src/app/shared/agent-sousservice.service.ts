import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";
import { SousServiceModel } from "../models/sousservice.model";
import { HttpClient, HttpClientModule} from '@angular/common/http';
@Injectable({
    providedIn: 'root'
})

export class AgentSousServiceService{
    TousLesSousServices = new BehaviorSubject<SousServiceModel[]>(null);
    private baseURL="http://127.0.0.1:8000/api/";
    constructor( private http:HttpClient){
        this.show("");
    }

    ajouterSousService(formulaire)
    {
        return this.http.post(this.baseURL+'ajouter-sous-service',formulaire);
    }

    update(formulaire)
    {
        return this.http.post(this.baseURL+'update-sous-service',formulaire);
    }

    show(keys)
    {
        return this.http.post(this.baseURL+'show-sous-service?keywords='+keys,null).subscribe(data =>{
            var resultat : any = data;
            this.TousLesSousServices.next(resultat.sousservices)
        });
    }

    delete(id)
    {
        return this.http.post(this.baseURL+'delete-sous-service?id='+id,null);   
    }
}