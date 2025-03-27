import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import contData from '../dataBox/contData.json';

const MainBlock03 = () => {
    const sectionRef = useRef(null);

    useEffect(() => {
        gsap.registerPlugin(ScrollTrigger);
        const ctx = gsap.context(() => {
            const section = sectionRef.current;
            const parLis = gsap.utils.toArray('.main_block03 li.par_li');
            const scrollDistance = 3000; // 총 스크롤 길이
            const partLength = scrollDistance / parLis.length; // 750px (4등분)

            // 각 par_li에 대해 ScrollTrigger 설정
            parLis.forEach((li, index) => {
                const startPos = index * partLength; // 0, 750, 1500, 2250
                const endPos = startPos + partLength; // 750, 1500, 2250, 3000

                gsap.from(li, {
                    opacity: 0,
                    y: 100,
                    scale: 0.8,
                    duration: 1,
                    scrollTrigger: {
                        trigger: section,
                        start: `${startPos}px top`, // 750px마다 시작
                        end: `${endPos}px top`, // 다음 시작점에서 종료
                        scrub: true, // 스크롤과 연동
                        markers: true, // 디버깅용 (배포 시 false)
                        onEnter: () => {
                            gsap.to(li, { 
                                opacity: 1, 
                                y: 0, 
                                scale: 1,
                                ease: "back.out(1.2)" // 탄성 효과
                            });
                        },
                        onLeaveBack: () => {
                            gsap.to(li, { 
                                opacity: 0, 
                                y: 100, 
                                scale: 0.8 
                            });
                        }
                    }
                });
            });

            // 섹션 높이 강제 설정 (3000px)
            gsap.set(section, { height: scrollDistance });

        }, sectionRef);

        return () => ctx.revert();
    }, []);

    return (
        <section className='main_block03' ref={sectionRef}>
            <article>
                <h1>어디서도 볼 수 없는 저렴한 비용</h1>
                <div className="img_box">
                    <ul>
                        {contData.map((item) => (
                            <li 
                                key={item.id} 
                                className={item.isAnimated ? 'par_li' : ''}
                            >
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
            </article>
        </section>
    );
};

export default MainBlock03;