import { AxiosInstance, AxiosRequestConfig, AxiosResponse } from "axios";
import { defer, from, Observable, of, throwError } from "rxjs";
import { catchError } from "rxjs/operators";

export class BaseService {
    readonly BASE_API_ENDPOINT = "";

    constructor(
        protected axiosInstance: AxiosInstance,
    ) { }

    private initializeHttpHeader(): void {
        this.axiosInstance.interceptors.request.use(
            (config) => {
                // config.headers.setContentType("application/json");
                // config.headers.setAuthorization("");
                // config.headers["Authorization"] = "";
                // config.headers["Username"] = "user_one";
                // config.headers["Password"] = "6e824d43504ae0934548679a50ec8123";

                return config;
            }, (error) => {
                return Promise.reject(error);
            }
        );
    }

    /**
     * Send HTTP GET using Axios
     * @param url to send get
     * @param config for HTTP
     * @returns observable of axios response
     */
    httpGet(
        url: string,
        config?: AxiosRequestConfig | undefined
    ): Observable<AxiosResponse<any>> {
        this.initializeHttpHeader();

        return defer(() => from(this.axiosInstance.get(this.BASE_API_ENDPOINT + url, config))
            .pipe(
                catchError((error) => {
                    if (error.response?.data) {
                        const tempResp = error.response.data;
                        if (tempResp.code) return of(error.response);
                    }

                    return throwError(() => new Error(error));
                })
            )
        );

    }

    /**
     * Send HTTP POST using Axios
     * @param url to send post
     * @param data request body to send
     * @param config for HTTP
     * @returns observable of axios response
     */
    httpPost(
        url: string,
        data?: any,
        config?: AxiosRequestConfig
    ): Observable<AxiosResponse<any>> {
        this.initializeHttpHeader();

        return defer(() => from(this.axiosInstance.post(this.BASE_API_ENDPOINT + url, data, config))
            .pipe(
                catchError((error) => {
                    if (error.response?.data) {
                        const tempResp = error.response.data;
                        if (tempResp.code) return of(error.response);
                    }

                    return throwError(() => new Error(error));
                })
            )
        );
    }

    /**
     * Send HTTP PUT using Axios
     * @param url to send put
     * @param data request body to send
     * @param config for HTTP
     * @returns observable of axios response
     */
    httpPut(
        url: string,
        data?: any,
        config?: AxiosRequestConfig | undefined
    ): Observable<AxiosResponse<any>> {
        this.initializeHttpHeader();

        return defer(() => from(this.axiosInstance.put(this.BASE_API_ENDPOINT + url, data, config))
            .pipe(
                catchError((error) => {
                    if (error.response?.data) {
                        const tempResp = error.response.data;
                        if (tempResp.code) return of(error.response);
                    }

                    return throwError(() => new Error(error));
                })
            )
        );
    }

    /**
     * Send HTTP DELETE using Axios
     * @param url to send delete
     * @param config for HTTP
     * @returns observable of axios response
     */
    httpDelete(
        url: string,
        config?: AxiosRequestConfig | undefined
    ): Observable<AxiosResponse<any>> {
        this.initializeHttpHeader();

        return defer(() => from(this.axiosInstance.delete(this.BASE_API_ENDPOINT + url, config))
            .pipe(
                catchError((error) => {
                    if (error.response?.data) {
                        const tempResp = error.response.data;
                        if (tempResp.code) return of(error.response);
                    }

                    return throwError(() => new Error(error));
                })
            )
        );
    }

    setStringParam(param: string): string | undefined {
        return param.trim().length > 0 ? param : undefined;
    }
}