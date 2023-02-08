import { connect } from "react-redux";
import Tooltip from "../Tooltip";
import "./blog-card.scss";

const BlogCard = ({ blog, user }) => {
    if (!user) {
        return null;
    }

    return (
        <div className="blog-card" tabIndex="0">
            <Tooltip message={"category"} />

            <h2 className="blog-card-header">{blog.title}</h2>

            <div className="blog-card-user">
                {`${user.firstName} ${user.lastName}`}
            </div>

            <div className="blog-card-footer">
                <button>
                    <span className="material-symbols-outlined icon">
                        thumb_up
                    </span>
                    <span className="counter">{blog.likes}</span>
                </button>
                <button>
                    <span className="material-symbols-outlined icon">
                        thumb_down
                    </span>
                    <span className="counter">{blog.dislikes}</span>
                </button>
                <button>
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
    return { user: state.users[ownProps.blog.userId] };
};

export default connect(mapStateToProps)(BlogCard);