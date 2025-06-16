export interface ICategory {
  id: string;
  name: string;
  description?: string;
}

export interface IUser {
  id: string;
  name: string;
  email: string;
  profileImage?: string;
}

export type TFeedbackResult = 'red' | 'yellow' | 'green';

export interface ISpeechFeedback {
  result: TFeedbackResult;
  message: string;
  details?: {
    grammar?: string;
    pronunciation?: string;
    fluency?: string;
  };
}

export interface IAppState {
  user: IUser | null;
  categories: ICategory[];
  selectedCategory: ICategory | null;
  currentFeedback: ISpeechFeedback | null;
  isModalOpen: boolean;
  isLoading: boolean;
}

// 추가 타입 정의
export interface IApiResponse<T = unknown> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

export interface IApiError {
  code: string;
  message: string;
  details?: Record<string, unknown>;
}

export type TTheme = 'light' | 'dark' | 'system';

export interface IComponentProps {
  className?: string;
  children?: React.ReactNode;
}

export interface IButtonProps extends IComponentProps {
  variant?:
    | 'default'
    | 'destructive'
    | 'outline'
    | 'secondary'
    | 'ghost'
    | 'link'
    | 'traffic-red'
    | 'traffic-yellow'
    | 'traffic-green';
  size?: 'default' | 'sm' | 'lg' | 'icon';
  disabled?: boolean;
  loading?: boolean;
  onClick?: () => void;
}

export interface IModalProps extends IComponentProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  description?: string;
}

export interface IFormFieldProps extends IComponentProps {
  label?: string;
  error?: string;
  required?: boolean;
  disabled?: boolean;
}
