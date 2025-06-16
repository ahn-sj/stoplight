import { type FC, useCallback, useEffect } from 'react';
import { X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import type { ISpeechFeedback, TFeedbackResult } from '../types';

interface IFeedbackModalProps {
  feedback: ISpeechFeedback;
  onClose: () => void;
}

interface IResultConfig {
  color: string;
  icon: string;
  title: string;
}

const RESULT_CONFIGS: Record<TFeedbackResult, IResultConfig> = {
  red: {
    color: 'text-traffic-red bg-red-50 border-red-200',
    icon: '🔴',
    title: '개선이 필요해요',
  },
  yellow: {
    color: 'text-traffic-yellow bg-yellow-50 border-yellow-200',
    icon: '🟡',
    title: '좋아요!',
  },
  green: {
    color: 'text-traffic-green bg-green-50 border-green-200',
    icon: '🟢',
    title: '완벽해요!',
  },
} as const;

interface IDetailItem {
  key: keyof NonNullable<ISpeechFeedback['details']>;
  icon: string;
  label: string;
}

const DETAIL_ITEMS: IDetailItem[] = [
  { key: 'grammar', icon: '📝', label: '문법' },
  { key: 'pronunciation', icon: '🗣️', label: '발음' },
  { key: 'fluency', icon: '⚡', label: '유창성' },
] as const;

const FeedbackModal: FC<IFeedbackModalProps> = ({ feedback, onClose }) => {
  const config = RESULT_CONFIGS[feedback.result];

  const handleKeyDown = useCallback(
    (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    },
    [onClose]
  );

  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [handleKeyDown]);

  const handleBackdropClick = useCallback(
    (event: React.MouseEvent) => {
      if (event.target === event.currentTarget) {
        onClose();
      }
    },
    [onClose]
  );

  return (
    <div
      className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50 animate-fade-in"
      onClick={handleBackdropClick}
      role="dialog"
      aria-modal="true"
      aria-labelledby="feedback-title"
      aria-describedby="feedback-description"
    >
      <Card className="w-full max-w-md max-h-[80vh] overflow-y-auto bg-white border-2 shadow-2xl card-safe-bg">
        {/* 모달 헤더 */}
        <CardHeader className="relative pb-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <span className="text-3xl" aria-hidden="true">
                {config.icon}
              </span>
              <div>
                <CardTitle id="feedback-title" className="text-xl text-gray-900">
                  {config.title}
                </CardTitle>
                <CardDescription id="feedback-description" className="text-gray-600">
                  말하기 분석 결과
                </CardDescription>
              </div>
            </div>
            <Button
              variant="ghost"
              size="icon"
              onClick={onClose}
              className="rounded-full hover:bg-gray-100 text-gray-600 hover:text-gray-900"
              aria-label="모달 닫기"
            >
              <X className="w-4 h-4" aria-hidden="true" />
            </Button>
          </div>
        </CardHeader>

        {/* 모달 내용 */}
        <CardContent className="space-y-6">
          {/* 결과 요약 */}
          <div className={cn('rounded-xl p-4 border-2', config.color)} role="status">
            <p className="font-medium text-center text-gray-800">{feedback.message}</p>
          </div>

          {/* 상세 피드백 */}
          {feedback.details && (
            <div className="space-y-4">
              <h3 className="font-semibold text-lg flex items-center space-x-2 text-gray-900">
                <span aria-hidden="true">📊</span>
                <span>상세 분석</span>
              </h3>

              <div className="space-y-3" role="list">
                {DETAIL_ITEMS.map(({ key, icon, label }) => {
                  const detail = feedback.details?.[key];
                  if (!detail) return null;

                  return (
                    <Card
                      key={key}
                      className="bg-gray-50 border border-gray-200 card-safe-bg"
                      role="listitem"
                    >
                      <CardContent className="p-4">
                        <div className="flex items-center space-x-2 mb-2">
                          <span className="text-lg" aria-hidden="true">
                            {icon}
                          </span>
                          <h4 className="font-medium text-gray-900">{label}</h4>
                        </div>
                        <p className="text-sm text-gray-600">{detail}</p>
                      </CardContent>
                    </Card>
                  );
                })}
              </div>
            </div>
          )}

          {/* 액션 버튼들 */}
          <div className="flex space-x-3 pt-4" role="group" aria-label="액션 버튼">
            <Button
              onClick={onClose}
              variant="outline"
              className="flex-1 bg-white border-2 border-gray-400 text-gray-800 hover:bg-gray-100 hover:text-gray-900 hover:border-gray-500 font-medium btn-outline-safe"
              aria-label="다시 연습하기"
            >
              다시 연습하기
            </Button>
            <Button
              onClick={onClose}
              variant="default"
              className="flex-1 bg-blue-600 text-white hover:bg-blue-700 border-2 border-blue-600 hover:border-blue-700 font-medium btn-primary-safe"
              aria-label="확인하고 닫기"
            >
              확인
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default FeedbackModal;
