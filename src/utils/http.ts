import { ajax } from 'rxjs/observable/dom/ajax';
import { AjaxError, AjaxResponse } from 'rxjs/Rx';
import { Observable, ObservableInput } from 'rxjs/Observable';
import { message } from 'antd';

export const serializeQuery = (query: any) => {
  const str = [];
  for (const item in query) {
    if (query.hasOwnProperty(item)) {
      str.push(
        encodeURIComponent(item) +
          '=' +
          encodeURIComponent(
            typeof query[item] === 'object'
              ? JSON.stringify(query[item])
              : query[item],
          ),
      );
    }
  }
  return str.join('&');
};

export interface IHttpHeaders {
  [x: string]: string;
}

export interface IHttpQuery {
  [x: string]: any;
}

export interface IHttpOptions {
  method: 'GET' | 'POST' | 'DELETE' | 'PATCH' | 'PUT';
  api: string | undefined;
  path?: string;
  crossDomain?: boolean;
  responseType?: 'json';
  headers?: IHttpHeaders;
  query?: IHttpQuery;
  body?: any;
  interval?: number;
}

export default function({
  method = 'GET',
  api,
  path = '',
  crossDomain = true,
  responseType = 'json',
  headers = {},
  query = {},
  body,
}: IHttpOptions) {
  const url = `${api}${path}`;
  let params: any = { method, url, crossDomain, responseType };

  const defaultHeaders: any = {};
  const defaultQueries: any = {};

  defaultHeaders['Content-Type'] = 'application/json';

  if (!!headers) {
    params = { ...params, headers: { ...defaultHeaders, ...headers } };
  }

  if (!!query) {
    const urlWithQuery = `${url}?${serializeQuery({
      ...defaultQueries,
      ...query,
    })}`;
    params = { ...params, url: urlWithQuery };
  }

  if (body && ['POST', 'PUT', 'PATCH', 'DELETE'].includes(method)) {
    params = { ...params, body };
  }

  return ajax(params)
    .map((e: AjaxResponse) => e.response)
    .catch(
      (e: AjaxError): ObservableInput<string> => {
        const {
          xhr: { status },
          response,
        } = e;
        // tslint:disable-next-line
        console.error(`HTTP ERROR [${status}] - ${response}\n$`, e);
        message.error('Unknown Error', 3);
        return Observable.throw(response);
      },
    );
}
