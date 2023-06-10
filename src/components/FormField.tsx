export interface FormFieldProps {
  label: string;
  value: any;
  setValue: (e: any) => void;
  fieldType?: "input" | "textarea";
}

export const FormField = ({
  label,
  value,
  setValue,
  fieldType = "input",
}: FormFieldProps) => {
  const props = {
    name: label,
    id: label,
    value: value,
    onChange: (e: any) => setValue(e.target.value),
    className:
      "w-full rounded-md border border-[#e0e0e0] bg-white p-3 text-base font-medium outline-none focus:border-blue-600 focus:shadow-md",
  };
  return (
    <div className="mb-5">
      <label
        htmlFor={label}
        className="mb-3 block text-sm font-medium text-gray-600"
      >
        {label}
      </label>
      {fieldType === "input" ? (
        <input type="text" {...props} />
      ) : (
        <textarea rows={6} {...props} />
      )}
    </div>
  );
};
