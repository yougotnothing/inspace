import { useGSAP, useGSAPConfig } from '@gsap/react';
import { GSAPComponent } from 'types/gsap-component';
import gsap from 'gsap';

export const useGSAPOnload = (
  deps: unknown[] | useGSAPConfig,
  ...args: GSAPComponent[]
) => {
  const isAnimationsEnabled =
    localStorage.getItem('animations_enabled') ?? 'true';

  useGSAP(() => {
    args.map(arg => {
      gsap.to(arg.className, {
        opacity: 1,
        top: arg.top ?? 0,
        delay: isAnimationsEnabled === 'true' ? arg.delay : 0,
        duration: isAnimationsEnabled === 'true' ? arg.duration : 0,
        marginTop: arg.marginTop ?? 0,
        boxShadow: arg.boxShadow ?? 'none',
        gap: arg.gap,
      });
    });
  }, deps);
};
