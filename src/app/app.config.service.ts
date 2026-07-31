import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "../environments/environment";
import { AppConfig } from "./app-config.model";

@Injectable({
    providedIn: 'root'
})
export class AppConfigService {
    static settings: AppConfig;
    constructor(private http: HttpClient) { }
    load() {
        const jsonFile = 'assets/config/config.' + environment.name + '.json';
        return new Promise<void>((resolve, reject) => {
            this.http.get<AppConfig>(jsonFile).toPromise().then((response) => {
                if (!response) {
                    throw new Error(`Empty configuration file ${jsonFile}`);
                }
                AppConfigService.settings = response;
                resolve();
            }).catch((response: any) => {
                reject('Could not load file ' + jsonFile);
            });
        });
    }


}
