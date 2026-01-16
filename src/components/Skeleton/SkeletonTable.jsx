import './Skeleton.css';

export function SkeletonTable({ rows = 5, columns = 5 }) {
  return (
    <div className="skeleton-table">
      {Array.from({ length: rows }).map((_, rowIndex) => (
        <div key={rowIndex} className="skeleton-row">
          {Array.from({ length: columns }).map((_, colIndex) => (
            <div key={colIndex} className="skeleton-cell"></div>
          ))}
        </div>
      ))}
    </div>
  );
}

export function SkeletonCard() {
  return (
    <div className="skeleton-card">
      <div className="skeleton-line skeleton-title"></div>
      <div className="skeleton-line skeleton-subtitle"></div>
      <div className="skeleton-line skeleton-text"></div>
      <div className="skeleton-line skeleton-text-short"></div>
    </div>
  );
}

export function SkeletonList({ items = 3 }) {
  return (
    <div className="skeleton-list">
      {Array.from({ length: items }).map((_, index) => (
        <div key={index} className="skeleton-list-item">
          <div className="skeleton-circle"></div>
          <div className="skeleton-list-content">
            <div className="skeleton-line skeleton-list-title"></div>
            <div className="skeleton-line skeleton-list-subtitle"></div>
          </div>
        </div>
      ))}
    </div>
  );
}
