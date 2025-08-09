type SIBAPictureProps = {
  light: ImageMetadata;
  dark: ImageMetadata;
  width?: number;
  height?: number;
  alt?: string;
};

export default function SIBAPicture({
  light,
  dark,
  width,
  height,
  alt,
}: SIBAPictureProps) {
  return (
    <picture>
      <source srcSet={dark.src} media="(prefers-color-scheme: dark)" />
      <img src={light.src} alt={alt || ""} width={width} height={height} />
    </picture>
  );
}
