import { useMediaQuery } from 'react-responsive';
import { useEffect, useRef, useState } from 'react';
import React from 'react';
import portData from '../dataBox/portData.json';

const MainBlock05 = () => {
    const iframeRefs = useRef([]);
    const [scales, setScales] = useState([]);
    const [visibleCount, setVisibleCount] = useState(12);
    const [loadedUrls, setLoadedUrls] = useState({});
    const [isLoading, setIsLoading] = useState({});
    const isPC = useMediaQuery({ query: '(min-width: 1025px)' });
    const isTa = useMediaQuery({ query: '(min-width: 769px) and (max-width: 1024px)' });
    const isMo = useMediaQuery({ query: '(max-width: 768px)' });

    // 디바운싱 함수
    const debounce = (func, wait) => {
        let timeout;
        return (...args) => {
            clearTimeout(timeout);
            timeout = setTimeout(() => func(...args), wait);
        };
    };

    const handleResize = () => {
        const newScales = new Array(visibleCount).fill(1); // visibleCount 크기로 초기화
        for (let i = 0; i < visibleCount; i++) {
            const ref = iframeRefs.current[i];
            if (ref.current) {
                const parentWidth = ref.current.parentElement.offsetWidth;
                const targetWidth = 1920;
                newScales[i] = parentWidth / targetWidth;
            }
        }
        setScales(newScales);
    };

    const debouncedResize = debounce(handleResize, 100);

    // iframeRefs와 scales 초기화 및 동적 확장
    useEffect(() => {
        // visibleCount에 맞게 iframeRefs와 scales 확장
        const newRefs = [...iframeRefs.current];
        for (let i = newRefs.length; i < visibleCount; i++) {
            newRefs[i] = React.createRef();
        }
        iframeRefs.current = newRefs;

        // DOM 렌더링 후 handleResize 호출
        const timer = setTimeout(() => {
            handleResize();
        }, 100); // DOM 렌더링 후 호출 보장

        return () => clearTimeout(timer);
    }, [visibleCount]);

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        const index = entry.target.dataset.index;
                        setLoadedUrls((prev) => ({ ...prev, [index]: true }));
                        setIsLoading((prev) => ({ ...prev, [index]: true }));
                        observer.unobserve(entry.target);
                    }
                });
            },
            { threshold: 0.1 }
        );

        document.querySelectorAll('.portCont li').forEach((li) => {
            observer.observe(li);
        });

        return () => observer.disconnect();
    }, [visibleCount]);

    useEffect(() => {
        const timer = setTimeout(() => {
            handleResize();
        }, 0);

        window.addEventListener('resize', debouncedResize);
        return () => {
            clearTimeout(timer);
            window.removeEventListener('resize', debouncedResize);
        };
    }, []);

    const loadMore = () => {
        setVisibleCount((prev) => {
            if (isPC) return prev + 4;
            if (isTa) return prev + 3;
            if (isMo) return prev + 2;
            return prev; // 기본값
        });
    };

    const getProxyUrl = (originalUrl) => {
        return `/proxy-iframe.html?url=${encodeURIComponent(originalUrl)}`;
    };

    return (
        <section className='main_block06'>
            <article>
                <h1>포트폴리오</h1>
                <div className='portCont'>
                    <ul>
                        {portData.slice(0, visibleCount).map((item, index) => (
                            <li key={index} data-index={index}>
                                <div className="iframe_wrapper">
                                    {isLoading[index] && !loadedUrls[index] && (
                                        <div className="loading">로딩 중...</div>
                                    )}
                                    <a href={item.url} target='_blank' rel="noreferrer">
                                        <iframe
                                            ref={iframeRefs.current[index]}
                                            src={loadedUrls[index] ? getProxyUrl(item.url) : ''}
                                            style={{
                                                transform: `scale(${scales[index] || 1})`,
                                                transformOrigin: '0 0',
                                                display: loadedUrls[index] ? 'block' : 'none',
                                            }}
                                            title={item.descript}
                                            onLoad={() =>
                                                setIsLoading((prev) => ({ ...prev, [index]: false }))
                                            }
                                        />
                                    </a>
                                </div>
                                <p className='name'>{item.name}</p>
                            </li>
                        ))}
                    </ul>
                </div>
                {visibleCount < portData.length && (
                    <button
                        onClick={loadMore}
                        className='loadMore'
                        aria-label="더 많은 포트폴리오 항목 보기"
                    >
                        더보기
                    </button>
                )}
            </article>
        </section>
    );
};

export default MainBlock05;