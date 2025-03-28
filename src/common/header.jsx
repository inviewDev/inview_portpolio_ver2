import { Link } from 'react-router-dom';
import logo_img from '../assets/logo/logo_w.svg';
import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

const Header = () => {
  const hasAnimated = useRef(false);

  useEffect(() => {
    const header = document.getElementById('header');

    const handleScroll = () => {
      const scrollY = window.scrollY;

      if (scrollY >= 900 && !hasAnimated.current) {
        hasAnimated.current = true;
        gsap.to(header, {
          width: '100%',
          maxWidth: "900px",
          duration: 1,
          ease: "elastic.inOut(1,0.75)",
          backgroundColor: 'rgba(65 65 65,0.7)',
          borderRadius: '50px',
          padding: '10px 20px',
        });
      } else if (scrollY < 900 && hasAnimated.current) {
        hasAnimated.current = false;
        gsap.to(header, {
          width: '100%',
          maxWidth: "100%",
          duration: 0.8,
          ease: "elastic.inOut(1,1)",
          backgroundColor: 'rgba(65 65 65,0)',
          border: 'none',
          borderRadius: '50px',
          padding: '10px 20px',
        });
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <header id="header">
      <div className="pc_nav_wrap">
        <div className='logo_wrap'>
          <Link to="/"><img src={logo_img} alt="아이앤뷰 로고" /></Link>
        </div>
        <nav>
          <ul>
            <li><Link to="/ServiceIntroduction">서비스소개</Link></li>
            <li><Link to="/WebsiteDesign">홈페이지 디자인</Link></li>
            <li><Link to="/E-commerceWebsiteDesign">쇼핑몰 디자인</Link></li>
            <li><Link to="/Sample">샘플</Link></li>
            <li><Link to="/Portfolio">포트폴리오</Link></li>
            <li className='inq_btn'><a href="https://forms.gle/FeC6sM6S1zm25F4Q7" target='_blank'>실시간 제작문의</a></li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;