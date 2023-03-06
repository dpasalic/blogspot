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

// Add read page link to nav
// It is page for reading blogs
// Has left and right arrow for
// switching blogs
// Left for read, right for not read blogs
// Functionality of adding blogs to readlist
// Notification circle of blogs to read on
// readlist link button

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