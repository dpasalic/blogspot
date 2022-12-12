import "./Layout.scss";

const Layout = ({ children }) => {
    return (
        <div className="theme-light">
            <div className="body">
                <div className="glass-wrapper">
                    <div className="container">
                        {children}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Layout;