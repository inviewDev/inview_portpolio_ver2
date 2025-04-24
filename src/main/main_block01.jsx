import { useEffect } from 'react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { TextPlugin } from 'gsap/TextPlugin';
import { useMediaQuery } from 'react-responsive';
import gsap from 'gsap';
import main_top_img from '../assets/main_top_img.webp';

gsap.registerPlugin(ScrollTrigger, TextPlugin);

const MainBlock01 = () => {
  const isMobile = useMediaQuery({ maxWidth: 768 });

  useEffect(() => {
    const section = document.querySelector('.main_block01');
    const main01_h1 = section?.querySelector('h1');
    const main01_img = section?.querySelector('img');
    const main01_dimme = section?.querySelector('.dimmed_Box');
    const inqBtn = section?.querySelector('.inq_btn');
    const scrollIndicator = document.querySelector('.scroll_indi');

    if (section && main01_h1 && main01_img && main01_dimme && inqBtn) {
      const createLetterSpans = (line) => {
        return line.split('').map((char) => {
          if (char === ' ') return char;
          const randomY = Math.random() * (isMobile ? 50 - 5 : 200 - 10) + (isMobile ? 5 : 10);
          return `<span class="letter" style="display: inline-block; opacity: 0; transform: translateY(-${randomY}px);">${char}</span>`;
        }).join('');
      };

      let lines;
      if (isMobile) {
        lines = ['저렴한 비용의', ' 고퀄리티 홈페이지,', '아이앤뷰에선', '가능합니다.'];
      } else {
        lines = ['저렴한 비용의 고퀄리티 홈페이지,', '아이앤뷰에선 가능합니다.'];
      }

      main01_h1.innerHTML = lines.map(line => createLetterSpans(line)).join('<br/>');

      // 초기 상태 설정
      const letters = main01_h1.querySelectorAll('.letter');
      gsap.set(letters, { opacity: 0 });
      gsap.set(main01_img, { xPercent: -50, opacity: 0, y: -100 });
      gsap.set(main01_dimme, { opacity: 0, y: -100 });
      gsap.set(inqBtn, { opacity: 0 });
      if (scrollIndicator) gsap.set(scrollIndicator, { opacity: 0 });

      ScrollTrigger.create({
        trigger: section,
        start: 'top 20%',
        onEnter: () => {
          gsap.to(letters, {
            opacity: 1,
            y: 0,
            delay: 0.5,
            duration: isMobile ? 0.5 : 0.8,
            ease: 'power2.out'
          });

          gsap.to(main01_dimme, {
            opacity: 1,
            y: 0,
            duration: 1,
            ease: 'power2.out'
          });

          gsap.to(main01_img, {
            opacity: 1,
            y: 0,
            duration: 1.5,
            ease: 'power3.out'
          });

          gsap.to(inqBtn, { opacity: 1, duration: 1, delay: 0.8, ease: 'back.out(1.7)' });

          if (scrollIndicator) {
            const indicatorTl = gsap.timeline();
            indicatorTl.to(scrollIndicator, { opacity: 1, duration: 1.5 })
                      .to(scrollIndicator, { y: -10, repeat: -1, yoyo: true, duration: 1 }, 0);
          }
        },
        markers: false 
      });

      return () => {
        ScrollTrigger.getAll().forEach(t => t.kill());
        gsap.killTweensOf([letters, main01_img, main01_dimme, inqBtn, scrollIndicator]);
      };
    }
  }, [isMobile]);

  return (
    <section className="main_block01">
      <article>
        <h1></h1>
        <div className="inq_btn">
          <a href="https://forms.gle/FeC6sM6S1zm25F4Q7" target="_blank" rel="noreferrer">
            실시간 제작문의
          </a>
        </div>
      </article>
      <div className="dimmed_Box"></div>
      <img src={main_top_img} alt="메인 이미지" style={{ display: 'block' }} />
      <div className="scroll_indi">
        <span>Scroll</span>
      </div>
    </section>
  );
};

export default MainBlock01;