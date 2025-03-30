import { useEffect } from 'react';
import AOS from "aos";

const tableData = {
    구분: ['골드', '플래티넘', '다이아몬드'],
    비용: ['100만원', '150만원부터', '견적문의'],
    기본구성: [
        '· PC + 모바일 반응형 <br/>· 템플릿 선택(텍스트, 이미지 등 내용 변경) <br/>· 메인 + 서브 10페이지',
        '· PC + 모바일 반응형 <br/>· 템플릿 선택(텍스트, 이미지 등 내용 변경) <br/>· 메인 + 서브 15페이지',
    ],
    제작기간: ['자료전달 완료 후 3일', '자료전달 완료 후 24일'],
    무상제공: [
        '텍스트, 이미지 변경 / 이미지,폰트 정품 라이센스 / SEO 검색엔진 최적화 / 홈페이지 등록',
    ],
    기본제공기능: [
        '관리자페이지 ( 메뉴관리 / 회원관리 / 게시판관리 / 포인트관리 / 방문자통계분석 / 간편로그인 / SMS관리 / 팝업창관리 )',
    ],
    기타: [
        '· 홈페이지 검색 등록 [네이버 / 구글] <br/>· 카페24 쇼핑몰 호스팅을 활용하므로 월 임대료 및 관리비 일체 발생하지 않음 <br/>· 고난이도 디자인 및 구현을 위한 스크립트 개발 시 일부 과금 발생 <br/>· 완전공개 오픈소스만을 활용하여 작업하기 때문에 수정가능 <br/>(단, 임의로 수정하여 발생하는 오류에 따른 귀책사유는 귀사에 있음)',
    ],
};

const optionData = [
    {
        title: '페이지 및 내용 추가',
        description: '기본 제공 페이지 수 이상의 페이지 추가',
        unit: '1 페이지',
        price: '100,000',
        aos_d: "100" 
    },
    {
        title: '일반게시판 추가',
        description: '리스트형 게시판 (제목, 작성일, 조회수, 내용, 첨부파일)',
        unit: '1 개',
        price: '50,000',
        aos_d: "100" 
    },
    {
        title: '갤러리(포토)게시판 추가',
        description: '이미지형 게시판 (썸네일 이미지, 제목, 작성일, 조회수 , 내용, 첨부파일) <small>※ 게시판 2개 운영 시 유효기간은 3년이며 이후 추가 비용 발생</small>',
        unit: '1 개',
        price: '50,000',
        aos_d: "100" 
    },
    {
        title: '다국어 홈페이지',
        description: '제작된 홈페이지 동일구성에 언어만 다르게 제작',
        unit: '1 개',
        price: '총 비용의 50%',
        aos_d: "100" 
    },
    {
        title: '도메인',
        description:
            '홈페이지를 연결하는 주소로 고객사에서 소유하는 것을 권장드립니다.',
        unit: '1 년',
        price: '30,000',
        aos_d: "100" 
    },
    {
        title: '웹호스팅',
        description:
            '서버 일정 공간을 이용할 수 있도록 임대해 주는 서비스로 필수 선택 사항',
        unit: '1 년',
        price: '110,000',
        aos_d: "100" 
    },
    {
        title: '디자인 수정',
        description:
            '무료 수정 이상의 이미지, 폰트, 스타일 변경(버튼스타일, 이미지스타일 등...)',
        unit: '1 페이지',
        price: '5,000',
        aos_d: "100" 
    },
    {
        title: '레이아웃 수정',
        description:
            '기존 전달된 레이아웃이 아닌 다른 레이아웃',
        unit: '1 섹션',
        price: '10,000',
        aos_d: "100" 
    },
    {
        title: '콘텐츠 애니메이션 변경',
        description:
            '기본적으로 제공되는 스크롤 애니메이션에서 원하는 스타일로 변경',
        unit: '1 개',
        price: '3,000',
        aos_d: "100" 
    },
    {
        title: '콘텐츠 애니메이션 추가',
        description:
            '기본 애니메이션 외에하는 스크롤 애니메이션을 추가 <small>※ AOS 효과가 아닌, 복잡한 애니메이션을 원하실 경우 추가 비용 발생</small>',
        unit: '1 개',
        price: '3,000',
        aos_d: "100" 
    },
    {
        title: '스크롤 디자인 변경/추가',
        description:
            '기본 스크롤 모양이 아닌 고객이 원하는 스타일의 스크롤 디자인을 적용',
        unit: '1 개',
        price: '5,000',
        aos_d: "100" 
    },
    {
        title: '마우스 포인터 효과',
        description:
            '기본 마우스 포인터가 아닌 고객이 원하는 이미지나 레퍼런스를 제공해 주시면 해당 디자인을 적용',
        unit: '1 개',
        price: '35,000',
        aos_d: "100" 
    },
];

const Ecommerce = () => {
    useEffect(() => {
        AOS.init();
    }, [])

    return (
        <section className='sub_p002'>
            <article>
                <div className="sub_tit" data-aos="fade-down">
                    <sub>쇼핑몰 디자인</sub>
                </div>
                <div className="table_Cont">
                    <table className='tb_pc' data-aos="fade-down" data-aos-delay="300">
                        <colgroup>
                            <col style={{ width: "200px" }} />
                            <col style={{ width: "auto" }} />
                            <col style={{ width: "auto" }} />
                            <col style={{ width: "360px" }} />
                        </colgroup>
                        <tr>
                            <th><p>구분</p></th>
                            <th><p>{tableData.구분[0]}</p></th>
                            <th><p>{tableData.구분[1]}</p></th>
                            <th><p>{tableData.구분[2]}</p></th>
                        </tr>
                        <tr>
                            <td><p>비용</p></td>
                            <td><p>{tableData.비용[0]}</p></td>
                            <td><p>{tableData.비용[1]}</p></td>
                            <td rowSpan={3}><p>{tableData.비용[2]}</p></td>
                        </tr>
                        <tr>
                            <td><p>기본구성</p></td>
                            <td className='compo'><p dangerouslySetInnerHTML={{ __html: tableData.기본구성[0] }} /></td>
                            <td className='compo'><p dangerouslySetInnerHTML={{ __html: tableData.기본구성[1] }} /></td>
                        </tr>
                        <tr>
                            <td><p>제작기간</p></td>
                            <td><p>{tableData.제작기간[0]}</p></td>
                            <td><p>{tableData.제작기간[1]}</p></td>
                        </tr>
                        <tr>
                            <td><p>무상제공</p></td>
                            <td className='compo' colSpan={3}><p>{tableData.무상제공[0]}</p></td>
                        </tr>
                        <tr>
                            <td><p>기본제공기능</p></td>
                            <td className='compo' colSpan={3}><p>{tableData.기본제공기능[0]}</p></td>
                        </tr>
                        <tr>
                            <td><p>기타</p></td>
                            <td className='compo' colSpan={3}><p dangerouslySetInnerHTML={{ __html: tableData.기타[0] }} /></td>
                        </tr>
                    </table>
                </div>
            </article>
            <article>
                <div className="sub_tit" data-aos="fade-down">
                    <sub>추가 옵션</sub>
                </div>
                <div className="option_cont">
                    <ul style={{ listStyleType: "none", paddingLeft: "0", marginTop: "20px" }}>
                        {optionData.map((item, index) => (
                            <li key={index} data-aos="fade-down">
                                <div className="t_box">
                                    <p >{item.title}</p>
                                    <span dangerouslySetInnerHTML={{ __html: item.description }}/>
                                </div>
                                <div className="f_box">
                                    <p>{item.unit}</p>
                                    <p>{item.price}</p>
                                </div>
                            </li>
                        ))}
                    </ul>
                    <div className="inq_btn">
                            <a href="https://forms.gle/FeC6sM6S1zm25F4Q7" target="_blank" rel="noreferrer">
                                실시간 제작문의
                            </a>
                    </div>
                </div>
            </article>
        </section>
    );
};

export default Ecommerce;