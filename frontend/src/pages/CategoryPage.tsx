import { type FC, useCallback, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppStore } from '../store/useAppStore';
import { Card, CardContent, CardDescription, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

// 카테고리별 아이콘 매핑
const CATEGORY_ICONS: Record<string, string> = {
  생활회화: '💬',
  비즈니스: '💼',
  여행: '✈️',
  음식점: '🍽️',
} as const;

const DEFAULT_ICON = '📚';

// 카테고리별 아이콘 반환 함수
const getCategoryIcon = (categoryName: string): string =>
  CATEGORY_ICONS[categoryName] ?? DEFAULT_ICON;

const CategoryPage: FC = () => {
  const navigate = useNavigate();
  const { categories, loadMockCategories, setSelectedCategory } = useAppStore();

  useEffect(() => {
    // 컴포넌트 마운트 시 mock 카테고리 데이터 로드
    loadMockCategories();
  }, [loadMockCategories]);

  const handleCategorySelect = useCallback(
    (categoryId: string) => {
      const selectedCategory = categories.find(cat => cat.id === categoryId);
      if (selectedCategory) {
        setSelectedCategory(selectedCategory);
        void navigate('/practice');
      }
    },
    [categories, setSelectedCategory, navigate]
  );

  const handleKeyDown = useCallback(
    (event: React.KeyboardEvent, categoryId: string) => {
      if (event.key === 'Enter' || event.key === ' ') {
        event.preventDefault();
        handleCategorySelect(categoryId);
      }
    },
    [handleCategorySelect]
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50">
      {/* 헤더 */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-10 shadow-sm">
        <div className="container mx-auto px-6 py-6">
          <div className="text-center space-y-2">
            <h1 className="text-3xl font-bold gradient-text-safe">카테고리 선택</h1>
            <p className="text-muted-foreground text-lg text-gray-600">
              연습하고 싶은 주제를 선택해주세요
            </p>
          </div>
        </div>
      </header>

      {/* 메인 콘텐츠 */}
      <main className="container mx-auto px-6 py-8">
        {/* 카테고리 그리드 */}
        <div className="grid grid-cols-2 gap-4 sm:gap-6 max-w-2xl mx-auto">
          {categories.map((category, index) => (
            <Card
              key={category.id}
              className="group cursor-pointer transition-all duration-300 hover:shadow-xl hover:scale-105 border-2 hover:border-primary/50 bg-white backdrop-blur-sm animate-fade-in card-safe-bg"
              style={{ animationDelay: `${index * 100}ms` }}
              onClick={() => handleCategorySelect(category.id)}
              onKeyDown={event => handleKeyDown(event, category.id)}
              tabIndex={0}
              role="button"
              aria-label={`${category.name} 카테고리 선택`}
            >
              <CardContent className="p-4 sm:p-8 text-center space-y-3 sm:space-y-4">
                {/* 카테고리 아이콘 영역 */}
                <div
                  className="w-12 h-12 sm:w-16 sm:h-16 mx-auto bg-gradient-to-br from-blue-100 to-green-100 rounded-2xl flex items-center justify-center group-hover:from-blue-200 group-hover:to-green-200 transition-colors"
                  aria-hidden="true"
                >
                  <div className="text-xl sm:text-2xl">{getCategoryIcon(category.name)}</div>
                </div>

                <div className="space-y-1 sm:space-y-2">
                  <CardTitle className="text-lg sm:text-xl text-gray-900 group-hover:text-primary transition-colors">
                    {category.name}
                  </CardTitle>
                  {category.description && (
                    <CardDescription className="text-sm sm:text-base text-gray-600">
                      {category.description}
                    </CardDescription>
                  )}
                </div>

                <Button
                  variant="ghost"
                  className="w-full mt-3 sm:mt-4 group-hover:bg-primary/10 transition-colors text-sm sm:text-base text-gray-700 group-hover:text-gray-900"
                  tabIndex={-1}
                  aria-hidden="true"
                >
                  시작하기 →
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* 로딩 상태 */}
        {categories.length === 0 && (
          <div className="flex flex-col items-center justify-center mt-16 space-y-4">
            <div
              className="w-8 h-8 border-4 border-primary/30 border-t-primary rounded-full animate-spin"
              aria-label="로딩 중"
            />
            <p className="text-muted-foreground text-gray-600">카테고리를 불러오는 중...</p>
          </div>
        )}
      </main>
    </div>
  );
};

export default CategoryPage;
