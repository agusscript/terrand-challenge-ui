import Spinner from "../Spinner";

interface IAuthButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  isLoading: boolean;
}

export default function AuthButton({ isLoading, children }: IAuthButtonProps) {
  return (
    <button
      type="submit"
      disabled={isLoading}
      className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-bold text-white bg-[#0e6655] hover:bg-[#0b5345] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#0b5345] cursor-pointer"
    >
      {isLoading ? <Spinner width={20} height={20} /> : children}
    </button>
  );
}
