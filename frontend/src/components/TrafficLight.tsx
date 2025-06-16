import { type FC, memo } from 'react';
import { cn } from '../lib/utils';
import type { TFeedbackResult } from '../types';

interface ITrafficLightProps {
  activeLight?: TFeedbackResult | null;
  isAnimating?: boolean;
  className?: string;
}

interface ILightConfig {
  color: TFeedbackResult;
  label: string;
  activeClass: string;
}

const LIGHT_CONFIGS: ILightConfig[] = [
  { color: 'red', label: '빨간불 - 다시 시도', activeClass: 'traffic-light-red' },
  { color: 'yellow', label: '노란불 - 보통', activeClass: 'traffic-light-yellow' },
  { color: 'green', label: '초록불 - 좋음', activeClass: 'traffic-light-green' },
] as const;

const TrafficLight: FC<ITrafficLightProps> = memo(
  ({ activeLight, isAnimating = false, className }) => (
    <div className={cn('traffic-light-container', className)} role="img" aria-label="신호등 피드백">
      {LIGHT_CONFIGS.map((config, index) => (
        <div
          key={config.color}
          className={
            index < LIGHT_CONFIGS.length - 1
              ? 'mb-3 sm:mb-6 flex justify-center'
              : 'flex justify-center'
          }
        >
          <div
            className={cn(
              'traffic-light',
              activeLight === config.color ? config.activeClass : 'traffic-light-inactive',
              isAnimating && activeLight === config.color && 'animate-traffic-light'
            )}
            role="status"
            aria-label={
              activeLight === config.color
                ? `활성화된 ${config.label}`
                : `비활성화된 ${config.label}`
            }
            aria-live={isAnimating && activeLight === config.color ? 'polite' : 'off'}
          />
        </div>
      ))}
    </div>
  )
);

TrafficLight.displayName = 'TrafficLight';

export default TrafficLight;
