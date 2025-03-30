import { useEffect, useRef, useState } from 'react';
import sampleData from '../dataBox/sampleData.json';
import AOS from "aos";

import first from '../assets/first.svg';
import prev from '../assets/prev.svg';
import next from '../assets/next.svg';
import last from '../assets/last.svg';

const Sample = () => {
    const iframeRef = useRef(null);
    const [scale, setScale] = useState(1);
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 12;

    // ✅ 총 페이지 수 계산
    const totalPages = Math.ceil(sampleData.length / itemsPerPage);
    
    // ✅ 페이지 변경 핸들러
    const goToPage = (page) => {
        setCurrentPage(Math.max(1, Math.min(page, totalPages)));
    };

    // ✅ MainBlock05와 동일한 스케일 계산 로직
    const handleResize = () => {
        if (iframeRef.current) {
            const parentWidth = iframeRef.current.parentElement.offsetWidth;
            const targetWidth = 1920; // 고정 너비 기준
            const targetHeight = 1080;
            const scaleWidth = parentWidth / targetWidth;
            const scaleHeight = 270 / targetHeight;

            setScale(Math.min(scaleWidth, scaleHeight));
        }
    };
    
    useEffect(() => {
        handleResize();
        window.addEventListener('resize', handleResize);
        AOS.init();
        return () => window.removeEventListener('resize', handleResize);
    }, []);
    
    // ✅ 페이지 번호 배열 생성
    const pageNumbers = Array.from({ length: totalPages }, (_, index) => index + 1);
    
    return (
        <section className='sub_p003'>
            <article>
                <div className="sub_tit" data-aos="fade-down">
                    <sub>샘플</sub>
                </div>
                <div className='sampleCont'>
                    <ul>
                        {sampleData.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage).map((item) => (
                            <li key={item.url}>
                                <div>
                                    <a href={item.url} target='_blank' rel="noopener noreferrer">
                                        <iframe
                                            ref={iframeRef}
                                            src={item.url}
                                            style={{ transform: `scale(${scale})`, }}
                                            title={item.descript}
                                        />
                                    </a>
                                </div>
                                <p className='name'>{item.name}</p>
                            </li>
                        ))}
                    </ul>
                </div>
                <div className='pagination' data-aos="fade-up">
                    <button className='mBtn' onClick={() => goToPage(1)} disabled={currentPage === 1}><img src={first} alt={first} /></button>
                    <button className='mBtn' onClick={() => goToPage(currentPage - 1)} disabled={currentPage === 1}><img src={prev} alt={prev} /></button>
                    <div className='numBox'>{pageNumbers.map((number) => (<button key={number}onClick={() => goToPage(number)}className={number === currentPage ? 'active' : ''}>{number}</button>))}</div>
                    <button className='mBtn' onClick={() => goToPage(currentPage + 1)}disabled={currentPage === totalPages}><img src={next} alt={next} /></button>
                    <button className='mBtn' onClick={() => goToPage(totalPages)}disabled={currentPage === totalPages}><img src={last} alt={last} /></button>
                </div>
            </article>
        </section>
    );
};

export default Sample;