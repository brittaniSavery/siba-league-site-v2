import { Dialog } from "@base-ui-components/react/dialog";
import { clsx } from "clsx";
import { capitalize } from "radashi";
import { useState } from "react";

type NewTeamDialogProps = {
  type: "pro" | "college";
  mode: "add" | "edit";
  children: React.ReactNode;
  onClose?: () => void;
};

export default function NewTeamDialog({
  type,
  mode,
  children,
  onClose,
}: NewTeamDialogProps) {
  const [open, setOpen] = useState(false);
  const dialogTitle = `${capitalize(mode)} ${capitalize(type)} Team`;
  const memberType = type === "pro" ? "general manager" : "coach";

  return (
    <Dialog.Root open={open} onOpenChange={setOpen}>
      <Dialog.Trigger type="button" className="button mt-2">
        {dialogTitle}
      </Dialog.Trigger>
      <Dialog.Portal className={clsx("modal", open && "is-active")}>
        <Dialog.Backdrop className="modal-background" />
        <Dialog.Popup className="modal-card">
          <header className="modal-card-head is-shadowless">
            <Dialog.Title className="modal-card-title">
              {dialogTitle}
            </Dialog.Title>
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
              <button
                type="button"
                className="button"
                onClick={() => {
                  setOpen(false);
                  onClose?.();
                }}
              >
                Cancel
              </button>
            </div>
          </footer>
        </Dialog.Popup>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
