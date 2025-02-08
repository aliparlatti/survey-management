import {IUser} from '../../../shared/models/user.interface';
import {ISurvey} from '../../surveys/models/surveys.interface';

export interface IAnsweredQuestion {
  id: number;
  answer: string | number;
}

export interface IAnswer {
  user_id: number;
  survey_id: number;
  questions: IAnsweredQuestion[];
  id: number;
  user: IUser;
  survey: ISurvey;
}
