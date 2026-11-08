/**
 * Site-wide backdrop: slow aurora light over a faint dot grid. It uses radial
 * gradients rather than blur filters, which keeps it cheap to animate.
 */
export function AmbientBackground() {
  return (
    <div aria-hidden="true" className="ambient fixed inset-0 -z-10 overflow-hidden pointer-events-none">
      <div className="ambient-blob ambient-blob-a" />
      <div className="ambient-blob ambient-blob-b" />
      <div className="ambient-blob ambient-blob-c" />
      <div className="ambient-grid absolute inset-0" />
    </div>
  );
}
