import { useEffect, useRef } from 'react';
import { useMediaQuery } from 'react-responsive';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Pagination, A11y } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import SplitType from 'split-type';
import contData from '../dataBox/contData.json';

import 'swiper/css';
import 'swiper/css/pagination';

const MainBlock03 = () => {
  const isPC = useMediaQuery({ query: '(min-width: 1025px)' });
  const isMobile = useMediaQuery({ query: '(max-width: 1024px)' });

  const sectionRef = useRef(null);
  const h1Ref = useRef(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const section = sectionRef.current;
    if (!section) return;
    const h1Element = h1Ref.current;
    if (!h1Element) return;

    const split = new SplitType(h1Element);
    const parLis = gsap.utils.toArray('.main_block03 li.par_li', section);

    try {
      ScrollTrigger.create({
        trigger: section,
        start: 'top 30%',
        toggleActions: 'play none none reset',
        onEnter: () => {
          gsap.to(split.chars, {
            opacity: 1,
            y: 0,
            duration: 0.5,
            stagger: 0.1,
            ease: "power2.out"
          });
          gsap.to(parLis, {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.5,
            stagger: 0.2,
            ease: "power2.out"
          });
        }
      });
      gsap.set(split.chars, { opacity: 0, y: 20 });
      gsap.set(parLis, { opacity: 0, y: 100, scale: 0.8 });

    } catch (error) {
      console.error('Error occurred:', error);
    }

    return () => ScrollTrigger.getAll().forEach(t => t.kill());
  }, []);

  return (
    <section className='main_block03' ref={sectionRef}>
      <article>
        <h1 ref={h1Ref}>어디서도 볼 수 없는 저렴한 비용</h1>
        {isPC && (
          <div className="img_box pc_view">
            <ul>
              {contData.map((item, index) => (
                <li key={`${item.id}-${index}`} className='par_li'>
                  <div className={`top_cont ${item.grade}`}>
                    <p className='grade'>{item.grade}</p>
                    <ul className='price'>
                      <li className='p_cost'>{item.cost}</li>
                      <li className='p_sale'>{item.sale}</li>
                    </ul>
                    <span className='details'>{item.details}</span>
                    <ul className='pick'>
                      {item.pick.map((pick, pickIndex) => (
                        <li key={pickIndex} className={`pick_0${pickIndex + 1}`}>{pick}</li>
                      ))}
                    </ul>
                    <p className='option' dangerouslySetInnerHTML={{ __html: item.option }}></p>
                  </div>
                  <div className="bot_cont">
                    <ul>
                      <li className='pcs'><p>시안개수</p><span><i>{item.pcs}</i>개</span></li>
                      <li className='wdy'><p>작업일</p><span><i>{item.wdy}</i>일</span></li>
                      <li className='revis'><p>무료수정 횟수</p><span><i>{item.revis}</i>회</span></li>
                    </ul>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        )}
        {isMobile && (
          <div className="mo_view">
            <Swiper 
              modules={[Pagination, A11y]}
              spaceBetween={20}
              slidesPerView={'auto'}
              pagination={{ clickable: true }}
              className='img_box'>
              {contData.map((item, index) => (
                <SwiperSlide key={`${item.id}-${index}`} className='par_li'>
                  <div className={`top_cont ${item.grade}`}>
                    <p className='grade'>{item.grade}</p>
                    <ul className='price'>
                      <li className='p_cost'>{item.cost}</li>
                      <li className='p_sale'>{item.sale}</li>
                    </ul>
                    <span className='details'>{item.details}</span>
                    <ul className='pick'>
                      {item.pick.map((pick, pickIndex) => (
                        <li key={pickIndex} className={`pick_0${pickIndex + 1}`}>{pick}</li>
                      ))}
                    </ul>
                    <p className='option' dangerouslySetInnerHTML={{ __html: item.option }}></p>
                  </div>
                  <div className="bot_cont">
                    <ul>
                      <li className='pcs'><p>시안개수</p><span><i>{item.pcs}</i>개</span></li>
                      <li className='wdy'><p>작업일</p><span><i>{item.wdy}</i>일</span></li>
                      <li className='revis'><p>무료수정 횟수</p><span><i>{item.revis}</i>회</span></li>
                    </ul>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        )}
      </article>
    </section>
  );
};

export default MainBlock03;