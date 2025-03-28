import { useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { TextPlugin } from 'gsap/TextPlugin';
import main_top_img from '../assets/main_top_img.webp';
import { Scrollbar } from 'smooth-scrollbar-react';

gsap.registerPlugin(ScrollTrigger, TextPlugin);

const MainBlock01 = () => {
  useEffect(() => {
    const section = document.querySelector('.main_block01');
    const main01_h1 = section?.querySelector('h1');
    const main01_img = section?.querySelector('img');
    const main01_dimme = section?.querySelector('.dimmed_Box');
    const inqBtn = section?.querySelector('.inq_btn');

    if (section && main01_h1 && main01_img && main01_dimme && inqBtn) {
      const createLetterSpans = (line) => {
        return line.split('').map((char) => {
          const randomY = Math.random() * (200 - 10) + 10;
          return `<span class="letter" style="display: inline-block; opacity: 0; transform: translateY(-${randomY}px);">${char}</span>`;
        }).join('');
      };

      const firstLine = '저렴한 비용의 고퀄리티 홈페이지,';
      const secondLine = '아이엔뷰에선 가능합니다.';
      const firstLineLetters = createLetterSpans(firstLine);
      const secondLineLetters = createLetterSpans(secondLine);
      main01_h1.innerHTML = `${firstLineLetters}<br/>${secondLineLetters}`;

      const timeline = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: 'top top',
          end: '+=2800',
          scrub: true,
          pin: true,
          pinSpacing: false,
          markers: false,
        },
      });

      const letterElementsFirstLine = main01_h1.querySelectorAll('.letter');
      letterElementsFirstLine.forEach((letter, index) => {
        timeline.to(letter, {
          opacity: 1,
          y: 0,
          duration: 0.5,
          delay: index * 0.1,
        }, 0);
      });

      ScrollTrigger.create({
        trigger: section,
        start: '+=2000',
        onEnter: () => {
          const letterElementsSecondLine = main01_h1.querySelectorAll('.letter');
          letterElementsSecondLine.forEach((letter, index) => {
            if (index >= letterElementsFirstLine.length) {
              gsap.to(letter, {
                opacity: 1,
                y: 0,
                duration: 0.5,
                delay: index * 0.1,
              });
            }
          });
        },
        markers: false,
      });

      gsap.set(main01_img, { opacity: 0, y: -100, xPercent: -50, scale: 2 });
      ScrollTrigger.create({
        trigger: section,
        start: '600',
        onEnter: () => {
          gsap.to(main01_img, {
            opacity: 1,
            y:0,
            xPercent: -50,
            scale: 1,
            duration: 1,
            ease: 'power2.out',
          });
        },
        markers: false,
      });

      gsap.set(main01_dimme, { opacity: 0, scale: 2 });
      ScrollTrigger.create({
        trigger: section,
        start: '500',
        onEnter: () => {
          gsap.to(main01_dimme, {
            opacity: 1,
            scale: 1,
            duration: 1,
          });
        },
        markers: false,
      });

      ScrollTrigger.create({
        trigger: section,
        start: 'bottom bottom',
        end: '+=2000',
        onLeaveBack: () => {
          gsap.to([main01_h1, main01_img, main01_dimme, inqBtn], {
            top: "0",
            scale: 1,
            opacity: 1,
            duration: 1,
            ease: 'power2.out',
          });
        },
        markers: false,
      });
      return () => {
        ScrollTrigger.getAll().forEach(trigger => trigger.kill());
        timeline.kill();
      };
    }

    ScrollTrigger.refresh();
  }, []);

  return (
    <Scrollbar damping={0.01} speed={0.5} continuousScrolling={true}>
      <section className='main_block01'>
        <article>
          <h1></h1>
          <div className='inq_btn'>
            <a href="https://forms.gle/FeC6sM6S1zm25F4Q7" target='_blank'>실시간 제작문의</a>
          </div>
        </article>
        <div className="dimmed_Box"></div>
        <img src={main_top_img} alt="메인 이미지" style={{ display: 'block' }}/>
      </section>
    </Scrollbar>
  );
};

export default MainBlock01;