import { type FC, type ReactNode, Suspense, memo } from 'react';
import { Navigate, Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import { useAppStore } from './store/useAppStore';
import { ThemeProvider } from './components/theme-provider';
import { Toaster } from './components/ui/toaster';
import LoginPage from './pages/LoginPage';
import CategoryPage from './pages/CategoryPage';
import PracticePage from './pages/PracticePage';

interface IProtectedRouteProps {
  children: ReactNode;
}

// 인증이 필요한 라우트를 보호하는 컴포넌트
const ProtectedRoute: FC<IProtectedRouteProps> = memo(({ children }) => {
  const { user } = useAppStore();
  return user ? <>{children}</> : <Navigate to="/" replace />;
});

ProtectedRoute.displayName = 'ProtectedRoute';

// 로딩 컴포넌트
const LoadingSpinner: FC = () => (
  <div className="flex items-center justify-center min-h-screen">
    <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-gray-900" />
  </div>
);

const App: FC = () => (
  <ThemeProvider
    attribute="class"
    defaultTheme="light"
    enableSystem={false}
    disableTransitionOnChange
  >
    <Router>
      <div className="App">
        <Suspense fallback={<LoadingSpinner />}>
          <Routes>
            {/* 로그인 페이지 */}
            <Route path="/" element={<LoginPage />} />

            {/* 보호된 라우트들 */}
            <Route
              path="/categories"
              element={
                <ProtectedRoute>
                  <CategoryPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/practice"
              element={
                <ProtectedRoute>
                  <PracticePage />
                </ProtectedRoute>
              }
            />

            {/* 기본 리다이렉트 */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </Suspense>
      </div>
      <Toaster />
    </Router>
  </ThemeProvider>
);

export default App;
