import { useEffect, useRef, useState } from 'react';
import portData from '../dataBox/portData.json';

const MainBlock05 = () => {
    const iframeRef = useRef(null);
    const [scale, setScale] = useState(1);
    const [visibleCount, setVisibleCount] = useState(12); // 처음에 보이는 항목 수

    const handleResize = () => {
        if (iframeRef.current) {
            const parentWidth = iframeRef.current.parentElement.offsetWidth;
            const targetWidth = 1920; // 원래 사이트의 폭
            const targetHeight = 1080; // 원래 사이트의 높이
            const scaleWidth = parentWidth / targetWidth;
            const scaleHeight = 270 / targetHeight; // li 높이에 맞춤

            setScale(Math.min(scaleWidth, scaleHeight)); // 작은 값으로 설정
        }
    };

    useEffect(() => {
        handleResize();
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const loadMore = () => {
        setVisibleCount(prevCount => prevCount + 4);
    };

    return (
        <section className='main_block06'>
            <article>
                <h1>포트폴리오</h1>
                <div className='portCont'>
                    <ul>
                        {portData.slice(0, visibleCount).map((item, index) => (
                            <li key={index}>
                                <div>
                                    <iframe
                                        ref={iframeRef}
                                        src={item.url}
                                        style={{ transform: `scale(${scale})`, }}
                                        title={item.descript}
                                    />
                                </div>
                                <p className='name'>{item.name}</p>
                            </li>
                        ))}
                    </ul>
                </div>
                {visibleCount < portData.length && (
                    <button onClick={loadMore} className='loadMore'>
                        더보기
                    </button>
                )}
            </article>
        </section>
    );
};

export default MainBlock05;