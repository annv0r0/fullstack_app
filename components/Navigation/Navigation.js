'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import s from './Navigation.module.scss';

export default function Navigation() {
  const S3_IMG_URL = `${process.env.NEXT_PUBLIC_S3_BUCKET}/images/menu.png`;
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className={s.left__items} onClick={() => toggleMenu()}>
      <Image className={s.menuButton} src={S3_IMG_URL} alt="menu" width={30} height={30} />
      <div className={`${s.nav__items} ${isOpen ? '' : s.left__items_closed}`}>
        <Link href="/">Main</Link>
        <Link href="/dashboard">Dashboard</Link>
        <Link href="/upload">Upload file</Link>
        <Link href="/history">History</Link>
      </div>
    </div>
  );
}
