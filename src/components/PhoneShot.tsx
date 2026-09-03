type PhoneShotProps = {
  src: string;
  alt: string;
  className?: string;
};

export function PhoneShot({ src, alt, className }: PhoneShotProps) {
  return (
    <div className={`phone${className ? ` ${className}` : ""}`}>
      <img src={src} alt={alt} loading="lazy" decoding="async" />
    </div>
  );
}
