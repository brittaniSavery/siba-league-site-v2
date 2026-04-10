import clsx from "clsx";
import { capitalize } from "radashi";

type JoinModalProps = {
  open: boolean;
  onClose?: () => void;
  type: "pro" | "college";
  mode: "add" | "edit";
  children: React.ReactNode;
};

export default function JoinModal({
  open,
  onClose,
  type,
  mode,
  children,
}: JoinModalProps) {
  const title = `${capitalize(mode)} ${capitalize(type)} Team`;
  const memberType = type === "pro" ? "general manager" : "coach";
  return (
    <div className={clsx("modal", open && "is-active")}>
      <div className="modal-background" onClick={onClose}></div>
      <div className="modal-card">
        <header className="modal-card-head is-shadowless">
          <p className="modal-card-title">{title}</p>
          <button
            type="button"
            className="delete"
            aria-label="close"
            onClick={onClose}
          ></button>
        </header>
        <section className="modal-card-body content mb-0">
          <p>
            This form includes all the details needed for your team and{" "}
            {memberType}. When selecting your {memberType}&apos;s face and
            outfit, be sure to use the graphics found in{" "}
            <a href={`/${type === "pro" ? "siba" : "college"}/downloads`}>
              Downloads
            </a>
            .
          </p>
          {children}
        </section>
        <footer className="modal-card-foot">
          <div className="buttons">
            <button type="submit" className="button is-primary">
              {capitalize(mode)}
            </button>
            <button type="button" className="button" onClick={onClose}>
              Cancel
            </button>
          </div>
        </footer>
      </div>
    </div>
  );
}
