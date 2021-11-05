import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";
import { ServiceModel } from "../models/service.model";
import { HttpClient, HttpClientModule} from '@angular/common/http';
@Injectable({
    providedIn: 'root'
})

export class AgentServiceService{
    TousLesServices = new BehaviorSubject<ServiceModel[]>(null);
    private baseURL="http://127.0.0.1:8000/api/";
    constructor( private http:HttpClient){
        this.show("");
    }

    ajouterService(formulaire)
    {
        return this.http.post(this.baseURL+'ajouter-service',formulaire);
    }

    update(formulaire)
    {
        return this.http.post(this.baseURL+'update-service',formulaire);
    }

    show(keys)
    {
        return this.http.post(this.baseURL+'show-service?keywords='+keys,null).subscribe(data =>{
            var resultat : any = data;
            this.TousLesServices.next(resultat.services)
        });
    }

    delete(id)
    {
        return this.http.post(this.baseURL+'delete-service?id='+id,null);   
    }
}