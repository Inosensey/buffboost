"use client";

// Types
interface TextFieldProps {
  label?: string;
  name?: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  type?: string;
  required: boolean;
  fill: boolean;
  haveLabelHTML: boolean;
}

const TextField = (props: TextFieldProps) => {
  const generateField = ({
    type,
    label,
    name,
    value,
    required,
    placeholder,
    onChange,
    fill,
    haveLabelHTML,
  }: TextFieldProps) => {
    if (haveLabelHTML) {
      switch (type) {
        case "text":
        case "password":
        case "email":
          return (
            <div className="w-full flex flex-col">
              <label htmlFor={name} className="font-spaceGrotesk font-semibold phone:text-sm">{label}</label>
              <input
                autoComplete="off"
                className="bg-transparent border-2 font-inter rounded-sm p-2 text-Text border-Primary focus:border-Divider valid:border-Divider transition duration-200 phone:text-sm"
                required={required}
                type={type}
                name={name}
                value={value}
              />
            </div>
          );
      }
    } else {
      switch (type) {
        case "text":
        case "password":
        case "email":
          return (
            <div className="w-full flex flex-col relative">
              <input
                autoComplete="off"
                className="peer bg-transparent border-2 font-inter rounded-sm p-2 text-Text border-Primary focus:border-Divider valid:border-Divider transition duration-200 phone:text-sm"
                required={required}
                type={type}
                name={name}
                value={value}
              />
              <label htmlFor={name} className="top-0 font-spaceGrotesk font-semibold p-2 phone:text-sm absolute transition-all-ease-in duration-300 peer-focus:top-[-18px] peer-focus:text-[0.8rem] peer-focus:text-Text peer-valid:top-[-18px] peer-valid:text-[0.8rem] peer-valid:text-Text">
                {label}
              </label>
            </div>
          );
      }
    }
  };

  return <>{generateField(props)}</>;
};

export default TextField;
