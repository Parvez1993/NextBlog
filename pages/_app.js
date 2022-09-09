import { useEffect, useState } from "react";
import { Provider } from "react-redux";
import Navbar from "../components/Navbar";
import { AuthProvider } from "../contextApi/UserContext";
import "../styles/globals.css";
import "react-toastify/dist/ReactToastify.css";
import { AdminProductProvider } from "../contextApi/CreateProduct";
import { BlogProvider } from "../contextApi/Blog";

function MyApp({ Component, pageProps }) {
  //show or close Sidebar
  const [open, setOpen] = useState(true);

  // close and open navbar

  const [showNav, setShowNav] = useState(false);

  //choose the screen size
  const handleResize = () => {
    if (window.innerWidth < 768.9) {
      setOpen(false);
      setShowNav(true);
    } else {
      setOpen(true);
      setShowNav(false);
    }
  };

  // create an event listener
  useEffect(() => {
    if (window.innerWidth < 768.9) {
      setOpen(false);
      setShowNav(true);
    }
    window.addEventListener("resize", handleResize);
  }, []);

  return (
    <>
      <AuthProvider>
        <BlogProvider>
          {" "}
          <AdminProductProvider>
            <div className={`${open ? "flex  " : "flex-col bg  "}`}>
              <Navbar
                open={open}
                setOpen={setOpen}
                showNav={showNav}
                setShowNav={setShowNav}
              />
              <div className="w-full">
                <Component {...pageProps} />
              </div>
            </div>
          </AdminProductProvider>
        </BlogProvider>
      </AuthProvider>
    </>
  );
}

export default MyApp;
