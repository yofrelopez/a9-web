"use client";

import Link from "next/link";
import Image from "next/image";

export default function Logo() {
  return (
    <Link href="/" className="flex items-center gap-2 hover:opacity-90 transition-opacity">
      {/* Logo para tema claro */}
      <Image
        src="/logos/logo-color.png"
        alt="Antena Nueve logo"
        width={80}
        height={40}
        priority
        className="dark:hidden"
        style={{ width: 'auto', height: '52px' }}
      />
      
      {/* Logo para tema oscuro */}
      <Image
        src="/logos/logo-white.png"
        alt="Antena Nueve logo"
        width={80}
        height={40}
        priority
        className="hidden dark:block"
        style={{ width: 'auto', height: '52px' }}
      />
      
      {/* Texto del brand */}

    </Link>
  );
}