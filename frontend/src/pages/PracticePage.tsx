import { type FC, useCallback, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { useAppStore } from '../store/useAppStore';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import TrafficLight from '../components/TrafficLight';
import FeedbackModal from '../components/FeedbackModal';
import type { TFeedbackResult } from '../types';

const ANIMATION_DELAY = 1000;
const BOUNCE_DELAYS = ['0s', '0.1s', '0.2s'] as const;

// 버튼 텍스트 매핑
const BUTTON_TEXT_MAP: Record<TFeedbackResult, string> = {
  red: '빨간불 테스트',
  yellow: '노란불 테스트',
  green: '초록불 테스트',
} as const;

const PracticePage: FC = () => {
  const navigate = useNavigate();
  const { selectedCategory, currentFeedback, isModalOpen, setModalOpen, simulateSpeechFeedback } =
    useAppStore();

  const [activeLight, setActiveLight] = useState<TFeedbackResult | null>(null);
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    // 카테고리가 선택되지 않았으면 카테고리 페이지로 리다이렉트
    if (!selectedCategory) {
      void navigate('/categories');
    }
  }, [selectedCategory, navigate]);

  const handleSpeechResult = useCallback(
    (result: TFeedbackResult) => {
      setIsAnimating(true);
      setActiveLight(result);

      // 1초 후 모달 표시
      const timeoutId: NodeJS.Timeout = setTimeout(() => {
        simulateSpeechFeedback(result);
        setModalOpen(true);
        setIsAnimating(false);
      }, ANIMATION_DELAY);

      // 메모리 누수 방지를 위해 timeout ID를 저장하지만,
      // 실제 cleanup은 컴포넌트 언마운트 시에만 필요
      void timeoutId;
    },
    [simulateSpeechFeedback, setModalOpen]
  );

  const handleCloseModal = useCallback(() => {
    setModalOpen(false);
    setActiveLight(null);
  }, [setModalOpen]);

  const handleBackClick = useCallback(() => {
    void navigate('/categories');
  }, [navigate]);

  const getButtonText = useCallback(
    (color: TFeedbackResult, isActive: boolean): string => {
      if (isActive && isAnimating) {
        return '분석 중...';
      }

      return BUTTON_TEXT_MAP[color];
    },
    [isAnimating]
  );

  if (!selectedCategory) {
    return null; // 리다이렉트 중
  }

  return (
    <div className="h-screen bg-gradient-to-br from-blue-50 via-white to-green-50 flex flex-col overflow-hidden">
      {/* 헤더 */}
      <header className="bg-white border-b border-gray-200 flex-shrink-0 shadow-sm">
        <div className="container mx-auto px-4 py-2 sm:py-3">
          <div className="flex items-center justify-between">
            <Button
              variant="ghost"
              size="sm"
              onClick={handleBackClick}
              className="flex items-center space-x-1 hover:bg-gray-100 text-sm text-gray-700 hover:text-gray-900"
              aria-label="카테고리 페이지로 돌아가기"
            >
              <ArrowLeft className="w-4 h-4" aria-hidden="true" />
              <span>뒤로</span>
            </Button>
            <h1 className="text-lg font-semibold gradient-text-safe">{selectedCategory.name}</h1>
            <div className="w-12" aria-hidden="true" /> {/* 균형을 위한 빈 공간 */}
          </div>
        </div>
      </header>

      {/* 메인 콘텐츠 */}
      <main className="flex-1 container mx-auto px-4 py-2 sm:py-4 flex flex-col items-center justify-center space-y-3 sm:space-y-6 min-h-0">
        {/* 신호등 피드백 영역 */}
        <div className="animate-fade-in">
          <TrafficLight activeLight={activeLight} isAnimating={isAnimating} className="mx-auto" />
        </div>

        {/* 가이드 카드 */}
        <Card
          className="w-full max-w-sm bg-white backdrop-blur-sm border-2 animate-fade-in flex-shrink-0 card-safe-bg"
          style={{ animationDelay: '200ms' }}
        >
          <CardHeader className="text-center pb-2 sm:pb-3">
            <CardTitle className="text-lg sm:text-xl text-gray-900">말하기 연습</CardTitle>
            <CardDescription className="text-sm text-gray-600">
              아래 버튼을 눌러 말하기 결과를 확인해보세요
            </CardDescription>
          </CardHeader>

          <CardContent className="space-y-2 sm:space-y-3">
            {/* 테스트 버튼들 (개발용) */}
            <div className="space-y-2" role="group" aria-label="테스트 버튼 그룹">
              {(['red', 'yellow', 'green'] as const).map(color => (
                <Button
                  key={color}
                  onClick={() => handleSpeechResult(color)}
                  disabled={isAnimating}
                  variant={`traffic-${color}` as const}
                  size="default"
                  className={`w-full h-10 text-sm font-medium disabled:opacity-50 disabled:cursor-not-allowed ${
                    color === 'red'
                      ? 'bg-red-500 hover:bg-red-600 text-white'
                      : color === 'yellow'
                        ? 'bg-yellow-500 hover:bg-yellow-600 text-white'
                        : 'bg-green-500 hover:bg-green-600 text-white'
                  }`}
                  aria-label={`${color} 신호등 테스트`}
                >
                  {getButtonText(color, activeLight === color)}
                </Button>
              ))}
            </div>

            {/* 실제 음성 인식 버튼 (추후 구현) */}
            <div className="pt-2 sm:pt-3 border-t border-border">
              <Button
                variant="default"
                size="default"
                className="w-full h-10 sm:h-12 text-sm sm:text-base font-semibold bg-blue-600 text-white hover:bg-blue-700 disabled:bg-gray-300 disabled:text-gray-500"
                disabled={true}
                aria-label="음성 인식 기능 (현재 준비 중)"
              >
                🎤 음성 인식 (준비 중)
              </Button>
              <p className="text-xs text-muted-foreground text-gray-500 text-center mt-1">
                실제 음성 인식 기능은 백엔드 연동 후 활성화됩니다
              </p>
            </div>
          </CardContent>
        </Card>

        {/* 진행 상태 표시 */}
        {isAnimating && (
          <div
            className="flex items-center space-x-2 animate-fade-in flex-shrink-0"
            role="status"
            aria-label="분석 중"
          >
            {BOUNCE_DELAYS.map((delay, index) => (
              <div
                key={index}
                className="w-2 h-2 bg-primary rounded-full animate-bounce"
                style={{ animationDelay: delay }}
                aria-hidden="true"
              />
            ))}
            <span className="text-xs text-muted-foreground text-gray-500 ml-2">분석 중...</span>
          </div>
        )}
      </main>

      {/* 피드백 모달 */}
      {isModalOpen && currentFeedback && (
        <FeedbackModal feedback={currentFeedback} onClose={handleCloseModal} />
      )}
    </div>
  );
};

export default PracticePage;
