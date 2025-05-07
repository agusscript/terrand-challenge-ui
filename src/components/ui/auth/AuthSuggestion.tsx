import { Link } from "react-router-dom";

interface IAuthSuggestionProps {
  text: string;
  linkName: string;
  redirectTo: string;
  className?: string;
}

export default function AuthSuggestion({
  text,
  linkName,
  redirectTo,
  className = ""
}: IAuthSuggestionProps) {
  return (
    <div className="mt-5 text-center">
      <p className="flex items-center justify-center gap-1.5 text-sm text-gray-600">
        <span>{text}</span>
        <Link
          to={redirectTo}
          className={`font-medium text-[#0e6655] hover:text-[#0e6654c9] ${className}`}
        >
          {linkName}
        </Link>
      </p>
    </div>
  );
}
