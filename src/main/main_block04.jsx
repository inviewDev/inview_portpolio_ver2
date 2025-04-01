import { useEffect, useRef } from 'react';
import { gsap, ScrollTrigger } from 'gsap/all';
import SplitType from 'split-type';
import contData from '../dataBox/serviceData.json';

gsap.registerPlugin(ScrollTrigger);

const MainBlock04 = () => {
    const sectionRef = useRef(null);
    const listRef = useRef(null);
    const h1Ref = useRef(null);

    useEffect(() => {
        if (sectionRef.current && listRef.current) {
            const lis = listRef.current.children;
            const section = sectionRef.current;
            if (!section) return;
            const h1Element = h1Ref.current;
            if (!h1Element) return;

            // SplitType으로 제목 텍스트 분리 및 초기 상태 설정
            const split = new SplitType(h1Element);
            gsap.set(split.chars, { opacity: 0, y: 20 }); // 초기 상태: 투명하고 위로 이동

            // 제목 애니메이션 (섹션 고정 추가)
            gsap.to(sectionRef.current, {
                scrollTrigger: {
                    trigger: sectionRef.current,
                    pin: true, // 섹션을 고정
                    start: 'top top', // 상단에서 시작
                    end: '+=1000', // 1000px 동안 고정
                    scrub: 0.3, // 스크롤에 따라 부드럽게 반응
                    markers: false,
                    onEnter: () => {
                        gsap.to(split.chars, {
                            opacity: 1,
                            y: 0,
                            duration: 0.5,
                            stagger: 0.1,
                            ease: "power2.out"
                        });
                    },
                },
            });

            // 리스트 아이템 애니메이션
            gsap.fromTo(lis, {
                autoAlpha: 0,
                y: 50,
            }, {
                autoAlpha: 1,
                y: 0,
                stagger: 0.2,
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: 'top 10%',
                    end: 'bottom 10%',
                    scrub: true,
                    markers: false,
                    toggleActions: 'play none none reset',
                },
                duration: 1,
                ease: 'power2.out',
            });

            // 클린업: 컴포넌트 언마운트 시 애니메이션 종료
            return () => {
                ScrollTrigger.getAll().forEach(t => t.kill()); // 모든 ScrollTrigger 종료
                gsap.killTweensOf(split.chars); // 제목 글자 애니메이션 종료
                gsap.killTweensOf(lis); // 리스트 아이템 애니메이션 종료
                split.revert(); // SplitType 원상복구
            };
        }
    }, []);

    return (
        <section ref={sectionRef} className='main_block04'>
            <article>
                <h1 ref={h1Ref}>무상으로 제공하는 최상의 서비스</h1>
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