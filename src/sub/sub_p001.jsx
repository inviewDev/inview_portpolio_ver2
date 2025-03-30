import { useEffect, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper/modules';

import AOS from "aos";
import icon_img01 from '../assets/icon_img01.webp';
import icon_img02 from '../assets/icon_img02.webp';
import icon_img03 from '../assets/icon_img03.webp';
import icon_img04 from '../assets/icon_img04.webp';
import icon_img05 from '../assets/icon_img05.webp';
import subP01_img01 from '../assets/subP01_img01.webp';
import subP01_img02 from '../assets/subP01_img02.webp';
import icon_check_b from '../assets/icon_check_b.svg';
import subP01_symbol01 from '../assets/subP01_symbol01.webp';
import subP01_symbol02 from '../assets/subP01_symbol02.webp';
import subP01_symbol03 from '../assets/subP01_symbol03.webp';
import subP01_symbol04 from '../assets/subP01_symbol04.webp';
import subP01_symbol05 from '../assets/subP01_symbol05.webp';
import subP01_symbol06 from '../assets/subP01_symbol06.webp';

import 'swiper/css';
import "aos/dist/aos.css";

const slideData = [
    { image: icon_img01, text: '홈페이지를 만드려는데 예산이 많지 않아요. <br/>저렴하게 제작할 수 있을까요?' },
    { image: icon_img02, text: '급하게 홈페이지를 만들어야하는데 최대한 <br/>빨리 만들어주실 수 있나요?ㅠㅠ' },
    { image: icon_img03, text: '모바일 버전이 없어서 반응형 홈페이지를 <br/>만들고 싶어요.' },
    { image: icon_img04, text: '홈페이지를 만든지 오래돼서 유지보수가 너무 <br/>힘들어요!' },
    { image: icon_img05, text: '새로운 기능들을 넣은 트렌디한 홈페이지를 <br/>제작하고 싶어요.' },
];

const checkListData = [
    { text: '템플릿 홈페이지로 저렴한 비용과 빠른 제작 기간', icon: icon_check_b },
    { text: 'PC, 모바일 어디든 반응하는 반응형 홈페이지', icon: icon_check_b },
    { text: '전문 디자이너와 개발자가 한땀 한땀 만든 고퀄리티 홈페이지', icon: icon_check_b },
    { text: '국내 최대 규모 카페24 솔루션을 이용해 편리한 유지보수', icon: icon_check_b },
];

const procedureData = [
    { tit: '상담 및 견적안내', text: '전화나 이메일을 통해 <br/>자세한 상담', symbol: subP01_symbol01, num: "01", aos_d: "100" },
    { tit: '기획서 및 자료 전달', text: '기획서 및 자료 검토 후 <br/>전체적인 사이트를 기획', symbol: subP01_symbol02, num: "02", aos_d: "300" },
    { tit: '디자인 작업', text: '요청사항을 바탕으로 <br/>시안 작업', symbol: subP01_symbol03, num: "03", aos_d: "500" },
    { tit: '컨펌 및 수정', text: '디자인 시안에 대한 <br/>컨펌 및 수정사항 진행', symbol: subP01_symbol04, num: "04", aos_d: "700" },
    { tit: '퍼블리싱 작업', text: '시안을 기준으로 <br/>퍼블리싱 작업 착수', symbol: subP01_symbol05, num: "05", aos_d: "900" },
    { tit: '최종컨펌', text: '테스트 및 검수를 거친 후 <br/>홈페이지 오픈', symbol: subP01_symbol06, num: "06", aos_d: "1100" },
]

const ServiceIntroduction = () => {
    const [isLoaded, setIsLoaded] = useState(false);
    useEffect(() => {
        AOS.init();
        setIsLoaded(true);
    }, [])

    return (
        <section className='sub_p001'>
            <article>
                <div className="sub_tit" data-aos="fade-down">
                    <sub>서비스소개</sub>
                </div>
                <div className="supP01_spCont">
                    {isLoaded && (
                        <Swiper
                            spaceBetween={0}
                            slidesPerView={'auto'}
                            autoplay={{
                                delay: 1500,
                                disableOnInteraction: false,
                            }}
                            loop={true}
                            modules={[Autoplay]}
                        >
                            {slideData.map((slide, index) => (
                                <SwiperSlide key={index} className={`spCont_${index + 1}`}>
                                    <ul>
                                        <li className='txt_box'>
                                            <p dangerouslySetInnerHTML={{ __html: slide.text }} />
                                        </li>
                                        <li className='icon_img'><img src={slide.image} alt={slide.image} /></li>
                                    </ul>
                                </SwiperSlide>
                            ))}
                        </Swiper>
                    )}
                </div>
                <div className="supP01_mbox">
                    <ul>
                        <li className='img_box'>
                            <img data-aos="fade-down" data-aos-delay="100" src={subP01_img01} alt={subP01_img01} />
                            <img data-aos="fade-down" src={subP01_img02} alt={subP01_img02} />
                        </li>
                        <li className='txt_box'>
                            <h3 data-aos="fade-down">웹에 관한 모든 디자인에 <b>차별성</b>을 <br />
                                더해 <b>다름</b>을 만들어냅니다.</h3>
                            <ol data-aos="fade-down" data-aos-delay="200" >
                                {checkListData.map((item, index) => (
                                    <li key={index}>
                                        <p>
                                            <img src={item.icon} alt={item.icon} />
                                            {item.text}
                                        </p>
                                    </li>
                                ))}
                            </ol>
                        </li>
                    </ul>
                </div>
                <div className="supP01_tbox">
                    <div className="procedure_cont">
                        <h3 data-aos="fade-down">홈페이지 제작과정</h3>
                        <ul>
                            {procedureData.map((item, index) => (
                                <li key={index} data-aos="fade-down" data-aos-delay={item.aos_d}>
                                    <span>{item.num}</span>
                                    <div className="img_box"><img src={item.symbol} alt={item.symbol} /></div>
                                    <p>{item.tit}</p>
                                    <p dangerouslySetInnerHTML={{ __html: item.text }} />
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
                <div className='joinUs_cont'>
                        <h3>아이앤뷰커뮤니케이션과 함께하기</h3>
                        <span>저렴한 비용의 고퀄리티 홈페이지로 비즈니스 성공을 기원합니다.</span>
                        <div className="inq_btn">
                            <a href="https://forms.gle/FeC6sM6S1zm25F4Q7" target="_blank" rel="noreferrer">
                                실시간 제작문의
                            </a>
                        </div>
                    </div>
            </article>
        </section>
    );
};

export default ServiceIntroduction;