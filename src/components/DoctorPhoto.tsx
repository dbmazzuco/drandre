import type { Photo } from "@/config/campaign";

interface Props {
  photo: Photo;
  sizes: string;
  priority?: boolean;
  className?: string;
  imgClassName?: string;
}

/** Fotografia responsiva (AVIF → WebP → arquivo original), com dimensões fixas para evitar saltos de layout. */
export function DoctorPhoto({ photo, sizes, priority = false, className = "", imgClassName = "" }: Props) {
  return (
    <picture className={className}>
      {photo.avif && <source type="image/avif" srcSet={photo.avif} sizes={sizes} />}
      {photo.webp && <source type="image/webp" srcSet={photo.webp} sizes={sizes} />}
      <img
        src={photo.src}
        alt={photo.alt}
        width={photo.width}
        height={photo.height}
        sizes={sizes}
        loading={priority ? "eager" : "lazy"}
        decoding={priority ? "sync" : "async"}
        {...(priority ? { fetchpriority: "high" } : {})}
        className={imgClassName}
      />
    </picture>
  );
}
