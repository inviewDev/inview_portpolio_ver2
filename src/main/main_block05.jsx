import { useEffect } from 'react';
import mainB04_img01 from '../assets/mainB04_img01.webp';
import mainB04_img02 from '../assets/mainB04_img02.webp';
import mainB04_img03 from '../assets/mainB04_img03.webp';
import mainB04_img04 from '../assets/mainB04_img04.webp';

const MainBlock05 = () => {
    useEffect(() => {
    }, []);

    return (
        <section className='main_block05'>
            <article>
                <h1>저렴한 비용의 고퀄리티 홈페이지, <br/>아이앤뷰에선 가능합니다.</h1>
                <div className="bg_box">
                    <div className='blur_box'></div>
                    <div className="bg_img">
                        <img src={mainB04_img01} alt={mainB04_img01} />
                        <img src={mainB04_img02} alt={mainB04_img02} />
                        <img src={mainB04_img03} alt={mainB04_img03} />
                        <img src={mainB04_img04} alt={mainB04_img04} />
                    </div>
                </div>
            </article>
        </section>
    );
};

export default MainBlock05;