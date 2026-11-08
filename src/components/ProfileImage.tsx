"use client";

interface ProfileImageProps {
  className?: string;
}

export function ProfileImage({ className }: ProfileImageProps) {
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src="/profile.jpg"
      alt="Kanishk Tyagi"
      fetchPriority="high"
      className={className}
      onError={(e) => {
        (e.target as HTMLImageElement).src =
          "https://ui-avatars.com/api/?name=Kanishk+Tyagi&background=18181b&color=fafafa&size=200";
      }}
    />
  );
}
