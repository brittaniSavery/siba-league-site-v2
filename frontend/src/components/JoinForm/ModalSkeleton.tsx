import clsx from "clsx";
import type { ReactNode } from "react";

type ModalSkeletonProps = React.PropsWithChildren & {
  type: string;
  member: string;
  htmlSection: "siba" | "college";
  isOpen: boolean;
  close: () => void;
  extraInfo?: ReactNode | ReactNode[];
};

export default function ModalSkeleton({
  type,
  member,
  htmlSection,
  isOpen,
  close,
  children,
  extraInfo,
}: ModalSkeletonProps) {
  return (
    <div className={clsx("modal", isOpen && "is-active")}>
      <div className="modal-background" onClick={close} />
      <div className="modal-card">
        <header className="modal-card-head">
          <p className="modal-card-title">Add {type} Team</p>
          <button className="delete" aria-label="close" />
        </header>
        <section className="modal-card-body">
          <div className="content">
            <p>
              This form includes all the details needed for your team and{" "}
              {member}. When selecting your {member}&apos;s face and outfit, be
              sure to use the graphics found in
              <a
                href={`/${htmlSection}/downloads`}
                target="_blank"
                rel="noreferrer"
              >
                Downloads
              </a>
              .
            </p>
            {extraInfo}
          </div>
          {children}
        </section>
        <footer className="modal-card-foot">
          <button type="submit" className="button is-primary">
            Add
          </button>
          <button className="button" onClick={close}>
            Cancel
          </button>
        </footer>
      </div>
    </div>
  );
}
