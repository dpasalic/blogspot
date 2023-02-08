import { useState, useEffect } from "react";
import { connect } from "react-redux";
import { getBlogsAndUsers, createBlog } from "../../actions";
import NewBlogModal from "./NewBlogModal";
import BlogCard from "../../components/BlogCard";
import "./blog-list.scss";

const BlogList = ({ getBlogsAndUsers, createBlog, user, blogs }) => {
    const [modalOpen, setModalOpen] = useState(false);

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
            <div
                onClick={() => setModalOpen(true)}
                className="new-blog">
                <span className="material-symbols-outlined icon">
                    add_circle
                </span>
                <span className="message">New blog awaits, {user ? user.firstName : ""}!</span>
            </div>

            <NewBlogModal
                modalOpen={modalOpen}
                setModalOpen={setModalOpen}
                createBlog={createBlog} />

            <div className="blog-list">
                {renderBlogs()}
            </div>
        </div>
    );
};

const mapStateToProps = (state) => {
    return {
        user: state.users[state.auth.userId],
        blogs: Object.values(state.blogs)
    };
};

export default connect(
    mapStateToProps,
    { getBlogsAndUsers, createBlog }
)(BlogList);