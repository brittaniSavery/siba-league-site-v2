import type { ChildrenProps } from "@lib/types";
import clsx from "clsx";
import { capitalize } from "lodash-es";
import { useEffect, type ReactNode } from "react";

type BaseModalProps = ChildrenProps & {
  id?: string;
  type: "pro" | "college";
  member: "general manager" | "head coach";
  htmlSection: "siba" | "college";
  isOpen: boolean;
  mode?: "add" | "edit";
  close: () => void;
};

export default function BaseModal({
  id,
  type,
  member,
  htmlSection,
  mode = "add",
  isOpen,
  close,
  children,
}: BaseModalProps) {
  useEffect(() => {
    // Moves cursor back to top of modal
    if (id && isOpen) {
      const modalDiv = document.querySelector(`#${id}`);
      modalDiv?.scroll(0, 0);
    }
  }, [isOpen]);

  return (
    <div className={clsx("modal", isOpen && "is-active")}>
      <div className="modal-background" onClick={close} />
      <div className="modal-card">
        <header className="modal-card-head">
          <p className="modal-card-title">Add {capitalize(type)} Team</p>
          <button
            type="button"
            className="delete"
            aria-label="close"
            onClick={close}
          />
        </header>
        <section id={id} className="modal-card-body">
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
