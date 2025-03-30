import { useEffect, useRef, useState } from 'react';
import portData from '../dataBox/portData.json';
import AOS from "aos";

import first from '../assets/first.svg';
import prev from '../assets/prev.svg';
import next from '../assets/next.svg';
import last from '../assets/last.svg';

const Portfolio = () => {
    const iframeRef = useRef(null);
    const [scale, setScale] = useState(1);
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 12;

    const totalPages = Math.ceil(portData.length / itemsPerPage);
    
    const goToPage = (page) => {
        setCurrentPage(Math.max(1, Math.min(page, totalPages)));
    };

    const handleResize = () => {
        if (iframeRef.current) {
            const parentWidth = iframeRef.current.parentElement.offsetWidth;
            const targetWidth = 1920;
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
    
    const renderPageNumbers = () => {
        const pageNumbers = [];
        if (totalPages <= 5) {
            for (let i = 1; i <= totalPages; i++) {
                pageNumbers.push(i);
            }
        } else {
            if (currentPage <= 3) {
                pageNumbers.push(1, 2, 3, 4, '...', totalPages);
            } else if (currentPage >= totalPages - 2) {
                pageNumbers.push(1, '...', totalPages - 3, totalPages - 2, totalPages - 1, totalPages);
            } else {
                pageNumbers.push(1, '...', currentPage - 1, currentPage, currentPage + 1, '...', totalPages);
            }
        }
        return pageNumbers;
    };
    
    return (
        <section className='sub_p003'>
            <article>
                <div className="sub_tit" data-aos="fade-down">
                    <sub>포트폴리오</sub>
                </div>
                <div className='sampleCont'>
                    <ul>
                        {portData.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage).map((item) => (
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
                    <button className='mBtn' onClick={() => goToPage(1)} disabled={currentPage === 1}>
                        <img src={first} alt={first} />
                    </button>
                    <button className='mBtn' onClick={() => goToPage(currentPage - 1)} disabled={currentPage === 1}>
                        <img src={prev} alt={prev} />
                    </button>
                    <div className='numBox'>
                        {renderPageNumbers().map((number, index) =>
                            typeof number === 'number' ? (
                                <button
                                    key={index}
                                    onClick={() => goToPage(number)}
                                    className={number === currentPage ? 'active' : ''}
                                >
                                    {number}
                                </button>
                            ) : (
                                <span key={index} className="dots">...</span>
                            )
                        )}
                    </div>
                    <button className='mBtn' onClick={() => goToPage(currentPage + 1)} disabled={currentPage === totalPages}>
                        <img src={next} alt={next} />
                    </button>
                    <button className='mBtn' onClick={() => goToPage(totalPages)} disabled={currentPage === totalPages}>
                        <img src={last} alt={last} />
                    </button>
                </div>
            </article>
        </section>
    );
};

export default Portfolio;