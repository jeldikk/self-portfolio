import { useTheme } from "next-themes";
import { usePostHog } from "posthog-js/react";

export default function ThemeSwitcher() {
  const posthog = usePostHog();

  const { theme, setTheme } = useTheme();

  function handleThemeChange(event: React.ChangeEvent<HTMLSelectElement>) {
    setTheme(event.target.value);
    posthog.capture("theme_changed", {
      theme: event.target.value,
    });
  }
  return (
    <select
      value={theme}
      onChange={handleThemeChange}
      className="select select-bordered select-sm"
    >
      <option disabled={true}>Select Theme</option>
      <option value="light">Light</option>
      <option value="dark">Dark</option>
      <option value="cupcake">Cupcake</option>
      <option value="retro">Retro</option>
      <option value="cyberpunk">Cyberpunk</option>
      <option value="coffee">Coffee</option>
      <option value="caramellatte">Caramel Latte</option>
    </select>
  );
}
