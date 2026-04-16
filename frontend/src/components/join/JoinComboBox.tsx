import clsx from "clsx";
import type { InputHTMLAttributes, JSX } from "react";
import type { FieldValues, UseControllerProps } from "react-hook-form";
import { useController } from "react-hook-form";
import { type AllFieldProps } from "./JoinField";
import { Combobox } from "@base-ui/react/combobox";
import { capitalize } from "radashi";

type JoinComboboxProps<
  T extends FieldValues,
  K extends object,
> = AllFieldProps<T> &
  UseControllerProps<T> & {
    options: K[];
    renderOptionKeyValue: (option: K) => string;
    renderOptionInputDisplay: (option: K) => string;
    renderOptionListItem?: (option: K) => JSX.Element;
  };

export default function JoinCombobox<T extends FieldValues, K extends object>(
  props: JoinComboboxProps<T, K> & InputHTMLAttributes<HTMLElement>,
) {
  const {
    name,
    label,
    colSize,
    help,
    horizontal,
    options,
    control,
    renderOptionInputDisplay,
    renderOptionKeyValue,
    renderOptionListItem,

    ...rest
  } = props;

  const {
    field: { value, onChange, onBlur, ref },
    fieldState: { error },
  } = useController({ name, control });

  return (
    <Combobox.Root
      items={options}
      value={value}
      onValueChange={onChange}
      itemToStringLabel={(value) => renderOptionInputDisplay(value)}
    >
      <div className={clsx("field", colSize && `column is-${colSize}`)}>
        <label htmlFor={name} className="label">
          {label ?? capitalize(name)}
        </label>
        <Combobox.InputGroup className="control">
          <div className="select" style={{ width: "100%" }}>
            <Combobox.Input
              id={name}
              className={clsx("combobox-input", error && "is-danger")}
              ref={ref}
              onBlur={onBlur}
              {...rest}
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
                return (
                  <Combobox.Item
                    className={"combobox-item"}
                    key={renderOptionKeyValue(option)}
                    value={option}
                  >
                    {renderOptionListItem
                      ? renderOptionListItem(option)
                      : renderOptionInputDisplay(option)}
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
