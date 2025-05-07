interface IButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> { }

export default function Button({
  children,
  onClick,
}: IButtonProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-bold text-white bg-[#0e6655] hover:bg-[#0b5345] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#0b5345] disabled:opacity-50 cursor-pointer"
    >
      {children}
    </button>
  );
}
