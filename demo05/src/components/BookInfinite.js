import axios from "axios";
import { useEffect, useState } from "react";
import throttle from 'lodash/throttle'; //특정 함수의 발생 주기를 설정(강제 성능 하향)
//사용법 - throttle(원래 쓰려고 했던 함수, 주기)
//import debounce from 'lodash/debounce'; //특정 이벤트의 마지막만 실행하도록 설정
//사용법 - debounce(원래 쓰려고 했던 함수, 주기)

const BookInfinite = (props) => {
    const [page, setPage] = useState(1);
    const [size, setSize] = useState(30);
    const [bookList, setBookList] = useState([]);

    const loadBook = ()=>{
        axios({
            url:`${process.env.REACT_APP_REST_API_URL}/book/page/${page}/size/${size}`,
            method:"get"
        })
        .then(response=>{
            // setBookList(response.data); // 덮어쓰기
            setBookList([...bookList, ...response.data]); //spread 연산자 둘다 펼처서 합쳐라
            // setBookList(bookList.concat(...response.data)); //concat 함수
        });
    };

    useEffect(()=>{
        loadBook();
    }, [page]);

    //다음 페이지
    const nextPage = ()=>{
        setPage(page+1); //페이지 증가
        loadBook();
    }

    //개수가 변하면 페이지를 1로, 목록을 모두 지우고 다시 불러와야 함
    useEffect(()=>{
        setPage(1);
        setBookList([]);
        // loadBook();
    },[size])

    //-----------------------------------------------------------------------
    //스크롤 이벤트 처리(scroll event handling)
    useEffect(()=>{
        window.addEventListener("scroll", throttle(()=>{
            // console.log("스크롤 굴러가는중");
            const percent = calculateScrollPercentage();
            // console.log("퍼센트 = "+percent);
            if(percent >= 60) {
                nextPage();
            }
        }, 500));
    },[]);

    //스크롤 퍼센트 구하는 함수
    const calculateScrollPercentage = ()=> {
        // 현재 스크롤 위치
        var scrollPosition = window.scrollY || window.pageYOffset || document.documentElement.scrollTop;
      
        // 문서의 전체 높이
        var documentHeight = Math.max(
          document.body.scrollHeight,
          document.body.offsetHeight,
          document.documentElement.clientHeight,
          document.documentElement.scrollHeight,
          document.documentElement.offsetHeight
        );
      
        // 브라우저의 뷰포트 높이
        var windowHeight = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;
      
        // 스크롤 퍼센트 계산
        var scrollPercentage = (scrollPosition / (documentHeight - windowHeight)) * 100;
      
        return scrollPercentage;
      }
      
      // 스크롤 이벤트가 발생할 때 퍼센트를 출력하는 예제
      window.addEventListener('scroll', function() {
        var percentage = calculateScrollPercentage();
        console.log('스크롤 퍼센트: ' + percentage.toFixed(2) + '%');
      });

    return (
        <>
            <div className="row">
                <div className="col">
                    <h1>무한 스크롤 예제</h1>
                </div>
            </div>
            
            <div className="row mt-4">
                <div className="col-2 offset-10">
                    <select value={size} onChange={e=>setSize(e.target.value)}>
                        <option value="30">30개씩 보기</option>
                        <option value="50">50개씩 보기</option>
                        <option value="100">100개씩 보기</option>
                    </select>
                </div>
            </div>

            <div className="row mt-4">
                <div className="col text-center">
                    <table className="table">
                        <thead>
                        <tr>
                            <th>번호</th>
                            <th>제목</th>
                            <th>저자</th>
                            <th>출판사</th>
                        </tr>
                        </thead>

                    <tbody>
                        {bookList.map(book=>(
                            <tr key={book.bookId}>
                                <td>{book.bookId}</td>
                                <td>{book.bookTitle}</td>
                                <td>{book.bookAuthor}</td>
                                <td>{book.bookPublisher}</td>
                            </tr>
                        ))}
                    </tbody>
                    </table>
                </div>

                {/* 더보기 버튼 */}
                <div className="row mt-2">
                    <div className="col">
                        <button className="btn btn-success w-100" onClick={nextPage}>
                            더보기
                        </button>
                    </div>
                </div>


            </div>
        </>
    );
}
export default BookInfinite;