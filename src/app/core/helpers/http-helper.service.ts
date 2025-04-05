import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "../../../environments/environment.prod";

@Injectable({
  providedIn: "root",
})
export class HttpHelperService {
  apiUrl = environment.URL;

  constructor(private httpClient: HttpClient) { }

  getGenericList<T1, T2, T3>(
    controllerName: string,
    methodName: string,
    filter: FilterModel<T2>
  ): Observable<any> {
    return this.httpClient.post(
      `${this.apiUrl}/${controllerName}/${methodName}`,
      filter
    );
  }

  get<T>(controllerName: string, methodName: string): Observable<any> {
    return this.httpClient.get(
      `${this.apiUrl}/${controllerName}/${methodName}`
    );
  }

  put<T>(
    controllerName: string,
    methodName: string,
    model: T,
    id: number
  ): Observable<any> {
    if (methodName) {
      return this.httpClient.put(
        `${this.apiUrl}/${controllerName}/${methodName}/${id}`,
        model
      );
    } else {
      return this.httpClient.put(
        `${this.apiUrl}/${controllerName}/${id}`,
        model
      );
    }
  }

  getGenericListWithOutFilter<T>(
    controllerName: string,
    methodName: string
  ): Observable<any> {
    return this.httpClient.get(`${this.urlFixer(controllerName, methodName)}`);
  }

  genericPost<T1, T2>(
    controllerName: string,
    methodName: string,
    model: T1
  ): Observable<any> {
    return this.httpClient.post(
      `${this.urlFixer(controllerName, methodName)}`,
      model
    );
  }
  delete(
    controllerName: string,
    methodName: string,
    id: number
  ): Observable<any> {
    return this.httpClient.delete(
      `${this.urlFixer(controllerName, methodName)}?id=${id}`
    );
  }

  deleteSingle(
    controllerName: string,
    methodName: string,
    id: number
  ): Observable<any> {
    return this.httpClient.delete(
      `${this.urlFixer(controllerName, methodName)}${id}`
    );
  }

  deleteWithBody(
    controllerName: string,
    methodName: string,
    model: any
  ): Observable<any> {
    return this.httpClient.delete(
      `${this.urlFixer(controllerName, methodName)}`,
      { body: model }
    );
  }
  urlFixer(controllerName: string, methodName: string): string {
    return `${this.apiUrl}/${controllerName}/${methodName}`;
  }
}

export class ServiceResultModel<T> {
  data?: T;
  success?: boolean;
  message?: string;
  statusCode?: HTTPStatusCode;
}

export class ServiceListResultModel<T1, T2> {
  data?: ListResult<T1, T2>;
  success?: boolean;
  message?: string;
  statusCode?: HTTPStatusCode;
  messages?: string[];
  totalCount?: number;
}

export class ListResult<T1, T2> {
  list?: T1[];
  filter?: T2;
}

export class FilterModel<T> {
  paginationFilter?: PaginationFilterModel;
  sortingFilter?: SortingFilterModel;
  requestFilter?: T;
}

export class PaginationFilterModel {
  take?: number = 10;
  skip?: number;
}

export class SortingFilterModel {
  ListOrderType?: ListOrderTypeEnum;
}

export enum HTTPStatusCode {
  SUCCESS = 200,
  BADREQUEST = 400,
  BADGATEWAY = 500,
}

export enum ListOrderTypeEnum {
  Ascending = 0,
  Descending = 1,
}
