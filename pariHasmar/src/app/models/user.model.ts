import { ServiceModel } from "./service.model";
import { SousServiceModel } from "./sousservice.model";

export class UserModel {
    "id": any = "";
    "name": any = "";
    "email": any = "";
    "password": any = "";
    "password_confirmation": any = "";
    "role": any;
    "services_id": any = "";
    "sous_services_id": any = "";
    "libelle_service" = ServiceModel["libelle_service"];
    "libelle_sous_service" = SousServiceModel["libelle_sous_service"];
}