import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import contData from '../dataBox/contData.json';

const MainBlock03 = () => {
const sectionRef = useRef(null);

useEffect(() => {
gsap.registerPlugin(ScrollTrigger);
const section = sectionRef.current;
const parLis = gsap.utils.toArray('.main_block03 li.par_li', section);
const totalScroll = parLis.reduce((acc, li) => acc + li.offsetHeight + 100, 0);

ScrollTrigger.create({
trigger: section,
start: "top top",
end: `+=${totalScroll}`,
pin: true,
scrub: 0.5,
markers: false,
toggleActions: 'play none none reset',
onUpdate: self => {
const progress = self.progress;

parLis.forEach((li, index) => {
const liProgress = gsap.utils.clamp(0, 1,
(progress - index * 0.2) * 3
);

if(liProgress > 0 && liProgress < 1) {
gsap.to(li, {
opacity: liProgress,
y: 100 - (100 * liProgress),
scale: 0.8 + (0.2 * liProgress),
ease: "power2.out"
});
}
});
}
});

return () => ScrollTrigger.getAll().forEach(t => t.kill());
}, []);

return (
<section className='main_block03' ref={sectionRef}>
<article>
<h1>어디서도 볼 수 없는 저렴한 비용</h1>
<div className="img_box">
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
</article>
</section>
);
};

export default MainBlock03;