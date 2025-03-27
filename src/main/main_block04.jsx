import { useEffect, useRef } from 'react';
import { gsap, ScrollTrigger } from 'gsap/all';
import contData from '../dataBox/serviceData.json';

gsap.registerPlugin(ScrollTrigger);

const MainBlock04 = () => {
    const sectionRef = useRef(null);
    const listRef = useRef(null);

    useEffect(() => {
        if (sectionRef.current && listRef.current) {
            const lis = listRef.current.children;

            // 부모 요소에 Pin 옵션 적용
            gsap.to(sectionRef.current, {
                scrollTrigger: {
                    trigger: sectionRef.current,
                    pin: true,
                    start: 'top top',
                    end: '+=1500', // 애니메이션 총 길이 늘림
                    scrub: 0.3,
                    markers: false,
                },
            });

            // 각 li 요소에 애니메이션 적용
            gsap.fromTo(lis, {
                autoAlpha: 0,
                y: 50,
            }, {
                autoAlpha: 1,
                y: 0,
                stagger: 0.2, // 각 요소가 0.2초 간격으로 등장
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: 'top 50%',
                    end: 'bottom 10%',
                    scrub: true,
                    markers: false,
                    toggleActions: 'play none none reset', // 애니메이션을 반복하지 않도록 설정
                },
                duration: 1,
                ease: 'power2.out', // 애니메이션의 속도와 효과 강화
            });
        }
    }, []);

    return (
        <section ref={sectionRef} className='main_block04'>
            <article>
                <h1>무상으로 제공하는 최상의 서비스</h1>
                <div className="cont_box">
                    <ul ref={listRef}>
                        {contData.map((item, index) => (
                            <li key={index}>
                                <div className='info_box'><i className='icon icon_check'>icon_check</i><p>{item.info}</p></div>
                                <div className='s_info_box'><p dangerouslySetInnerHTML={{ __html: item.s_info }}></p></div>
                            </li>
                        ))}
                    </ul>
                </div>
            </article>
        </section>
    );
};

export default MainBlock04;