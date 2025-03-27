import { useEffect } from 'react';
import contData from '../dataBox/serviceData.json';

const MainBlock04 = () => {
    useEffect(() => {
    }, []);

    return (
        <section className='main_block04'>
            <article>
                <h1>무상으로 제공하는 최상의 서비스</h1>
                <div className="cont_box">
                    <ul>
                        {contData.map((item, index) => (
                            <li key={index}>
                                <div className='info_box'><i className='icon icon_check'>icon_check</i><p>{item.info}</p></div>
                                <div className='s_info_box'><p dangerouslySetInnerHTML={{ __html: item.s_info }}></p></div>
                            </li>
                        ))}
                    </ul>
                </div>
            </article>
        </section>
    );
};

export default MainBlock04;