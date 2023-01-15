import _ from "lodash";
import { useEffect } from "react";
import { connect } from "react-redux";
import { getBlogsAndUsers } from "../../actions";
import BlogCard from "../../components/BlogCard";
import "./blog-list.scss";

const BlogList = ({ getBlogsAndUsers, blogs }) => {
    useEffect(() => {
        getBlogsAndUsers();
    }, []);

    const renderBlogs = () => {
        return blogs.map(blog => {
            return <BlogCard
                key={blog.id}
                blog={blog} />
        });
    };

    return (
        <div className="blog-list-wrapper">
            <div className="new-blog">
                <span className="material-symbols-outlined icon">
                    add_circle
                </span>
                <span className="message">New blog awaits, [firstName]!</span>
            </div>

            <div className="blog-list">
                {renderBlogs()}
            </div>
        </div>
    );
};

const mapStateToProps = (state) => {
    return { blogs: Object.values(state.blogs) };
};

export default connect(
    mapStateToProps,
    { getBlogsAndUsers }
)(BlogList);