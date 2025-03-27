import { useRef, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom';
import { CSSTransition, SwitchTransition } from "react-transition-group";
import './css/main.scss';
import Header from './common/header.jsx';
import Footer from './common/footer.jsx';
import Home from './main_home.jsx';
import ServiceIntroduction from './sub/sub_p001.jsx';
import WebsiteDesign from './sub/sub_p002.jsx';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

const routes = [
  { path: "/", name: "Home", Component: Home },
  { path: "/ServiceIntroduction", name: "Service Introduction", Component: ServiceIntroduction },
  { path: "/WebsiteDesign", name: "Website Design", Component: WebsiteDesign },
];

function App() {
  const location = useLocation();
  const nodeRef = useRef(null);

  useEffect(() => {
    ScrollTrigger.refresh();
    console.log('Route changed to:', location.pathname); // 디버깅
  }, [location.pathname]);

  return (
    <>
      <Header />
      <SwitchTransition>
        <CSSTransition
          nodeRef={nodeRef}
          key={location.key}
          timeout={600}
          classNames="page-transition"
          unmountOnExit
        >
          <div ref={nodeRef} className="page-container">
            <Routes location={location}>
              {routes.map(({ path, Component }) => (
                <Route path={path} key={path} element={<Component />} />
              ))}
            </Routes>
          </div>
        </CSSTransition>
      </SwitchTransition>
      <Footer />
    </>
  );
}

const AppWrapper = () => (
  <Router>
    <App />
  </Router>
);

export default AppWrapper;