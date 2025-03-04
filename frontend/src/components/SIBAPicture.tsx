type SIBAPictureProps = {
  light: ImageMetadata;
  dark: ImageMetadata;
  width?: number;
  height?: number;
};

export default function SIBAPicture({
  light,
  dark,
  width,
  height,
}: SIBAPictureProps) {
  return (
    <picture>
      <source srcSet={dark.src} media="(prefers-color-scheme: dark)" />
      <img
        src={light.src}
        alt="A map of the united states color-coded by the recruiting regions for the SICBA."
        width={width}
        height={height}
      />
    </picture>
  );
}
