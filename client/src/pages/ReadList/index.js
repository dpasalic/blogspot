import { useEffect, useState, useRef } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { connect } from "react-redux";
import { getBlogAndUI, addReadingBlog, addAsRead, addToReadList, createInteraction, deleteInteraction, createComment, getComments } from "../../actions";
import useSwipe from "../../hooks/useSwipe";
import ListIndicator from "./ListIndicator";
import SwitchButtons from "./SwitchButtons";
import BlogInteractions from "./BlogInteractions";
import CommentsSection from "./CommentsSection";
import EmptyReadListIllustration from "./EmptyReadlistIllustration";
import SkeletonLoader from "./SkeletonLoader";
import "./read-list.scss";

const ReadList = ({
    getBlogAndUI, addReadingBlog, addAsRead, addToReadList, createInteraction, deleteInteraction, createComment, getComments,
    loggedUser, theme, currentBlog, blogAuthor, readBlogs, blogsToRead, interaction, comments
}) => {
    const [blogsArr, setBlogsArr] = useState([]);
    const [arrPosition, setArrPosition] = useState(0);
    const [switchClick, setSwitchClick] = useState({});
    const [leftSwitchAnimation, setLeftSwitchAnimation] = useState("");
    const [rightSwitchAnimation, setRightSwitchAnimation] = useState("");

    let navigate = useNavigate();
    const [params, setParams] = useSearchParams();
    const blogId = params.get("blogId");

    const readListWrapperRef = useRef();
    const isBlogOfLoggedUser = loggedUser === { ...currentBlog }.userId;

    useEffect(() => {
        if (blogId && !currentBlog) {
            // Fetching blog on direct url access (not through blog list page)
            // Added slight timeout to showcase skeleton loading
            setTimeout(() => getBlogAndUI(blogId), 1500);
        }

    }, []);

    useEffect(() => {
        readListWrapperRef.current.scrollIntoView({ behavior: "smooth" });
    }, [arrPosition]);

    useEffect(() => {
        // Condition that checks for browser back and forward
        // path changes
        if (currentBlog && blogId != currentBlog.id) {
            const newReadingBlog = blogsArr.find(bl => bl.id == blogId);
            addReadingBlog(newReadingBlog);

            const nextArrPosition = blogsArr.findIndex(bl => bl.id == blogId);
            if (nextArrPosition < arrPosition) {
                setLeftSwitchAnimation("switch-animation");
                setTimeout(() => setLeftSwitchAnimation(""), 750);
                setTimeout(() => {
                    setSwitchClick({ left: true });
                    setArrPosition(arrPosition - 1);
                }, 375);
            } else {
                setRightSwitchAnimation("switch-animation");
                setTimeout(() => setRightSwitchAnimation(""), 750);
                setTimeout(() => {
                    setSwitchClick({ right: true });
                    setArrPosition(arrPosition + 1);
                }, 375);
            }
        }

        if (currentBlog && blogsArr.length === 0) {
            const readBlogsDistinct = Object.values(readBlogs).filter(e => e.id !== currentBlog.id);
            const blogsToReadDistinct = Object.values(blogsToRead).filter(e => e.id !== currentBlog.id);
            setBlogsArr([...readBlogsDistinct, currentBlog, ...blogsToReadDistinct]);
            setArrPosition(readBlogsDistinct.length);
        }

        if (currentBlog && !(readBlogs.find(e => e.id === currentBlog.id))) {
            addAsRead(currentBlog);
        }
    }, [currentBlog, blogId]);

    const onSwitchLeft = () => {
        if (leftSwitchAnimation) {
            return;
        }

        if (arrPosition > 0) {
            // using object for switch click value to
            // force react to rerender ListIndicator component
            // primitive value of "left" would not rerender consecutive lefy clicks
            setLeftSwitchAnimation("switch-animation");
            setTimeout(() => setLeftSwitchAnimation(""), 750);

            setTimeout(() => {
                setSwitchClick({ left: true });
                addReadingBlog(blogsArr[arrPosition - 1]);
                setArrPosition(arrPosition - 1);
                navigate(`/readlist?blogId=${blogsArr[arrPosition - 1].id}`);
            }, 375);
        }
    };

    const onSwitchRight = () => {
        if (rightSwitchAnimation) {
            return;
        }

        if (arrPosition < blogsArr.length - 1) {
            setRightSwitchAnimation("switch-animation");
            setTimeout(() => setRightSwitchAnimation(""), 750);

            setTimeout(() => {
                setSwitchClick({ right: true });
                addReadingBlog(blogsArr[arrPosition + 1]);
                setArrPosition(arrPosition + 1);
                navigate(`/readlist?blogId=${blogsArr[arrPosition + 1].id}`);
            }, 375);
        }
    };
    const { onTouchStart, onTouchMove, onTouchEnd } = useSwipe(onSwitchLeft, onSwitchRight);

    // find appropriate illustration
    // for empty readlist
    // update skeleton load - add interactions and comments

    return (
        <div ref={readListWrapperRef} className="read-list-wrapper">
            <div
                onTouchStart={onTouchStart}
                onTouchMove={onTouchMove}
                onTouchEnd={onTouchEnd}
                className="swipe-area"></div>

            {blogsArr.length > 1 ?
                <ListIndicator
                    list={blogsArr}
                    currentPosition={arrPosition}
                    readBlogsLength={Object.values(readBlogs).filter(e => e.id !== currentBlog.id).length}
                    switchClick={switchClick} /> : null}
            <SwitchButtons
                isLeftButtonActive={arrPosition > 0}
                isRightButtonActive={arrPosition < blogsArr.length - 1}
                onSwitchLeft={onSwitchLeft}
                onSwitchRight={onSwitchRight} />
            <div className={`switch-animation-container ${leftSwitchAnimation || rightSwitchAnimation ? "" : "hide-switch-animation-container"}`}>
                <div className="switch-animation-wrapper switch-animation-left-wrapper">
                    <div className={`switch-animation-circle ${leftSwitchAnimation}`}></div>
                </div>
                <div className="switch-animation-wrapper switch-animation-right-wrapper">
                    <div className={`switch-animation-circle ${rightSwitchAnimation}`}></div>
                </div>
            </div>

            {!currentBlog ? !blogId ? <EmptyReadListIllustration theme={theme} /> : <SkeletonLoader /> :
                <div className="reader">
                    <div className="category">category</div>

                    <div className="reader-blog-title">
                        {currentBlog.title}
                    </div>
                    <div className="reader-blog-user">
                        {isBlogOfLoggedUser ? "You" :
                            blogAuthor ? blogAuthor.firstName + " " + blogAuthor.lastName : ""}
                    </div>
                    <div className="reader-blog-body">
                        {currentBlog.body}
                    </div>

                    <BlogInteractions
                        interaction={interaction}
                        createInteraction={createInteraction}
                        deleteInteraction={deleteInteraction}
                        currentBlog={currentBlog} />

                    <CommentsSection
                        comments={Object.values(comments).filter(com => com.blogId === currentBlog.id)}
                        createComment={createComment}
                        getComments={getComments}
                        currentBlog={currentBlog}
                        theme={theme} />
                </div>}
        </div>
    );
};

const mapStateToProps = state => {
    const currentBlogId = state.readList.currentBlog ? state.readList.currentBlog.id : null;
    const currentBlog = state.blogs[currentBlogId];

    return {
        loggedUser: state.auth.userId,
        theme: state.theme,
        currentBlog: currentBlog,
        blogAuthor: state.users[currentBlog ? currentBlog.userId : null],
        readBlogs: state.readList.readBlogs,
        blogsToRead: state.readList.blogsToRead,
        interaction: currentBlog ? state.interactions.find(intr => intr.blogId === currentBlog.id) : undefined,
        comments: state.comments
    };
};

export default connect(
    mapStateToProps,
    { getBlogAndUI, addAsRead, addReadingBlog, addToReadList, createInteraction, deleteInteraction, createComment, getComments }
)(ReadList);