import clsx from "clsx";
import { capitalize } from "radashi";

type JoinModalProps = {
  open: boolean;
  onClose?: () => void;
  title: string;
  mode: "add" | "edit";
  children: React.ReactNode;
};

export default function JoinModal({
  open,
  onClose,
  title,
  mode,
  children,
}: JoinModalProps) {
  return (
    <div className={clsx("modal", open && "is-active")}>
      <div className="modal-background"></div>
      <div className="modal-card">
        <header className="modal-card-head is-shadowless teams">
          <p className="modal-card-title">{title}</p>
          <button
            className="delete"
            aria-label="close"
            onClick={onClose}
          ></button>
        </header>
        <section className="modal-card-body">{children}</section>
        <footer className="modal-card-foot">
          <div className="buttons">
            <button className="button is-success">{capitalize(mode)}</button>
            <button type="button" className="button" onClick={onClose}>
              Cancel
            </button>
          </div>
        </footer>
      </div>
    </div>
  );
}
