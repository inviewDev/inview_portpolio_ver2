import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const ServiceIntroduction = () => {
    return (
        <section className='sub_p001'>
            <article>
                <sub>서비스소개</sub>
            </article>
        </section>
    );
};

export default ServiceIntroduction;