import { ServiceModel } from "./service.model";

export class AlerteModel {
    "id": any = "";
    "intitule": any = "";
    "niveau": any = "";
    "description": any = "";
    "fichier": any = "";
    "latitude": any = "";
    "longitude": any = "";
    "destinataire": any = "";
    "created_at": Date = new Date();
    "updated_at": Date = new Date();
    "alerte_services_id": any = "";
    "libelle_service" = ServiceModel["libelle_service"];
}