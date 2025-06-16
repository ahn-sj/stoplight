import { type FC, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppStore } from '../store/useAppStore';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import type { IUser } from '../types';
import TrafficLightLogo from '../assets/images/traffic-light-logo.svg';

const MOCK_USER: IUser = {
  id: '1',
  name: '테스트 사용자',
  email: 'test@example.com',
  profileImage: undefined,
} as const;

const LoginPage: FC = () => {
  const navigate = useNavigate();
  const { setUser } = useAppStore();

  const handleSocialLogin = useCallback(() => {
    // TODO: 실제 소셜 로그인 구현
    // 임시로 mock 사용자 데이터 설정
    setUser(MOCK_USER);
    void navigate('/categories');
  }, [setUser, navigate]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50 flex flex-col items-center justify-center p-6">
      <div className="w-full max-w-md space-y-8 animate-fade-in">
        {/* 로고 및 브랜딩 */}
        <div className="text-center space-y-6">
          <div className="mx-auto w-32 h-48 bg-white rounded-2xl shadow-lg flex items-center justify-center p-4 border border-border">
            <img
              src={TrafficLightLogo}
              alt="StopLight Logo"
              className="w-full h-full object-contain"
            />
          </div>

          <div className="space-y-2">
            <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-green-600 bg-clip-text text-transparent">
              StopLight
            </h1>
            <p className="text-muted-foreground text-lg">
              영어 말하기 연습을 통해
              <br />
              실력을 향상시켜보세요
            </p>
          </div>
        </div>

        {/* 로그인 카드 */}
        <Card className="border-0 shadow-xl bg-white/80 backdrop-blur-sm">
          <CardHeader className="text-center pb-4">
            <CardTitle className="text-xl">시작하기</CardTitle>
            <CardDescription>소셜 계정으로 간편하게 로그인하세요</CardDescription>
          </CardHeader>

          <CardContent className="space-y-4">
            <Button
              onClick={handleSocialLogin}
              variant="outline"
              size="lg"
              className="w-full h-12 text-base font-medium border-2 hover:border-red-300 hover:bg-red-50 transition-all duration-200"
              aria-label="Google 계정으로 로그인"
            >
              <div className="flex items-center space-x-3">
                <div
                  className="w-6 h-6 bg-gradient-to-r from-red-500 to-red-600 rounded-full flex items-center justify-center"
                  aria-hidden="true"
                >
                  <span className="text-white text-sm font-bold">G</span>
                </div>
                <span>Google로 로그인</span>
              </div>
            </Button>

            <Button
              onClick={handleSocialLogin}
              variant="outline"
              size="lg"
              className="w-full h-12 text-base font-medium border-2 hover:border-yellow-300 hover:bg-yellow-50 transition-all duration-200"
              aria-label="카카오 계정으로 로그인"
            >
              <div className="flex items-center space-x-3">
                <div
                  className="w-6 h-6 bg-gradient-to-r from-yellow-400 to-yellow-500 rounded-full flex items-center justify-center"
                  aria-hidden="true"
                >
                  <span className="text-white text-sm font-bold">K</span>
                </div>
                <span>카카오로 로그인</span>
              </div>
            </Button>
          </CardContent>
        </Card>

        {/* 하단 설명 */}
        <div className="text-center">
          <p className="text-sm text-muted-foreground">로그인하여 개인 맞춤 학습을 시작하세요</p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
