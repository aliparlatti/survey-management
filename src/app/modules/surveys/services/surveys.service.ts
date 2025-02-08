import {Injectable} from '@angular/core';
import {HttpBaseService} from '../../../shared/services/http-base.service';
import {endpointConfig} from '../../../shared/config/endpoint.config';
import {ISurvey} from '../models/surveys.interface';

@Injectable({
  providedIn: 'root'
})
export class SurveysService extends HttpBaseService<ISurvey> {

  constructor() {
    super(endpointConfig.surveys);
  }
}
