import { useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { TextPlugin } from 'gsap/TextPlugin';
import main_top_img from '../assets/main_top_img.webp';

gsap.registerPlugin(ScrollTrigger, TextPlugin);

const MainBlock01 = () => {
  useEffect(() => {
    const section = document.querySelector('.main_block01');
    const main01_h1 = section?.querySelector('h1');
    const main01_img = section?.querySelector('img');
    const main01_dimme = section?.querySelector('.dimmed_Box');
    const inqBtn = section?.querySelector('.inq_btn');
    const scrollIndicator = document.querySelector('.scroll_indi');

    if (section && main01_h1 && main01_img && main01_dimme && inqBtn) {
      // 1. 텍스트 문자 단위 애니메이션
      const createLetterSpans = (line) => {
        return line.split('').map((char) => {
          const randomY = Math.random() * (200 - 10) + 10;
          return `<span class="letter" style="display: inline-block; opacity: 0; transform: translateY(-${randomY}px);">${char}</span>`;
        }).join('');
      };

      const firstLine = '저렴한 비용의 고퀄리티 홈페이지,';
      const secondLine = '아이엔뷰에선 가능합니다.';
      main01_h1.innerHTML = `${createLetterSpans(firstLine)}<br/>${createLetterSpans(secondLine)}`;

      // 2. 메인 타임라인 설정
      const timeline = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: 'top top',
          end: '+=2000',
          scrub: true,
          pin: true,
          pinSpacing: false
        }
      });

      // 3. 텍스트 애니메이션
      const letters = main01_h1.querySelectorAll('.letter');
      letters.forEach((letter, index) => {
        timeline.to(letter, {
          opacity: 1,
          y: 0,
          duration: 0.5,
          delay: index * 0.1
        }, index < firstLine.length ? 0 : 1.5);
      });

      // 4. 이미지 & 디머드 박스 애니메이션
      gsap.set([main01_img, main01_dimme], { 
        opacity: 0, 
        y: -100 
      });

      timeline.to(main01_dimme, {
        opacity: 1,
        y: 0,
        duration: 1
      }, 0.5).to(main01_img, {
        opacity: 1,
        y: 0,
        duration: 1.5,
        ease: 'power3.out'
      }, 0.8);

      // 5. 버튼 애니메이션
      gsap.set(inqBtn, { opacity: 0 });
      ScrollTrigger.create({
        trigger: inqBtn,
        start: '600',
        onEnter: () => {
          gsap.to(inqBtn, {
            opacity: 1,
            duration: 1,
            ease: 'back.out(1.7)'
          });
        }
      });

      // 6. 스크롤 유도 텍스트 애니메이션
      if (scrollIndicator) {
        const indicatorTl = gsap.timeline({ 
          delay: 2 
        });
        indicatorTl
          .to(scrollIndicator, { 
            opacity: 1, 
            duration: 1.5 
          })
          .to(scrollIndicator, { 
            y: -10, 
            repeat: -1, 
            yoyo: true, 
            duration: 1
          }, 0);

        ScrollTrigger.create({
          trigger: section,
          start: 'top top',
          end: '+=100',
          onEnter: () => gsap.to(scrollIndicator, { 
            duration: 0.8 
          }),
        });
      }

      // 7. 클린업 함수
      return () => {
        ScrollTrigger.getAll().forEach(t => t.kill());
        timeline.kill();
        if (scrollIndicator) gsap.killTweensOf(scrollIndicator);
      };
    }
  }, []);

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
      
      {/* 스크롤 유도 텍스트 추가 */}
      <div className="scroll_indi">
        <span>Scroll</span>
      </div>
    </section>
  );
};

export default MainBlock01;