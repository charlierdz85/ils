import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor, HttpResponse, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { tap, map, catchError } from 'rxjs/operators';
import { Router, ActivatedRoute } from '@angular/router';
// import {environment} from 'src/environments/environment.prod';

// Services
import { MessagesService, MessageType } from './messages.service';
import { UtilsService } from './utils.service';

@Injectable()
export class Interceptor implements HttpInterceptor {

    constructor(
        private _serv_mssg: MessagesService,
        private _serv_util: UtilsService,
        private activatedRoute: ActivatedRoute
    ) {}

    /**
     * Function which will be called for all http calls
     * @param request HttpRequest
     * @param next HttpHandler
     */
    public intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

        // -- Validanting response -----------------------------------
        return next.handle(request).pipe(
            map(
                response => {
                    // Respuesta a la API.
                    if (response instanceof HttpResponse) {
                        this._serv_mssg.loading(false);
                        const responseData = this.verifyStatus(response.body);

                        if (response.body.type !== null) {
                            this._serv_util.paramsDecode(responseData);
                        }

                        return response.clone({
                            body: responseData
                        });
                    } else if (request instanceof HttpRequest) {
                        // Peticiones de la API.
                        this._serv_mssg.loading(true);
                    } else {
                        this._serv_mssg.message(MessageType.Error
                            , false
                            , 'Error'
                            , ''
                            , 'Error code: 404');
                    }

                    return response;
                },
                error => {
                    if (error instanceof HttpErrorResponse) {
                        this._serv_mssg.message(MessageType.Error
                            , false
                            , error.message
                            , ''
                            , 'Error code: 404');
                    }
                }
            ),
            catchError((error: any) => {
                if (error instanceof HttpErrorResponse) {
                    this._serv_mssg.message(MessageType.Error
                        , false
                        , 'Server Error'
                        , error.message
                        , 'Error code: 500');
                }
                return Observable.throw(error);
              }
            )
        );
    }

    private verifyStatus(jsonResponse: any): any {

        const code = jsonResponse.status;

        if (code === 400) {
            window.location.href = '/signin';
        }

        try {

            let mssgType: MessageType;
            let mssgTitle = '';
            let resultData;

            switch (code.toString().substring(0, 1)) {
                case '2': {
                    this.verifyStatusSuccess(jsonResponse);
                    resultData = jsonResponse.data;
                    break;
                }
                case '3': {
                    mssgType = MessageType.Warning;
                    mssgTitle = 'Warning';
                    resultData = jsonResponse.data;
                    break;
                }
                case '4': {
                    mssgType = MessageType.Warning;
                    mssgTitle = 'Warning';
                    resultData = null;
                    break;
                }
                case '5': {
                    mssgType = MessageType.Error;
                    mssgTitle = 'Server Error';
                    resultData = null;
                    break;
                }
            }

            this._serv_mssg.message(mssgType, false, mssgTitle, jsonResponse.message);
            return resultData;

        } catch (Exception) {
            this._serv_mssg.message(MessageType.Error,
                false,
                'Response Error',
                '',
                'The server response does\'nt have a valid format.');
        }

    }

    private verifyStatusSuccess(jsonResponse: any) {
        switch (jsonResponse.status) {
            case 200: { break; }
            case 201:
            case 202:
            case 203:
            case 299: {
                this._serv_mssg.message(MessageType.Success, false, 'Success', jsonResponse.message);
                break;
            }
       }
    }

}
