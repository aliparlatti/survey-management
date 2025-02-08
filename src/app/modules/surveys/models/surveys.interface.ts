interface IQuestionOption {
  id: number;
  text: string;
}

interface IQuestion {
  id: number;
  text: string;
  type: IQuestionType;
  options: IQuestionOption[];
}
export enum IQuestionType {
  Text = "text",
  Select = "select",
}

export  interface ISurvey {
  id: number;
  title: string;
  questions?: IQuestion[];
}
