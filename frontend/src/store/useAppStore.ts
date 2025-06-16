import { create } from 'zustand';
import type { IAppState, ICategory, ISpeechFeedback, IUser, TFeedbackResult } from '../types';

interface IAppStore extends IAppState {
  // Actions
  setUser: (user: IUser | null) => void;
  setCategories: (categories: ICategory[]) => void;
  setSelectedCategory: (category: ICategory | null) => void;
  setCurrentFeedback: (feedback: ISpeechFeedback | null) => void;
  setModalOpen: (isOpen: boolean) => void;
  setLoading: (isLoading: boolean) => void;

  // Mock data actions (임시)
  loadMockCategories: () => void;
  simulateSpeechFeedback: (result: TFeedbackResult) => void;
}

const MOCK_CATEGORIES: ICategory[] = [
  { id: '1', name: '생활회화', description: '일상 대화 연습' },
  { id: '2', name: '비즈니스', description: '업무 관련 영어' },
  { id: '3', name: '여행', description: '여행 상황 대화' },
  { id: '4', name: '음식점', description: '식당에서 주문하기' },
] as const;

const FEEDBACK_MESSAGES: Record<TFeedbackResult, string> = {
  red: '발음과 문법을 다시 확인해보세요.',
  yellow: '좋습니다! 조금 더 자연스럽게 말해보세요.',
  green: '완벽합니다! 매우 자연스러운 발음이에요.',
} as const;

export const useAppStore = create<IAppStore>(set => ({
  // Initial state
  user: null,
  categories: [],
  selectedCategory: null,
  currentFeedback: null,
  isModalOpen: false,
  isLoading: false,

  // Actions
  setUser: user => set({ user }),
  setCategories: categories => set({ categories }),
  setSelectedCategory: category => set({ selectedCategory: category }),
  setCurrentFeedback: feedback => set({ currentFeedback: feedback }),
  setModalOpen: isOpen => set({ isModalOpen: isOpen }),
  setLoading: isLoading => set({ isLoading }),

  // Mock data actions
  loadMockCategories: () => {
    set({ categories: MOCK_CATEGORIES });
  },

  simulateSpeechFeedback: result => {
    const feedback: ISpeechFeedback = {
      result,
      message: FEEDBACK_MESSAGES[result],
      details: {
        grammar: result === 'red' ? '문법 오류가 있습니다.' : '문법이 정확합니다.',
        pronunciation: result === 'green' ? '발음이 매우 좋습니다.' : '발음을 개선해보세요.',
        fluency: result === 'green' ? '유창하게 말했습니다.' : '좀 더 자연스럽게 말해보세요.',
      },
    };

    set({ currentFeedback: feedback });
  },
}));
