import clsx from "clsx";

type ProbationIconProps = {
  iconOnly?: boolean;
  school?: string;
  details?: string;
};

export default function ProbationIcon({
  school,
  details,
  iconOnly = false,
}: ProbationIconProps) {
  const IconOnly = () => (
    <span
      className={clsx(
        "icon",
        "has-text-danger-dark",
        details && "has-tooltip-arrow"
      )}
      data-tooltip={details}
    >
      <i className="fa-solid fa-circle-exclamation" />
    </span>
  );

  if (iconOnly) return <IconOnly />;

  return (
    <span className="icon-text">
      <IconOnly />
      {school && <span>{school}</span>}
    </span>
  );
}
