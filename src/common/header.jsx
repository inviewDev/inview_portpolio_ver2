import { useEffect, useRef, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useMediaQuery } from 'react-responsive';
import logow_img from '../assets/logo/logo_w.svg';
import logo_img from '../assets/logo/logo.svg';
import m_menu from '../assets/m_menu.svg';
import m_menu_b from '../assets/m_menu_b.svg';
import { gsap } from 'gsap';

const Header = () => {
  const hasAnimated = useRef(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const isPC = useMediaQuery({ query: '(min-width: 769px)' });
  const isMobile = useMediaQuery({ query: '(max-width: 768px)' });
  const location = useLocation();

  useEffect(() => {
    const header = document.getElementById("header");

    const handleScroll = () => {
      const scrollY = window.scrollY;
      if (isPC) {
        if (scrollY >= 300 && !hasAnimated.current) {
          hasAnimated.current = true;
          header.classList.add('scrolled');
          gsap.to(header, {
            width: "calc(100% - 40px)",
            maxWidth: "1700px",
            duration: 1,
            ease: "elastic.inOut(1,0.75)",
            backgroundColor: "rgba(65, 65, 65, 0.7)",
            borderRadius: "50px",
            padding: "10px 20px",
            top: "10px",
          });
        } else if (scrollY < 500 && hasAnimated.current) {
          hasAnimated.current = false;
          header.classList.remove('scrolled');
          gsap.to(header, {
            width: "100%",
            maxWidth: "100%",
            duration: 1,
            ease: "elastic.inOut(1,1)",
            backgroundColor: "rgba(65, 65, 65, 0)",
            border: "none",
            borderRadius: "0",
            padding: "10px 20px",
            top: "0",
          });
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [isPC]);

  useEffect(() => {
    // 모바일 메뉴 닫기
    setIsMenuOpen(false);

    // 헤더 애니메이션 상태 초기화
    hasAnimated.current = false;
    const header = document.getElementById("header");
    if (header) {
      gsap.to(header, {
        width: "100%",
        maxWidth: "100%",
        duration: 0.5,
        backgroundColor: "rgba(38, 38, 38, 0.3)",
        border: "none",
        borderRadius: "0",
        padding: "10px 20px",
        top: "0",
      });
      header.classList.remove('scrolled');
    }

    // 스크롤 최상단 이동 (지연 추가로 렌더링 후 실행 보장)
    setTimeout(() => {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    }, 0);
  }, [location.pathname]);

  const handleMenuClick = () => {
    if (isMobile) {
      setIsMenuOpen(false);
    }
  };

  return (
    <header id="header">
      {isPC && (
        <div className="pc_nav_wrap">
          <div className='logo_wrap'>
            <Link to="/"><img src={logow_img} alt="아이앤뷰 로고" /></Link>
            <Link to="/"><img src={logo_img} alt="아이앤뷰 로고" /></Link>
          </div>
          <nav>
            <ul>
              <li><Link to="/ServiceIntroduction" onClick={handleMenuClick}>서비스소개</Link></li>
              <li><Link to="/WebsiteDesign" onClick={handleMenuClick}>홈페이지 디자인</Link></li>
              <li><Link to="/EcommerceDesign" onClick={handleMenuClick}>쇼핑몰 디자인</Link></li>
              <li><Link to="/Template" onClick={handleMenuClick}>템플릿</Link></li>
              <li><Link to="/Portfolio" onClick={handleMenuClick}>포트폴리오</Link></li>
              <li className='inq_btn'>
                <a href="https://forms.gle/FeC6sM6S1zm25F4Q7" target='_blank' rel="noreferrer" onClick={handleMenuClick}>
                  실시간 제작문의
                </a>
              </li>
            </ul>
          </nav>
        </div>
      )}
      {isMobile && (
        <div className="mo_nav_wrap">
          <div className='logo_wrap'>
            <Link to="/"><img src={logow_img} alt="아이앤뷰 로고" /></Link>
            <Link to="/"><img src={logo_img} alt="아이앤뷰 로고" /></Link>
          </div>
          <div className='ham_btn'>
            <button onClick={() => setIsMenuOpen(!isMenuOpen)}>
              menu
              <img src={m_menu} alt="메뉴 열기" />
              <img src={m_menu_b} alt="메뉴 열기" />
            </button>
          </div>
          <nav className={isMenuOpen ? 'open' : ''}>
            <ul>
              <li><Link to="/ServiceIntroduction" onClick={handleMenuClick}>서비스소개</Link></li>
              <li><Link to="/WebsiteDesign" onClick={handleMenuClick}>홈페이지 디자인</Link></li>
              <li><Link to="/EcommerceDesign" onClick={handleMenuClick}>쇼핑몰 디자인</Link></li>
              <li><Link to="/Template" onClick={handleMenuClick}>샘플</Link></li>
              <li><Link to="/Portfolio" onClick={handleMenuClick}>포트폴리오</Link></li>
              <li className='inq_btn'>
                <a href="https://forms.gle/FeC6sM6S1zm25F4Q7" target='_blank' rel="noreferrer" onClick={handleMenuClick}>
                  실시간 제작문의
                </a>
              </li>
            </ul>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;