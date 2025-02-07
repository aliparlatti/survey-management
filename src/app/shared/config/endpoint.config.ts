import {environment} from "../../../environments/environment";

export const endpointConfig = {
  surveys: environment.apiBaseUrl + '/surveys',
  answers: environment.apiBaseUrl + '/answers',
};
