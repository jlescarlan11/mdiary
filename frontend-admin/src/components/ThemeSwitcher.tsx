import { useEffect, useState } from "react";
import { LuPalette } from "react-icons/lu";

const ThemeSwitcher: React.FC = () => {
  const [theme, setTheme] = useState<string>(
    () => localStorage.getItem("theme") || "light"
  );

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
  }, [theme]);

  const themes = [
    { name: "light", colors: ["#ffffff", "#e2e8f0", "#38bdf8"] },
    { name: "dark", colors: ["#1e293b", "#0f172a", "#38bdf8"] },
    { name: "emerald", colors: ["#ffffff", "#d1fae5", "#10b981"] },
    { name: "corporate", colors: ["#ffffff", "#f3f4f6", "#4f46e5"] },
    { name: "aqua", colors: ["#e0f2fe", "#bae6fd", "#0369a1"] },
    { name: "sunset", colors: ["#fef3c7", "#fde68a", "#f59e0b"] },
    { name: "night", colors: ["#1e293b", "#0f172a", "#7dd3fc"] },
    { name: "valentine", colors: ["#f0d6e8", "#f5c6e6", "#e96d7b"] },
    { name: "forest", colors: ["#171212", "#0c0c0c", "#1eb854"] },
    { name: "lofi", colors: ["#ffffff", "#f5f5f5", "#000000"] },
  ];

  return (
    <div className="dropdown dropdown-end">
      <button tabIndex={0} className="btn m-1">
        <LuPalette />
        <svg
          width="12px"
          height="12px"
          className="inline-block h-2 w-2 fill-current opacity-60 ml-1"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 2048 2048"
        >
          <path d="M1799 349l242 241-1017 1017L7 590l242-241 775 775 775-775z" />
        </svg>
      </button>

      <ul
        tabIndex={0}
        className="dropdown-content menu p-2 shadow-2xl bg-base-200 rounded-box w-52"
      >
        {themes.map((t) => (
          <li key={t.name}>
            <label
              className={`flex items-center gap-2 cursor-pointer px-3 py-2 rounded-lg transition-colors ${
                theme === t.name
                  ? "bg-primary text-primary-content"
                  : "hover:bg-base-300"
              }`}
            >
              <input
                type="radio"
                name="theme-dropdown"
                className="theme-controller hidden"
                aria-label={t.name}
                value={t.name}
                checked={theme === t.name}
                onChange={() => setTheme(t.name)}
              />
              <span className="flex-shrink-0 capitalize">{t.name}</span>
              <div className="flex gap-1 flex-grow justify-end">
                {t.colors.map((color, i) => (
                  <div
                    key={i}
                    className="w-3 h-3 rounded-full border border-base-content/10"
                    style={{ backgroundColor: color }}
                  />
                ))}
              </div>
              {theme === t.name && (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4 ml-1"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                    clipRule="evenodd"
                  />
                </svg>
              )}
            </label>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ThemeSwitcher;
