import { useState } from 'react';

/**
 * Renders a vendor photo. First tries the local /public path; if it 404s,
 * falls back to the remote stock image baked into the vendor data.
 * This lets users drop a JPG into /public/vendors/<id>.jpg with zero code changes.
 */
export default function VendorImage({ vendor, className, alt, style }) {
  const [src, setSrc] = useState(vendor.image);
  const handleError = () => {
    if (src !== vendor.fallbackImage && vendor.fallbackImage) setSrc(vendor.fallbackImage);
  };
  return (
    <img
      src={src}
      alt={alt || vendor.name}
      className={className}
      style={style}
      onError={handleError}
      loading="lazy"
    />
  );
}
