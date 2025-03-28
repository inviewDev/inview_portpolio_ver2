import { useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import mainB_img01 from '../assets/mainB_img01.webp';
import mainB_img02 from '../assets/mainB_img02.webp';
import mainB_img03 from '../assets/mainB_img03.webp';
import mainB_img04 from '../assets/mainB_img04.webp';
import mainB_img05 from '../assets/mainB_img05.webp';
import mainB_img06 from '../assets/mainB_img06.webp';
import mainB_img07 from '../assets/mainB_img07.webp';
import mainB_img08 from '../assets/mainB_img08.webp';

const images = [
  mainB_img01,
  mainB_img02,
  mainB_img03,
  mainB_img04,
  mainB_img05,
  mainB_img06,
  mainB_img07,
  mainB_img08,
];

const txt_P = [
  '카페24 솔루션으로 손쉽게 관리 가능한 홈페이지',
  'PC, 모바일 어떤 기기에도 반응하는 반응형 홈페이지',
  '더 많은 가입자를 끌어들이는 간편한 소셜 로그인 기능',
  '검색엔진에 상위 노출 될 수 있는 SEO 최적화 작업 제공',
  '강력하고 쉬운 유지보수 도구로 관리가 쉽고 간단한 수정이 가능',
  '방문자 통계, 쇼핑몰 매출 등 통계 기능을 기본으로 지원',
  '구글 Ads 전환추적/애널리틱스 등 전환추적 리타게팅 관리도구 작업',
  '네이버, Kakao 채널톡 등의 상담 바로가기 기능 제공',
];

const MainBlock02 = () => {
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const section = document.querySelector('.main_block02');
    const mainBlock01 = document.querySelector('.main_block01');
    const h2Element = document.querySelector('.txt_box h2');
    const pElement = document.querySelector('.txt_box p');

    if (section && mainBlock01 && h2Element && pElement) {
      try {
        const mainBlock01Height = 2900;
        ScrollTrigger.create({
          trigger: section,
          start: `top+=${mainBlock01Height} top`,
          end: 'bottom bottom',
          onEnter: () => {
            gsap.from(section, {
              opacity: 0,
              y: 50,
              duration: 1,
              ease: 'power2.out',
            });
          },
          markers: false,
        });

        // h2와 p에 Parallax 효과 추가
        gsap.set(h2Element, { opacity: 0, y: 20 });
        gsap.set(pElement, { opacity: 0, y: 20 });

        gsap.to(h2Element, {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: h2Element,
            start: 'top 80%',
            end: 'bottom 20%',
            toggleActions: 'play none none reverse',
            once: true,
          },
        });

        gsap.to(pElement, {
          opacity: 1,
          y: 0,
          duration: 0.8,
          delay: 0.2, // h2 애니메이션 후에 실행되도록 delay 설정
          ease: 'power2.out',
          scrollTrigger: {
            trigger: pElement,
            start: 'top 80%',
            end: 'bottom 20%',
            toggleActions: 'play none none reverse',
            once: true,
          },
        });

        const listItems = section.querySelectorAll('.img_box ul li');
        listItems.forEach((item, index) => {
          gsap.set(item, { opacity: 0, y: 20 });

          gsap.to(item, {
            opacity: 1,
            y: 0,
            duration: 0.8,
            delay: index * 0.1,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: item,
              start: 'top 80%',
              end: 'bottom 20%',
              toggleActions: 'play none none reverse',
              once: true,
            },
          });
        });
      } catch (error) {
        console.error('Error occurred:', error);
      }
    }
  }, []);

  return (
    <section className='main_block02'>
      <article>
        <div className="txt_box">
          <h2>아이앤뷰를 이용해야하는 이유</h2>
          <p>아이앤뷰커뮤니케이션의 전문 개발자, 디자이너와 함께 <br />성공적인 웹사이트를 제작해보세요.</p>
        </div>
        <div className="img_box">
          <ul>
            {images.map((img, index) => (
              <li key={index}>
                <img src={img} alt={`Main Image ${index + 1}`} />
                <p>{txt_P[index]}</p>
              </li>
            ))}
          </ul>
        </div>
      </article>
    </section>
  );
};

export default MainBlock02;