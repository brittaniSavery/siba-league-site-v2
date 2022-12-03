import clsx from "clsx";

type FontAwesomeIconProps = {
  icon: string;
  color?: string;
  frontText?: string;
  backText?: string;
};

export default function FontAwesomeIcon({
  icon,
  color,
  frontText,
  backText,
}: FontAwesomeIconProps) {
  return (
    <span className="icon-text">
      {frontText && <span>{frontText}</span>}
      <span className={clsx("icon", color && `has-text-${color}`)}>
        <i className={icon} />
      </span>
      {backText && <span>{backText}</span>}
    </span>
  );
}
