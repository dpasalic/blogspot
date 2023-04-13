
const BlogInteractions = ({ interaction, createInteraction, deleteInteraction, currentBlog }) => {
    const intr = interaction || {};

    const onLikeButtonClick = e => {
        e.preventDefault();

        if (!intr.liked) {
            createInteraction(currentBlog.id, true, false);
        } else {
            deleteInteraction(intr.id, currentBlog.id, "like");
        }
    };

    const onDislikeButtonClick = e => {
        e.preventDefault();

        if (!intr.disliked) {
            createInteraction(currentBlog.id, false, true);
        } else {
            deleteInteraction(intr.id, currentBlog.id, "dislike");
        }
    };

    return (
        <div className="reader-blog-footer">
            <button
                onClick={onLikeButtonClick}
                className={`${intr.liked ? "active-button" : null}`}>
                <span className="material-symbols-outlined icon">
                    thumb_up
                </span>
                <span className="counter">{currentBlog.likes}</span>
            </button>
            <button
                onClick={onDislikeButtonClick}
                className={`${intr.disliked ? "active-button" : null}`}>
                <span className="material-symbols-outlined icon">
                    thumb_down
                </span>
                <span className="counter">{currentBlog.dislikes}</span>
            </button>
        </div>
    );
};

export default BlogInteractions;