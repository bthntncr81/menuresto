
import { Injectable } from "@angular/core";
import { HttpHelperService } from "../../core/helpers/http-helper.service";

@Injectable({
    providedIn: "root",
})
export class RegisterService {
    constructor(private http: HttpHelperService) { }

    getContacts() {
        // Pass headers and params to the HTTP request
        return this.http.get("Contact", `GetAllContacts`);
    }

    register(payload: any) {
        return this.http.genericPost("User", "RegisterUser", payload);
    }
}
