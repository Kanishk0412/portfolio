"use client";

interface ProfileImageProps {
  className?: string;
}

export function ProfileImage({ className }: ProfileImageProps) {
  return (
    <img
      src="/profile.jpg"
      alt="Kanishk Tyagi"
      className={className}
      onError={(e) => {
        (e.target as HTMLImageElement).src =
          "https://ui-avatars.com/api/?name=Kanishk+Tyagi&background=18181b&color=fafafa&size=200";
      }}
    />
  );
}
