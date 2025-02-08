import {Injectable} from '@angular/core';
import {HttpBaseService} from '../../../shared/services/http-base.service';
import {endpointConfig} from '../../../shared/config/endpoint.config';
import {IAnswer} from '../models/answer.model';

@Injectable({
  providedIn: 'root'
})
export class AnswersService extends HttpBaseService<IAnswer> {

  constructor() {
    super(endpointConfig.answers);
  }
}
