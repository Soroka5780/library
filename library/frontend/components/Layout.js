import Navbar from "./NavBar";

const Layout = ({ children }) => {
    return (
        <>
            <Navbar /> <div> {children} </div>
        </>
    );
};

export default Layout;