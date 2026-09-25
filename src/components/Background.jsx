export default function Background() {
  return (
    <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none">
      {/* base */}
      <div className="absolute inset-0 bg-[#050510]" />

      {/* aurora blobs */}
      <div className="absolute -top-40 -left-40 w-[40rem] h-[40rem] rounded-full bg-primary/20 blur-[140px] animate-pulse" />
      <div className="absolute top-1/3 -right-40 w-[36rem] h-[36rem] rounded-full bg-secondary/20 blur-[140px] animate-pulse" style={{ animationDuration: '9s' }} />
      <div className="absolute -bottom-40 left-1/3 w-[34rem] h-[34rem] rounded-full bg-accent/15 blur-[140px] animate-pulse" style={{ animationDuration: '12s' }} />

      {/* grid */}
      <div
        className="absolute inset-0 opacity-[0.07]"
        style={{
          backgroundImage:
            'linear-gradient(rgba(255,255,255,0.6) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.6) 1px, transparent 1px)',
          backgroundSize: '60px 60px',
          maskImage: 'radial-gradient(ellipse at center, black 30%, transparent 80%)',
          WebkitMaskImage: 'radial-gradient(ellipse at center, black 30%, transparent 80%)',
        }}
      />

      {/* vignette */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_30%,#050510_100%)]" />

      {/* grain */}
      <div className="grain absolute inset-0" />
    </div>
  )
}