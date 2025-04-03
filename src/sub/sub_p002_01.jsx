import { useEffect, useRef } from 'react';
import { useMediaQuery } from 'react-responsive';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Pagination, A11y } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import subData01 from '../dataBox/subData01.json';

import 'swiper/css';
import 'swiper/css/pagination';

const SubP00102 = () => {
  const isPC = useMediaQuery({ query: '(min-width: 1025px)' });
  const isMobile = useMediaQuery({ query: '(max-width: 1024px)' });

  const sectionRef = useRef(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const section = sectionRef.current;
    if (!section) return;
    const parLis = gsap.utils.toArray('.price_option_box li.par_li', section);

    try {
      ScrollTrigger.create({
        trigger: section,
        start: 'top 30%',
        toggleActions: 'play none none reset',
        onEnter: () => {
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
      gsap.set(parLis, { opacity: 0, y: 100, scale: 0.8 });

    } catch (error) {
      console.error('Error occurred:', error);
    }

    return () => ScrollTrigger.getAll().forEach(t => t.kill());
  }, []);

  return (
    <section className='price_option_box' ref={sectionRef}>
      <article>
        {isPC && (
          <div className="img_box pc_view">
            <ul>
              {subData01.map((item, index) => (
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
              {subData01.map((item, index) => (
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

export default SubP00102;