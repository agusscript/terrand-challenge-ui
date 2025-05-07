import { FieldArray, FormikErrors, useFormikContext } from "formik";
import AuthInput from "../auth/AuthInput";
import DeleteIcon from "../../../assets/delete-icon.svg";

interface IMultiInputFieldProps {
  name: string;
  title: string;
  label: string;
  placeholder?: string;
}

export default function MultiInputField({ name, title, label, placeholder }: IMultiInputFieldProps) {
  const { values, errors, touched } = useFormikContext<Record<string, string[]>>();

  return (
    <FieldArray name={name}>
      {({ push, remove }) => (
        <div className="mt-4 flex flex-col items-start">
          <label className="self-start text-sm font-medium font-mono text-gray-700 mb-1">
            {title}
          </label>
          <div className="flex flex-col">
            {values[name]?.map((_item, index) => (
              <div key={index} className="flex items-center gap-2">
                <AuthInput
                  name={`${name}[${index}]`}
                  placeholder={placeholder || ""}
                  type="text"
                  error={!!(
                    errors[name] &&
                    (errors[name] as FormikErrors<string[]>)[index]
                  )}
                  touched={
                    Array.isArray(touched[name]) ? (touched[name] as boolean[])[index] : false
                  }
                />
                <button
                  type="button"
                  onClick={() => remove(index)}
                  className="cursor-pointer mb-1.5 select-none hover:opacity-90"
                >
                  <img src={DeleteIcon} alt="Remove element" width={30} height={30} />
                </button>
              </div>
            ))}
          </div>
          <button
            type="button"
            onClick={() => push("")}
            className=" my-4 text-blue-700 hover:text-blue-500 text-sm cursor-pointer"
          >
            + Agregar {label.toLowerCase()}
          </button>
          {typeof errors[name] === "string" && (
            <div className="text-red-500 text-sm my-2">{errors[name]}</div>
          )}
        </div>
      )}
    </FieldArray>
  );
}
