import { useEffect } from 'react';
import contData from '../dataBox/contData.json';

const MainBlock03 = () => {
    useEffect(() => {
    }, []);

    return (
        <section className='main_block03'>
            <article>
                <h1>어디서도 볼 수 없는 저렴한 비용</h1>
                <div className="img_box">
                    <ul>
                        {contData.map((item, index) => (
                            <li key={index}>
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