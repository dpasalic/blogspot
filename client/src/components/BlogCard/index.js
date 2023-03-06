import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { addReadingBlog, addToReadList } from "../../actions";
import Tooltip from "../Tooltip";
import "./blog-card.scss";

const BlogCard = ({ addReadingBlog, addToReadList, blog, user, blogsToRead }) => {
    if (!user) {
        return null;
    }

    const onButtonClick = e => {
        e.preventDefault()
    };

    const onStarButtonClick = e => {
        onButtonClick(e);
        e.stopPropagation();

        if (!blogsToRead.find(e => e.id === blog.id)) {
            addToReadList(blog);
        }
    };

    return (
        <Link
            onClick={() => addReadingBlog(blog)}
            to={`/readlist?blogId=${blog.id}`}
            className="blog-card">
            <div className="blog-card-top">
                <div className="category">category</div>
                <button
                    onClick={onStarButtonClick}
                    className={`${blogsToRead.find(e => e.id === blog.id) ? "active-button" : null}`}>
                    <span className="material-symbols-outlined icon">
                        star
                    </span>
                </button>
            </div>

            <h2 className="blog-card-header">{blog.title}</h2>

            <div className="blog-card-user">
                {`${user.firstName} ${user.lastName}`}
            </div>

            <div className="blog-card-footer">
                <button onClick={onButtonClick}>
                    <span className="material-symbols-outlined icon">
                        thumb_up
                    </span>
                    <span className="counter">{blog.likes}</span>
                </button>
                <button onClick={onButtonClick}>
                    <span className="material-symbols-outlined icon">
                        thumb_down
                    </span>
                    <span className="counter">{blog.dislikes}</span>
                </button>
                <button onClick={onButtonClick}>
                    <span className="material-symbols-outlined icon">
                        chat_bubble
                    </span>
                    <span className="counter">{blog.comments}</span>
                </button>
            </div>
        </Link>
    );
};

const mapStateToProps = (state, ownProps) => {
    return {
        user: state.users[ownProps.blog.userId],
        blogsToRead: state.readList.blogsToRead
    };
};

export default connect(
    mapStateToProps,
    { addReadingBlog, addToReadList }
)(BlogCard);