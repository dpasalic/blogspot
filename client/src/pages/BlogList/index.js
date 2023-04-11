import { useState, useEffect } from "react";
import { connect } from "react-redux";
import { getBlogsAndUI, createBlog, deleteBlog, getComments, createComment } from "../../actions";
import Modal from "../../components/Modal";
import NewBlogModal from "./NewBlogModal";
import CommentsModal from "./CommentsModal";
import BlogCard from "../../components/BlogCard";
import deleteBlogSVG from "../../assets/delete-blog.svg";
import "./blog-list.scss";

const BlogList = ({
    getBlogsAndUI, createBlog, deleteBlog, getComments, createComment,
    user, blogs, comments, theme
}) => {
    const [newBlogModalOpen, setNewBlogModalOpen] = useState(false);
    const [commentsModalOpen, setCommentsModalOpen] = useState(false);
    const [deleteModalOpen, setDeleteModalOpen] = useState(false);
    const [currentDeleteBlog, setCurrentDeleteBlog] = useState({});
    const [currentCommentsBlog, setCurrentCommentsBlog] = useState({});
    const [currentCommentsUser, setCurrentCommentsUser] = useState({});

    // Fetch blogs only on first load
    // and after switching from readlist where
    // one blog was fetched
    useEffect(() => {
        if (user && blogs.length <= 1) {
            getBlogsAndUI();
        }
    }, [user]);

    const onCommentsClick = (blog, user) => {
        setCommentsModalOpen(true);
        setCurrentCommentsBlog(blog);
        setCurrentCommentsUser(user);
        getComments(blog.id);
    };

    const renderBlogs = () => {
        return blogs.map(blog => {
            return <BlogCard
                key={blog.id}
                blog={blog}
                onBlogDeleteClick={onBlogDeleteClick}
                onCommentsClick={onCommentsClick} />
        });
    };

    const onBlogDeleteClick = blog => {
        setDeleteModalOpen(true);
        setCurrentDeleteBlog(blog);
    };

    const onBlogDeleteSubmit = () => {
        deleteBlog(currentDeleteBlog.id);
        setDeleteModalOpen(false);
    };

    return (
        <div className="blog-list-wrapper">
            <div
                onClick={() => setNewBlogModalOpen(true)}
                className="new-blog">
                <span className="material-symbols-outlined icon">
                    add_circle
                </span>
                <span className="message">New blog awaits, {user ? user.firstName : ""}!</span>
            </div>

            <NewBlogModal
                modalOpen={newBlogModalOpen}
                setModalOpen={setNewBlogModalOpen}
                createBlog={createBlog} />

            <CommentsModal
                modalOpen={commentsModalOpen}
                setModalOpen={setCommentsModalOpen}
                currentCommentsBlog={currentCommentsBlog}
                currentCommentsUser={currentCommentsUser}
                comments={comments}
                createComment={createComment}
                theme={theme} />

            <Modal
                modalOpen={deleteModalOpen}
                onClose={() => setDeleteModalOpen(false)}>
                <div className="delete-blog-wrapper">
                    <img src={deleteBlogSVG} alt="Red exclamation mark" />
                    <div className="delete-blog-message">
                        Do you really want to delete your blog:
                    </div>
                    <div className="delete-blog-title">{currentDeleteBlog.title}</div>
                    <button
                        type="button"
                        onClick={onBlogDeleteSubmit}
                        className="delete-blog-button">Delete</button>
                </div>
            </Modal>

            <div className="blog-list">
                {renderBlogs()}
            </div>
        </div>
    );
};

const mapStateToProps = (state) => {
    return {
        user: state.users[state.auth.userId],
        blogs: Object.values(state.blogs),
        comments: state.comments,
        theme: state.theme
    };
};

export default connect(
    mapStateToProps,
    { getBlogsAndUI, createBlog, deleteBlog, getComments, createComment }
)(BlogList);