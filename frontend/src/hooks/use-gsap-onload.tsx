import { useGSAP, useGSAPConfig } from '@gsap/react';
import { GSAPComponent } from 'types/gsap-component';
import gsap from 'gsap';

export const useGSAPOnload = (
  deps: unknown[] | useGSAPConfig,
  ...args: GSAPComponent[]
) => {
  useGSAP(() => {
    args.map(arg => {
      gsap.to(arg.className, {
        opacity: 1,
        top: arg.top ?? 0,
        delay: arg.delay,
        duration: arg.duration,
        marginTop: arg.marginTop ?? 0,
        boxShadow: arg.boxShadow ?? 'none',
      });
    });
  }, deps);
};
