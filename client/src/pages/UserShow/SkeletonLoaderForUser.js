const SkeletonLoaderForUser = () => {
    return (
        <div className="skeleton-wrapper">
            <div className="skeleton-user-mini-card">
                <div className="skeleton-circle skeleton-user-card-icon"></div>
                <div className="skeleton-user-name-wrapper">
                    <div className="skeleton-line skeleton-user-card-name"></div>
                    <div className="skeleton-line skeleton-user-card-role"></div>
                </div>
            </div>
            <div className="skeleton-line skeleton-user-card-email"></div>
            <div className="skeleton-line skeleton-user-card-password"></div>
        </div>
    );
};

export default SkeletonLoaderForUser;