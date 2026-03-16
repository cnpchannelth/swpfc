"use client";

import { useState } from "react";

export default function ShareButtons({ slug }: { slug: string }) {
  const [copied, setCopied] = useState(false);

  const getPageUrl = () => {
    if (typeof window !== "undefined") {
      return window.location.href;
    }
    return `https://policeswpfc.com/news/${slug}`;
  };

  const handleFacebook = () => {
    const url = encodeURIComponent(getPageUrl());
    window.open(`https://www.facebook.com/sharer/sharer.php?u=${url}`, "_blank", "width=600,height=400");
  };

  const handleLine = () => {
    const url = encodeURIComponent(getPageUrl());
    window.open(`https://social-plugins.line.me/lineit/share?url=${url}`, "_blank", "width=600,height=400");
  };

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(getPageUrl());
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // fallback
    }
  };

  return (
    <div className="mt-8 pt-6 border-t border-border">
      <p className="text-sm text-text-muted mb-3">แชร์ข่าวนี้</p>
      <div className="flex gap-2">
        <button
          onClick={handleFacebook}
          className="px-4 py-2 bg-[#1877F2] text-white rounded-lg text-sm hover:opacity-90 transition-opacity"
        >
          Facebook
        </button>
        <button
          onClick={handleLine}
          className="px-4 py-2 bg-[#00B900] text-white rounded-lg text-sm hover:opacity-90 transition-opacity"
        >
          LINE
        </button>
        <button
          onClick={handleCopy}
          className="px-4 py-2 bg-surface-light text-text-muted rounded-lg text-sm hover:text-white transition-colors"
        >
          {copied ? "✓ คัดลอกแล้ว" : "คัดลอกลิงก์"}
        </button>
      </div>
    </div>
  );
}
