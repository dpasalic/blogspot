import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { addReadingBlog, addToReadList, createInteraction, deleteInteraction } from "../../actions";
import "./blog-card.scss";

const BlogCard = ({
    blogAuthorForUserShow, addReadingBlog, addToReadList, createInteraction, deleteInteraction,
    blog, onBlogDeleteClick, onCommentsClick, loggedUser, blogAuthor, blogsToRead, interaction
}) => {
    const user = blogAuthor || blogAuthorForUserShow;
    if (!user) {
        return null;
    }

    const intr = interaction || {};
    const isBlogOfLoggedUser = loggedUser === blog.userId;

    // Add blog to readlist
    const onStarButtonClick = e => {
        e.preventDefault();
        e.stopPropagation();

        if (!blogsToRead.find(e => e.id === blog.id)) {
            addToReadList(blog);
        }
    };

    // Open delete blog modal
    const onDeleteButtonClick = e => {
        e.preventDefault();
        e.stopPropagation();

        onBlogDeleteClick(blog);
    };

    // Like blog
    const onLikeButtonClick = e => {
        e.preventDefault();

        if (!intr.liked) {
            createInteraction(blog.id, true, false);
        } else {
            deleteInteraction(intr.id, blog.id, "like");
        }
    };

    // Dislike blog
    const onDislikeButtonClick = e => {
        e.preventDefault();

        if (!intr.disliked) {
            createInteraction(blog.id, false, true);
        } else {
            deleteInteraction(intr.id, blog.id, "dislike");
        }
    };

    // Open comments modal
    const onCommentButtonClick = e => {
        e.preventDefault();
        onCommentsClick(blog, user);
    };

    return (
        <div className="blog-card">
            <Link
                onClick={() => addReadingBlog(blog)}
                to={`/readlist?blogId=${blog.id}`}
                className="blog-card-link"></Link>
            <div className="blog-card-top">
                <div className="category">category</div>
                {isBlogOfLoggedUser ?
                    <button
                        onClick={onDeleteButtonClick}
                        className={`${null}`}>
                        <span className="material-symbols-outlined icon">
                            delete
                        </span>
                    </button> :
                    <button
                        onClick={onStarButtonClick}
                        className={`${blogsToRead.find(e => e.id === blog.id) ? "active-button" : null}`}>
                        <span className="material-symbols-outlined icon">
                            star
                        </span>
                    </button>}
            </div>

            <h2 className="blog-card-header">{blog.title}</h2>

            <div className="blog-card-user">
                {isBlogOfLoggedUser ? "You" : `${user.firstName} ${user.lastName}`}
            </div>

            <div className="blog-card-footer">
                <button
                    onClick={onLikeButtonClick}
                    className={`${intr.liked ? "active-button" : null}`}>
                    <span className="material-symbols-outlined icon">
                        thumb_up
                    </span>
                    <span className="counter">{blog.likes}</span>
                </button>
                <button
                    onClick={onDislikeButtonClick}
                    className={`${intr.disliked ? "active-button" : null}`}>
                    <span className="material-symbols-outlined icon">
                        thumb_down
                    </span>
                    <span className="counter">{blog.dislikes}</span>
                </button>
                <button onClick={onCommentButtonClick}>
                    <span className="material-symbols-outlined icon">
                        chat_bubble
                    </span>
                    <span className="counter">{blog.comments}</span>
                </button>
            </div>
        </div>
    );
};

const mapStateToProps = (state, ownProps) => {
    return {
        loggedUser: state.auth.userId,
        blogAuthor: state.users[ownProps.blog.userId],
        blogsToRead: state.readList.blogsToRead,
        interaction: state.interactions.find(intr => intr.blogId === ownProps.blog.id && intr.userId === state.auth.userId)
    };
};

export default connect(
    mapStateToProps,
    { addReadingBlog, addToReadList, createInteraction, deleteInteraction }
)(BlogCard);