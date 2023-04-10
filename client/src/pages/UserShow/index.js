import { useState, useEffect } from "react";
import { connect } from "react-redux";
import { getUser, getBlogsOfUser, editUser } from "../../api";
import { getComments, getAllInteractionsOfUser, createComment, deleteBlog, editUserReduxState, getBlogsToReduxState } from "../../actions";
import { useLocation } from "react-router-dom";
import { Link } from "react-router-dom";
import lightUserIconSVG from "../../assets/light-user-icon.svg";
import darkUserIconSVG from "../../assets/dark-user-icon.svg";
import verdantUserIconSVG from "../../assets/verdant-user-icon.svg";
import BlogCard from "../../components/BlogCard";
import Modal from "../../components/Modal";
import CommentsModal from "../BlogList/CommentsModal";
import EditUserModal from "./EditUserModal";
import SkeletonLoaderForUser from "./SkeletonLoaderForUser";
import SkeletonLoaderForBlogs from "./SkeletonLoaderForBlogs";
import deleteBlogSVG from "../../assets/delete-blog.svg";
import lightEmptyReadListSVG from "../../assets/light-empty-readlist.svg";
import darkEmptyReadListSVG from "../../assets/dark-empty-readlist.svg";
import verdantEmptyReadListSVG from "../../assets/verdant-empty-readlist.svg";
import "./user-show.scss";

const UserShow = ({ getComments, getAllInteractionsOfUser, createComment, deleteBlog, editUserReduxState, getBlogsToReduxState, loggedUser, theme, comments }) => {
    const [user, setUser] = useState({});
    const [blogsOfUser, setBlogsOfUser] = useState(null);
    const [deleteModalOpen, setDeleteModalOpen] = useState(false);
    const [editUserModalOpen, setEditUserModalOpen] = useState(false);
    const [commentsModalOpen, setCommentsModalOpen] = useState(false);
    const [currentCommentsBlog, setCurrentCommentsBlog] = useState({});
    const [currentDeleteBlog, setCurrentDeleteBlog] = useState({});
    const { pathname } = useLocation();

    const userId = pathname.substr(7);
    const isProfileOfLoggedUser = userId == loggedUser;
    const blogsOfUserLength = blogsOfUser ? blogsOfUser.length : "...";

    useEffect(() => {
        if ((!user.id && loggedUser) || user.id) {
            setTimeout(() => {
                getUser(userId)
                    .then(res => {
                        setUser(res.data);
                        getAllInteractionsOfUser(res.data.id);
                    });
            }, 500);
            setTimeout(() => {
                getBlogsOfUser(userId)
                    .then(res => {
                        setBlogsOfUser(res.data);
                        //getBlogsToReduxState(res.data);
                    });
            }, 1000);
        }
    }, [loggedUser, userId]);

    // Get interactions on user show page

    const renderBlogsOfUser = () => {
        if (blogsOfUser === null) {
            return <>
                <SkeletonLoaderForBlogs />
                <SkeletonLoaderForBlogs />
            </>;
        } else if (blogsOfUser.length === 0) {
            return <div className="zero-blogs">
                <img
                    src={theme === "light" ? lightEmptyReadListSVG :
                        theme === "dark" ? darkEmptyReadListSVG : verdantEmptyReadListSVG}
                    alt="zero-blogs-illustration"
                    className="zero-blogs-svg" />
                <div className="zero-blogs-message">
                    You don't have any blogs!<br />Make some <Link to="/">here</Link>
                </div>
            </div>;
        } else {
            return blogsOfUser.map(blog =>
                <BlogCard
                    key={blog.id}
                    blogAuthorForUserShow={user}
                    blog={blog}
                    onBlogDeleteClick={onBlogDeleteClick}
                    onCommentsClick={onCommentsClick} />);
        }
    };

    const onEditUserClick = (e) => {
        setEditUserModalOpen(true);
    };

    const onUserEdit = (id, values) => {
        editUser(id, values)
            .then(res => {
                setUser(res.data);
                editUserReduxState(res.data);
            });
    };

    const onCommentsClick = (blog) => {
        setCommentsModalOpen(true);
        setCurrentCommentsBlog(blog);
        getComments(blog.id);
    };

    const onBlogDeleteClick = (blog) => {
        setDeleteModalOpen(true);
        setCurrentDeleteBlog(blog);
    };
    const onBlogDeleteSubmit = () => {
        deleteBlog(currentDeleteBlog.id);
        setDeleteModalOpen(false);
        setBlogsOfUser(blogsOfUser.filter(b => b.id !== currentDeleteBlog.id));
    };

    // implement and update skeleton loading where needed
    // implement loader where needed

    return (
        <div className="blog-show-wrapper">
            {Object.keys(user).length === 0 ? <SkeletonLoaderForUser /> :
                <div className="user-profile-card">
                    <div className="user-mini-card">
                        <img
                            src={theme === "light" ? lightUserIconSVG :
                                theme === "dark" ? darkUserIconSVG : verdantUserIconSVG}
                            alt="no comment illustration"
                            className="no-comment-png" />
                        <div className="user-mini-card-data">
                            <div className="full-name">{`${user.firstName} ${user.lastName}`}</div>
                            <div className="role">{user.role}</div>
                        </div>
                        {isProfileOfLoggedUser ? <button
                            onClick={onEditUserClick}
                            className="material-symbols-outlined user-mini-card-edit-button">
                            edit
                        </button> : null}
                    </div>

                    {isProfileOfLoggedUser ?
                        <>
                            <div className="user-email">
                                <div className="material-symbols-outlined user-email-icon">
                                    mail
                                </div>
                                <div className="user-email-text">{user.email}</div>
                            </div>
                            <div className="user-password">
                                <div className="material-symbols-outlined user-password-icon">
                                    lock
                                </div>
                                <div className="user-password-text">●●●●●●●●●</div>
                            </div>
                        </> : null}
                </div>}


            <h1 className="user-show-header">
                {isProfileOfLoggedUser ? "Your" : user.firstName + "'s"} blogs
                {" (" + blogsOfUserLength + ")"}
            </h1>

            <div className="blogs-of-user">
                {renderBlogsOfUser()}
            </div>

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

            <CommentsModal
                modalOpen={commentsModalOpen}
                setModalOpen={setCommentsModalOpen}
                currentCommentsBlog={currentCommentsBlog}
                currentCommentsUser={user}
                comments={comments}
                createComment={createComment}
                theme={theme} />

            <EditUserModal
                modalOpen={editUserModalOpen}
                setModalOpen={setEditUserModalOpen}
                user={user}
                onUserEdit={onUserEdit} />
        </div>
    );
};

const mapStateToProps = (state) => {
    return {
        loggedUser: state.auth.userId,
        theme: state.theme,
        comments: state.comments
    };
};

export default connect(
    mapStateToProps,
    { getComments, getAllInteractionsOfUser, createComment, deleteBlog, editUserReduxState, getBlogsToReduxState }
)(UserShow);