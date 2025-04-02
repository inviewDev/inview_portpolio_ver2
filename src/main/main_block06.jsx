import { useMediaQuery } from 'react-responsive';
import { useEffect, useState, useCallback, useMemo } from 'react';
import portData from '../dataBox/portData.json';

const MainBlock06 = () => {
    const [scales, setScales] = useState([]);
    const [visibleCount, setVisibleCount] = useState(12);
    const [loadedUrls, setLoadedUrls] = useState({});
    const isPC = useMediaQuery({ query: '(min-width: 1025px)' });
    const isTa = useMediaQuery({ query: '(min-width: 769px) and (max-width: 1024px)' });
    const isMo = useMediaQuery({ query: '(max-width: 768px)' });

    const debounce = (func, wait) => {
        let timeout;
        return (...args) => {
            clearTimeout(timeout);
            timeout = setTimeout(() => func(...args), wait);
        };
    };

    const handleResize = useCallback(() => {
        const iframes = document.querySelectorAll('.iframe_wrapper iframe');
        const newScales = Array.from(iframes).map((iframe) => {
            const parentWidth = iframe.parentElement.offsetWidth;
            return parentWidth / 1920;
        });
        setScales(newScales);
    }, []);

    const debouncedResize = useMemo(() => debounce(handleResize, 100), [handleResize]);

    useEffect(() => {
        const timer = setTimeout(() => {
            handleResize();
        }, 0);
        window.addEventListener('resize', debouncedResize);
        return () => {
            clearTimeout(timer);
            window.removeEventListener('resize', debouncedResize);
        };
    }, [debouncedResize, handleResize]);

    useEffect(() => {
        const handle = requestAnimationFrame(() => {
            handleResize();
        });
        return () => cancelAnimationFrame(handle);
    }, [visibleCount, handleResize]);

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

        const newItems = document.querySelectorAll('.portCont li:not([data-observed])');
        newItems.forEach((li) => {
            li.dataset.observed = 'true';
            observer.observe(li);
        });

        return () => observer.disconnect();
    }, [visibleCount]);

    const loadMore = () => {
        setVisibleCount((prev) => {
            if (isPC) return prev + 4;
            if (isTa) return prev + 3;
            if (isMo) return prev + 2;
            return prev;
        });
    };

    const getProxyUrl = (originalUrl) => {
        return `/proxy-iframe.html?url=${encodeURIComponent(originalUrl)}`;
    };

    if (!portData.length) {
        return (
            <section className="main_block06">
                <article>
                    <h1>포트폴리오</h1>
                    <div>포트폴리오 데이터가 없습니다.</div>
                </article>
            </section>
        );
    }

    return (
        <section className="main_block06">
            <article>
                <h1>포트폴리오</h1>
                <div className="portCont">
                    <ul>
                        {portData.slice(0, visibleCount).map((item, index) => (
                            <li key={index} data-index={index}>
                                <div className="iframe_wrapper">
                                    {!loadedUrls[index] && (
                                        <div className="loading">로딩 중...</div>
                                    )}
                                    <a href={item.url} target="_blank" rel="noreferrer">
                                        <iframe
                                            src={loadedUrls[index] ? getProxyUrl(item.url) : ''}
                                            style={{
                                                transform: `scale(${scales[index] || 1})`,
                                                transformOrigin: '0 0',
                                                display: loadedUrls[index] ? 'block' : 'none',
                                                width: '1920px',
                                            }}
                                            title={item.descript}
                                            onError={() => console.log(`Failed to load iframe ${index}`)}
                                        />
                                    </a>
                                </div>
                                <p className="name">{item.name}</p>
                            </li>
                        ))}
                    </ul>
                </div>
                {visibleCount < portData.length && (
                    <button
                        onClick={loadMore}
                        className="loadMore"
                        aria-label="더 많은 포트폴리오 항목 보기"
                    >
                        더보기
                    </button>
                )}
            </article>
        </section>
    );
};

export default MainBlock06;