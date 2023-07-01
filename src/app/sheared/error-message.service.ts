import { Injectable } from "@angular/core";
import { HttpClient, HttpParams } from '@angular/common/http';
import { AuthInterceptor } from "../HttpIntercepter";
import { Observable } from 'rxjs';
import { Subject } from "rxjs/Subject";

@Injectable()
export class ErrorMessageService {

  private errors = new Subject<string[]>();

    constructor() { }

    public addErrors = (errors: string[]): void =>
        this.errors.next(errors);

    public getErrors = () =>
        this.errors.asObservable();

}

