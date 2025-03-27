import { useEffect } from 'react';

const Footer = () => {
    useEffect(() => {
    }, []);

    return (
        <footer id="footer">
            <ul>
                <li className='f_t'><strong>(주)아이앤뷰커뮤니케이션</strong></li>
                <li className='f_m'><span>서울특별시 마포구 상암동 1647 DMC디지털큐브 5층</span><span>사업자 등록번호 858-87-01471</span><span>대표번호 02-6956-9091</span><span>이메일 inviewcc@inviewcc.com</span></li>
                <li className='f_b'><p>ⓒI&VIEW COMMUNICATION. All rights reserved</p></li>
            </ul>
        </footer>
    );
};

export default Footer;