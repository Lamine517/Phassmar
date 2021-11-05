import { ServiceModel } from "./service.model";
var tableau = new ServiceModel;

export class SousServiceModel {
    "id": any = "";
    "libelle_sous_service": any = "";
    "services_id": any = "";
    "libelle_service" = ServiceModel["libelle_service"];
}