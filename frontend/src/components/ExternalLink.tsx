type ExternalLinkProps = {
  url: string;
  label?: string;
  children?: string;
  classes?: string;
};

export default function ExternalLink({
  url: href,
  label,
  classes,
}: ExternalLinkProps) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={classes}
    >
      <span className="icon-text">
        <span>{label}</span>
        <span className="icon">
          <i className="fa-solid fa-square-arrow-up-right"></i>
        </span>
      </span>
    </a>
  );
}
