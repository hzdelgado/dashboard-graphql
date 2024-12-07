"use client";

import Image from "next/image";
import Link from "next/link";

interface LogoProps {
  src: string; // Ruta de la imagen del logo
  alt?: string; // Texto alternativo para accesibilidad
  width?: number; // Ancho del logo (por defecto: 150px)
  height?: number; // Alto del logo (por defecto: 50px)
  href?: string; // Ruta a la que redirige el logo (opcional)
  className?: string; // Clases CSS adicionales para personalizar el estilo
}

const Logo: React.FC<LogoProps> = ({
  src,
  alt = "Logo",
  width = 150,
  height = 50,
  href = "/",
  className = "",
}) => {
  const logoImage = (
    <Image
      src={src}
      alt={alt}
      loading="lazy"
      width={width}
      height={height}
      className={`object-contain ${className}`}
      priority // Para cargar el logo más rápido
    />
  );

  return href ? (
    <Link href={href} aria-label="Navigar a pagina principal">
      {logoImage}
    </Link>
  ) : (
    logoImage
  );
};

export default Logo;
