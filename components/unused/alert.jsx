export default function Alert({ type, children }) {
  return (
    <div className="fixed-bottom">
      <div className={`alert alert-${type} alert-dismissible fade show`}>
        {children}
        <button
          type="button"
          className="close"
          data-dismiss="alert"
          aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
    </div>
  );
}
