"use client";

export default function StaffPhoto({ src, alt }: { src: string; alt: string }) {
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={src}
      alt={alt}
      className="w-full h-full object-cover object-top"
      onError={(e) => { e.currentTarget.style.display = "none"; }}
    />
  );
}
