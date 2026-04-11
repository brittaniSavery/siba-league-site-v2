import clsx from "clsx";
import type { InputHTMLAttributes, JSX } from "react";
import type { FieldValues, UseControllerProps } from "react-hook-form";
import { useController } from "react-hook-form";
import { type AllFieldProps } from "./JoinField";
import { Combobox } from "@base-ui/react/combobox";
import { capitalize } from "radashi";

type SelectProps<T extends FieldValues, K extends object> = AllFieldProps<T> &
  UseControllerProps<T> & {
    options: K[];
    renderOptionValue: (option: K) => string;
    renderOptionLabel: (option: K) => JSX.Element;
  };

export default function JoinCombobox<T extends FieldValues, K extends object>(
  props: SelectProps<T, K> & InputHTMLAttributes<HTMLElement>,
) {
  const {
    name,
    label,
    colSize,
    help,
    horizontal,
    options,
    control,
    renderOptionLabel,
    renderOptionValue,
    ...rest
  } = props;

  const {
    field,
    fieldState: { error },
  } = useController({ name, control });

  return (
    <Combobox.Root items={options}>
      <div className={clsx("field", colSize && `column is-${colSize}`)}>
        <label htmlFor={name} className="label">
          {label ?? capitalize(name)}
        </label>
        <Combobox.InputGroup className="control">
          <div className="select" style={{ width: "100%" }}>
            <Combobox.Input
              id={name}
              className={clsx("combobox-input ", error && "is-danger")}
              placeholder="e.g. Arizona Wildcats"
            />
          </div>
        </Combobox.InputGroup>
        {error && <p className="help has-text-danger">{error.message}</p>}
        {!error && help && <p className="help">{help}</p>}
      </div>
      <Combobox.Portal>
        <Combobox.Positioner>
          <Combobox.Popup className={"combobox-popup"}>
            <Combobox.Empty>No matches</Combobox.Empty>
            <Combobox.List className={"combobox-list"}>
              {(option: K) => {
                const value = renderOptionValue(option);
                return (
                  <Combobox.Item key={`${name}-${value}`} value={value}>
                    {renderOptionLabel(option)}
                  </Combobox.Item>
                );
              }}
            </Combobox.List>
          </Combobox.Popup>
        </Combobox.Positioner>
      </Combobox.Portal>
    </Combobox.Root>
  );
}
