import { Link } from "react-router-dom";
import { Home, Brain, Calculator, ChevronDown, BarChart } from "lucide-react";
import { useState, useRef, useEffect } from "react";

export default function Header() {
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsDropdownOpen(false);
            }
        }

        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const handleLinkClick = () => {
        setIsDropdownOpen(false);
    };

    return (
        <nav className="bg-slate-800 p-4 shadow-md sticky top-0 z-50 ">
            <div className="container flex items-center justify-start gap-6 mx-[20%]">
                <Link
                    to="/"
                    className="flex items-center gap-2 text-white hover:text-blue-400 transition-colors"
                >
                    <Home size={20} />
                    <span>Home</span>
                </Link>

                <Link
                    to="/ai-analysis"
                    className="flex items-center gap-2 text-white hover:text-blue-400 transition-colors"
                >
                    <Brain size={20} />
                    <span>AI Analysis</span>
                </Link>
                <div className="relative" ref={dropdownRef}>
                    <button
                        onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                        onBlur={() => setTimeout(() => setIsDropdownOpen(false), 100)}
                        className="flex items-center gap-2 text-white hover:text-blue-400 transition-colors"
                    >
                        <Calculator size={20} />
                        <span>Valuations</span>
                        <ChevronDown size={16} />
                    </button>

                    {isDropdownOpen && (
                        <div className="absolute top-full left-0 mt-2 w-48 bg-slate-800 rounded-md shadow-lg py-1">
                            <Link
                                to="/bazin-valuation"
                                className="flex items-center gap-2 px-4 py-2 text-white hover:bg-slate-700"
                                onClick={handleLinkClick}
                            >
                                <span>Bazin Valuation</span>
                            </Link>
                            <Link
                                to="/peter-lynch-valuation"
                                className="flex items-center gap-2 px-4 py-2 text-white hover:bg-slate-700"
                                onClick={handleLinkClick}
                            >
                                <span>Peter Lynch Valuation</span>
                            </Link>
                        </div>
                    )}
                </div>
                <Link
                    to="/b3"
                    className="flex items-center gap-2 text-white hover:text-blue-400 transition-colors"
                >
                    <BarChart size={20} />
                    <span>B3</span>
                </Link>
            </div>
        </nav>
    );
}
