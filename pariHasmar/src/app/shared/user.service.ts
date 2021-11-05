import { Injectable } from "@angular/core";
// import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';
import { BehaviorSubject } from 'rxjs';
import { UserModel } from "../models/user.model";
import { HttpClient} from '@angular/common/http';
@Injectable({
    providedIn: 'root'
})

export class UserService{
    TousLesUtilisateurs = new BehaviorSubject<UserModel[]>(null);
    private baseURL="http://127.0.0.1:8000/api/auth/";
    constructor( private http:HttpClient){
        this.show("");
    }

    ajouterUtilisateur(form)
    {
        return this.http.post(this.baseURL+'register',form);
    }

    update(form)
    {
        return this.http.post(this.baseURL+'update-utilisateur',form);
    }

    show(keys)
    {
        return this.http.post(this.baseURL+'show-utilisateur?keywords='+keys,null).subscribe(res =>{
            var r : any=res;
            this.TousLesUtilisateurs.next(r.users)
        });
    }

    delete(id)
    {
        return this.http.post(this.baseURL+'delete-utilisateur?id='+id,null);   
    }
}
