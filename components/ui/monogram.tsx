import { initials } from "@/config/invitation";

export function Monogram() {
  return (
    <span className="brand-monogram" aria-hidden="true">
      <span>{initials.slice(0, 1)}</span>
      <span className="monogram-slash" />
      <span>{initials.slice(1, 2)}</span>
    </span>
  );
}
