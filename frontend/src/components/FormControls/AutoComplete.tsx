import clsx from "clsx";
import { useAutocomplete } from "@mui/base";
import { useController } from "react-hook-form";
import { capitalize } from "lodash-es";
import type { ReactNode } from "react";
import type { FieldValues, UseControllerProps } from "react-hook-form";
import type { AllFieldProps } from "./FieldBase";

type AutoCompleteProps<T extends FieldValues, K> = AllFieldProps<T> &
  UseControllerProps<T> & {
    id: string;
    options: K[];
    renderOption: (option: K) => ReactNode;
    renderOptionLabel?: (option: K) => string;
    renderHelp?: (value: K) => ReactNode;
    isOptionEqualToValue?: (option: K, value: K) => boolean;
  };

export default function AutoComplete<T extends FieldValues, K>(
  props: AutoCompleteProps<T, K>
) {
  const {
    id,
    name,
    label,
    colSize,
    help,
    options,
    control,
    renderOption,
    renderOptionLabel,
    renderHelp,
    isOptionEqualToValue,
  } = props;

  const {
    field,
    fieldState: { error },
  } = useController({ name, control });

  const {
    getRootProps,
    getInputProps,
    getInputLabelProps,
    getListboxProps,
    getOptionProps,
    groupedOptions,
    value,
  } = useAutocomplete({
    id: id,
    options: options,
    value: field.value ?? null,
    getOptionLabel: renderOptionLabel || ((option: K) => option as string),
    isOptionEqualToValue:
      isOptionEqualToValue || ((option, value) => option === value),
    onChange: (_, value) => field.onChange(value),
  });

  const displayHelp = () => {
    if (value && renderHelp) {
      return renderHelp(value);
    }

    return help;
  };

  return (
    <div
      className={clsx("field", !!colSize && `column is-${colSize}`)}
      {...getRootProps()}
    >
      <label className="label" {...getInputLabelProps()}>
        {label ?? capitalize(name)}
      </label>
      <div className="control">
        <div className={clsx("select is-fullwidth", error && "is-danger")}>
          <input
            className={clsx("input", error && "is-danger")}
            {...getInputProps()}
          />
          {groupedOptions.length > 0 ? (
            <ul className="listbox" {...getListboxProps()}>
              {(groupedOptions as typeof options).map((option, index) => (
                <li
                  key={`${name}-option-${index}`}
                  className="input is-borderless"
                  {...getOptionProps({ option, index })}
                >
                  {renderOption(option)}
                </li>
              ))}
            </ul>
          ) : null}
        </div>
      </div>
      {error && <p className="help has-text-danger-dark">{error.message}</p>}
      {!error && <p className="help">{displayHelp()}</p>}
    </div>
  );
}
