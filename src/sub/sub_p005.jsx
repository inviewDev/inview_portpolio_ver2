import { useEffect, useState, useCallback, useMemo } from 'react';
import portData from '../dataBox/portData.json';
import AOS from "aos";
import "aos/dist/aos.css"; // AOS 스타일 임포트 (필요 시)

import first from '../assets/first.svg';
import prev from '../assets/prev.svg';
import next from '../assets/next.svg';
import last from '../assets/last.svg';

const Portfolio = () => {
    const [scales, setScales] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [loadedUrls, setLoadedUrls] = useState({});
    const itemsPerPage = 12;

    const totalPages = Math.ceil(portData.length / itemsPerPage);

    const debounce = (func, wait) => {
        let timeout;
        return (...args) => {
            clearTimeout(timeout);
            timeout = setTimeout(() => func(...args), wait);
        };
    };

    const handleResize = useCallback(() => {
        const iframes = document.querySelectorAll('.sampleCont .iframe_wrapper iframe');
        const newScales = Array.from(iframes).map((iframe) => {
            const parentWidth = iframe.parentElement.offsetWidth;
            return parentWidth / 1920;
        });
        setScales(newScales);
    }, []);

    const debouncedResize = useMemo(() => debounce(handleResize, 100), [handleResize]);

    // 초기 로드 및 리사이즈 이벤트
    useEffect(() => {
        AOS.init();
        const timer = setTimeout(() => {
            handleResize();
        }, 0);
        window.addEventListener('resize', debouncedResize);
        return () => {
            clearTimeout(timer);
            window.removeEventListener('resize', debouncedResize);
        };
    }, [debouncedResize, handleResize]);

    // 페이지 변경 시 scale 재계산
    useEffect(() => {
        AOS.init();
        const handle = requestAnimationFrame(() => {
            handleResize();
        });
        return () => cancelAnimationFrame(handle);
    }, [currentPage, handleResize]);

    // Intersection Observer로 지연 로딩
    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        const index = entry.target.dataset.index;
                        setLoadedUrls((prev) => ({ ...prev, [index]: true }));
                        observer.unobserve(entry.target);
                    }
                });
            },
            { threshold: 0.1 }
        );

        const newItems = document.querySelectorAll('.sampleCont li:not([data-observed])');
        newItems.forEach((li) => {
            li.dataset.observed = 'true';
            observer.observe(li);
        });

        return () => observer.disconnect();
    }, [currentPage]);

    const goToPage = (page) => {
        setCurrentPage(Math.max(1, Math.min(page, totalPages)));
    };

    const getProxyUrl = (originalUrl) => {
        return `/proxy-iframe.html?url=${encodeURIComponent(originalUrl)}`;
    };

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

    if (!portData.length) {
        return (
            <section className="sub_p003">
                <article>
                    <div className="sub_tit" data-aos="fade-down">
                        <sub>포트폴리오</sub>
                    </div>
                    <div>포트폴리오 데이터가 없습니다.</div>
                </article>
            </section>
        );
    }

    return (
        <section className="sub_p003">
            <article>
                <div className="sub_tit" data-aos="fade-down">
                    <sub>포트폴리오</sub>
                </div>
                <div className="sampleCont">
                    <ul>
                        {portData
                            .slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage)
                            .map((item, index) => {
                                const globalIndex = (currentPage - 1) * itemsPerPage + index; // 페이지 내 고유 인덱스
                                return (
                                    <li key={item.url} data-index={globalIndex}>
                                        <div className="iframe_wrapper">
                                            {!loadedUrls[globalIndex] && (
                                                <div className="loading">로딩 중...</div>
                                            )}
                                            <a href={item.url} target="_blank" rel="noopener noreferrer">
                                                <iframe
                                                    src={loadedUrls[globalIndex] ? getProxyUrl(item.url) : ''}
                                                    style={{
                                                        transform: `scale(${scales[index] || 1})`,
                                                        transformOrigin: '0 0',
                                                        display: loadedUrls[globalIndex] ? 'block' : 'none',
                                                        width: '1920px'
                                                    }}
                                                    title={item.descript}
                                                    onError={() => console.log(`Failed to load iframe ${globalIndex}`)}
                                                />
                                            </a>
                                        </div>
                                        <p className="name">{item.name}</p>
                                    </li>
                                );
                            })}
                    </ul>
                </div>
                <div className="pagination" data-aos="fade-up">
                    <button className="mBtn" onClick={() => goToPage(1)} disabled={currentPage === 1}>
                        <img src={first} alt="First page" />
                    </button>
                    <button className="mBtn" onClick={() => goToPage(currentPage - 1)} disabled={currentPage === 1}>
                        <img src={prev} alt="Previous page" />
                    </button>
                    <div className="numBox">
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
                    <button className="mBtn" onClick={() => goToPage(currentPage + 1)} disabled={currentPage === totalPages}>
                        <img src={next} alt="Next page" />
                    </button>
                    <button className="mBtn" onClick={() => goToPage(totalPages)} disabled={currentPage === totalPages}>
                        <img src={last} alt="Last page" />
                    </button>
                </div>
            </article>
        </section>
    );
};

export default Portfolio;