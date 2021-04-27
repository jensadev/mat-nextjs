export default function Loading() {
    return (
        <div className="position-absolute top-50 start-50 translate-middle">
            <div
                className="spinner-border"
                style={{ width: '4rem', height: '4rem' }}
                role="status">
                <span className="visually-hidden">Loading...</span>
            </div>
        </div>
    );
}
