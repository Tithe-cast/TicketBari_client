const LoadingSpinner = ({ fullScreen = true }) => {
  return (
    <div className={`flex items-center justify-center ${fullScreen ? "min-h-[60vh]" : "py-10"}`}>
      <div className="flex flex-col items-center gap-3">
        <span className="loading loading-spinner loading-lg text-primary"></span>
        <span className="font-ticket text-xs uppercase tracking-widest text-base-content/60">
          Loading…
        </span>
      </div>
    </div>
  );
};

export default LoadingSpinner;
