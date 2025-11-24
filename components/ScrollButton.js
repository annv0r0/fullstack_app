'use client';
import s from './ScrollButton.module.scss';

export default function ScrollButton() {
  return (
    <button onClick={() => window.scrollTo({ top: window.innerHeight, behavior: 'smooth' })} className={s.scroll}>
      ↓
    </button>
  );
}
