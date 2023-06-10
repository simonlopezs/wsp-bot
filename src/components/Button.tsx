export interface ButtonProps {
  label: string;
  variant?: "primary" | "secondary";
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
}

const colors = {
  primary: {
    bg: "bg-blue-700",
    hover: "hover:bg-blue-800",
    focus: "focus:shadow-outline focus:outline-none",
    text: "text-white",
  },
  secondary: {
    bg: "bg-gray-200",
    hover: "hover:bg-gray-300",
    focus: "focus:shadow-outline",
    text: "text-gray-700",
  },
};

export const Button = ({
  label,
  onClick,
  variant = "primary",
}: ButtonProps) => {
  const color = colors[variant];
  return (
    <button
      onClick={onClick}
      className={`shadow ${color.bg} ${color.hover} ${color.focus} ${color.text} text-sm py-2 px-5 rounded`}
    >
      {label}
    </button>
  );
};
