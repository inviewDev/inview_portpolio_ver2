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

            const split = new SplitType(h1Element);

            gsap.set(split.chars, { opacity: 0, y: 20 });
            gsap.set(lis, { autoAlpha: 0, y: 50 });

            ScrollTrigger.create({
                trigger: sectionRef.current,
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
                    gsap.to(lis, {
                        autoAlpha: 1,
                        y: 0,
                        duration: 1,
                        stagger: 0.2,
                        ease: "power2.out"
                    });
                }
            });

            return () => {
                ScrollTrigger.getAll().forEach(t => t.kill());
                gsap.killTweensOf(split.chars);
                gsap.killTweensOf(lis);
                split.revert();
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