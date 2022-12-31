import clsx from "clsx";
import { capitalize } from "lodash-es";
import type { ReactNode } from "react";

type ModalSkeletonProps = React.PropsWithChildren & {
  type: string;
  member: string;
  htmlSection: "siba" | "college";
  isOpen: boolean;
  mode?: "add" | "edit";
  close: () => void;
  extraInfo?: ReactNode | ReactNode[];
};

export default function ModalSkeleton({
  type,
  member,
  htmlSection,
  mode = "add",
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
          <p className="modal-card-title">Add {capitalize(type)} Team</p>
          <button className="delete" aria-label="close" />
        </header>
        <section className="modal-card-body">
          <div className="content">
            <p>
              This form includes all the details needed for your team and{" "}
              {member}. When selecting your {member}&apos;s face and outfit, be
              sure to use the graphics found in{" "}
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
          <div className="columns is-multiline">
            <p className="column is-full is-size-5">Team Basics</p>
            {children}
          </div>
        </section>
        <footer className="modal-card-foot">
          <button type="submit" className="button is-primary">
            {capitalize(mode)}
          </button>
          <button type="button" className="button" onClick={close}>
            Cancel
          </button>
        </footer>
      </div>
    </div>
  );
}
