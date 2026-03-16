"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { NAV_ITEMS, CLUB } from "@/lib/constants";
import { cn } from "@/lib/utils";
import { logoutAction } from "@/lib/actions/auth";

interface NavbarProps {
  isAdmin: boolean;
}

export default function Navbar({ isAdmin }: NavbarProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav className={cn(
      "sticky top-0 z-50 border-b border-border transition-all duration-300",
      scrolled ? "bg-dark/90 backdrop-blur-md shadow-[0_4px_24px_rgba(0,0,0,0.4)]" : "bg-secondary"
    )}>
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3">
            <Image src={CLUB.logo} alt={CLUB.nameEn} width={40} height={40} className="rounded" />
            <span className="font-bold text-lg text-white hidden sm:block">{CLUB.shortName}</span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-1">
            {NAV_ITEMS.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "px-3 py-2 text-sm font-medium rounded transition-colors",
                  pathname === item.href
                    ? "text-white border-b-2 border-primary"
                    : "text-text-muted hover:text-white hover:bg-secondary-light"
                )}
              >
                {item.label}
              </Link>
            ))}
          </div>

          {/* Right side: Admin / Login */}
          <div className="hidden md:flex items-center gap-2">
            {isAdmin ? (
              <>
                <Link
                  href="/admin"
                  className="px-3 py-2 text-sm font-medium text-text-muted hover:text-white hover:bg-secondary-light rounded transition-colors flex items-center gap-1.5"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  แอดมิน
                </Link>
                <form action={logoutAction}>
                  <button type="submit" className="px-3 py-2 text-sm font-medium text-text-muted hover:text-danger bg-surface-light rounded transition-colors">
                    ออกจากระบบ
                  </button>
                </form>
              </>
            ) : (
              <Link
                href="/login"
                className="px-4 py-2 text-sm font-semibold text-white bg-primary hover:bg-primary-dark rounded-lg transition-colors flex items-center gap-1.5"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
                </svg>
                เข้าสู่ระบบ
              </Link>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button onClick={() => setIsOpen(!isOpen)} className="md:hidden p-2 text-text-muted hover:text-white" aria-label="เปิดเมนู">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {isOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-dark/95 backdrop-blur-sm fixed inset-0 top-16 z-40">
          <div className="flex flex-col p-4 gap-1">
            {NAV_ITEMS.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setIsOpen(false)}
                className={cn(
                  "px-4 py-3 text-lg font-medium rounded-lg transition-colors",
                  pathname === item.href
                    ? "text-white bg-primary/20 border-l-4 border-primary"
                    : "text-text-muted hover:text-white hover:bg-surface-light"
                )}
              >
                {item.label}
              </Link>
            ))}
            <div className="border-t border-border mt-2 pt-2">
              {isAdmin ? (
                <>
                  <Link href="/admin" onClick={() => setIsOpen(false)} className="block px-4 py-3 text-base font-medium text-text-muted hover:text-white hover:bg-surface-light rounded-lg transition-colors">
                    แอดมิน
                  </Link>
                  <form action={logoutAction}>
                    <button type="submit" className="w-full text-left px-4 py-3 text-base font-medium text-danger rounded-lg transition-colors">
                      ออกจากระบบ
                    </button>
                  </form>
                </>
              ) : (
                <Link href="/login" onClick={() => setIsOpen(false)} className="block px-4 py-3 text-base font-semibold text-primary rounded-lg transition-colors">
                  เข้าสู่ระบบ
                </Link>
              )}
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
