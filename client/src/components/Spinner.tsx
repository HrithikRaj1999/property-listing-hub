const Spinner = ({ height = 6, width = 6 }) => {
  return (
    <div>
      <div
        className={`inline-block animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-none`}
        style={{ height: `${height}px`, width: `${width}px` }}
        role="status"
      >
        <span className="sr-only">Loading...</span>
      </div>
    </div>
  );
};

export default Spinner;
