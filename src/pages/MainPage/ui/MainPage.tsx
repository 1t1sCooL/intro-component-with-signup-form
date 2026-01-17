import { Footer } from '@/shared/ui/footer';
import { Description } from '@/widgets/description';
import { Form } from '@/widgets/form';

import React from 'react';

import styles from './MainPage.module.css';

export const MainPage = () => {
  React.useEffect(() => {
    const root = document.documentElement;

    const state = {
      targetMx: window.innerWidth / 2,
      targetMy: window.innerHeight * 0.35,
      mx: window.innerWidth / 2,
      my: window.innerHeight * 0.35,
      targetBx: 0,
      targetBy: 0,
      bx: 0,
      by: 0,
      raf: 0,
    };

    const max = 12;
    const ease = 0.08;

    const tick = () => {
      state.mx += (state.targetMx - state.mx) * ease;
      state.my += (state.targetMy - state.my) * ease;
      state.bx += (state.targetBx - state.bx) * ease;
      state.by += (state.targetBy - state.by) * ease;

      root.style.setProperty('--mx', `${Math.round(state.mx)}px`);
      root.style.setProperty('--my', `${Math.round(state.my)}px`);
      root.style.setProperty('--bx', `${Math.round(state.bx)}px`);
      root.style.setProperty('--by', `${Math.round(state.by)}px`);

      state.raf = window.requestAnimationFrame(tick);
    };

    const handleMove = (e: PointerEvent) => {
      state.targetMx = e.clientX;
      state.targetMy = e.clientY;

      const rx = e.clientX / window.innerWidth - 0.5;
      const ry = e.clientY / window.innerHeight - 0.5;
      state.targetBx = rx * max;
      state.targetBy = ry * max;
    };

    state.raf = window.requestAnimationFrame(tick);
    window.addEventListener('pointermove', handleMove);
    return () => {
      window.removeEventListener('pointermove', handleMove);
      window.cancelAnimationFrame(state.raf);
    };
  }, []);

  return (
    <>
      <div className={styles.container}>
        <Description />
        <Form />
      </div>
      <Footer />
    </>
  );
};
