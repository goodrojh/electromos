import React from "react";
import { img } from "./site";

type Props = {
  name: string;
  alt: string;
  className?: string;
  /** CSS sizes hint, e.g. "(min-width: 768px) 50vw, 100vw" */
  sizes?: string;
  priority?: boolean;
};

/** Responsive WebP image: 960w for phones, 1920w for large screens, lazy by default. */
export default function Pic({ name, alt, className, sizes = "100vw", priority = false }: Props) {
  return (
    <img
      src={img(`${name}.webp`)}
      srcSet={`${img(`${name}-960.webp`)} 960w, ${img(`${name}.webp`)} 1920w`}
      sizes={sizes}
      alt={alt}
      className={className}
      loading={priority ? "eager" : "lazy"}
      decoding={priority ? "sync" : "async"}
      fetchPriority={priority ? "high" : "auto"}
      draggable={false}
    />
  );
}
