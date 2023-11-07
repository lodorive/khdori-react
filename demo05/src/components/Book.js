import { useState, useEffect, useRef } from 'react';
import { FaRegEdit } from "react-icons/fa";
import { FaRegTrashAlt } from "react-icons/fa";
import axios from 'axios';
import { Modal } from 'bootstrap';

import "./Book.css";

const Book = (props) => {

    const [bookList, setBookList] = useState([]);

    // const loadBook = () => {
    //     //서버에 있는 도서 정보를 불러와서 state에 반영하는 코드 
    //     axios({
    //         url: "http://localhost:8080/book/",
    //         method: "get"
    //     })
    //         .then(response => {
    //             setBookList(response.data);
    //         })
    //         .catch(err => {
    //             window.alert("통신 오류 발생")
    //         });
    // }

    const loadBook = async()=>{
        const response = await axios({
            url: `${process.env.REACT_APP_REST_API_URL}/book/`,
            method: "get"
        })
        setBookList(response.data);
    };


    useEffect(() => {
        loadBook();
    }, []);

    const deleteBook = (book) => {
        const choice = window.confirm("정말 삭제하시겠습니까?");
        if (choice === false) return;

        axios({
            url:`${process.env.REACT_APP_REST_API_URL}/${book.bookId}`,
            method: "delete"
        })
            .then(response => {
                loadBook();
            })
            .catch(err => { })
    }

    //등록과 관련된 state
    const [book, setBook] = useState({
        bookTitle: "", bookAuthor: "", bookPublicationDate: "", bookPrice: "",
        bookPublisher: "", bookPageCount: "", bookGenre: ""
    });

    const changeBook = (e) => {
        setBook({
            ...book,
            [e.target.name]: e.target.value
        });
    };

    //초기화
    const clearBook = () => {
        setBook({
            bookTitle: "", bookAuthor: "", bookPublicationDate: "", bookPrice: "",
            bookPublisher: "", bookPageCount: "", bookGenre: ""
        });
    };

    // const saveBook = () => {
    //     //book 유효성 검사 및 차단 코드

    //     axios({
    //         url: "http://localhost:8080/book/",
    //         method: "post",
    //         // data: {...book}
    //         data: book
    //     }).then(response => {
    //         loadBook();
    //         closeModal();
    //     })
    // }

    //async 함수와 await 키워드를 사용한 간소화 작업이 가능 
    //- 비동기 작업을 동기화된 코드로 작성할 수 있다
    const saveBook = async()=>{
        const response = await axios({
            url: `${process.env.REACT_APP_REST_API_URL}/book/`,
            method: "post",
            data: book
        }); //response가 리턴값으로 빠짐
        loadBook();
        closeModal();
    };

    //수정과 관련된 기능
    const editBook = (target) => {
        setBook({ ...target }); //카피
        openModal();
    };

    // const updateBook = () => {
    //     const copyBook = {...book};
    //     delete copyBook.bookId;
    //     axios({
    //         url: `${process.env.REACT_APP_REST_API_URL}/book/${book.bookId}`,
    //         method: "put",
    //         data: copyBook
    //     })
    //         .then(response => {
    //             loadBook();
    //             closeModal();
    //         });
    // };

    const updateBook = async()=>{
        //검사 후 차단 코드
        const response = await axios({
            url: `${process.env.REACT_APP_REST_API_URL}/book/${book.bookId}`,
            method: "put",
            data:{...book}        
        });
        loadBook();
        closeModal();
    };

    //모달 관련 기능과 참조
    const bsModal = useRef();
    const openModal = () => {
        const modal = new Modal(bsModal.current);
        modal.show();
    }
    const closeModal = () => {
        const modal = Modal.getInstance(bsModal.current);
        modal.hide();

        clearBook();
    }

    return (
        <>

            <div className='row'>
                <div className='col'>
                    <h1>도서 관리 화면</h1>
                </div>
            </div>

            <div className='row'>
                <div className='col text-end'>
                    <button className='btn btn-success' onClick={openModal}>등록</button>
                </div>
            </div>

            <div className='row mt-4'>
                <div className='col'>
                    <table className='table table-hover table-success'>
                        <thead>
                            <tr>
                                <th className='pc-only'>코드</th>
                                <th>제목</th>
                                <th>저자</th>
                                <th className='pc-only'>출간일</th>
                                <th>판매가</th>
                                <th>출판사</th>
                                <th className='pc-only'>페이지</th>
                                <th className='pc-only'>장르</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>

                            {bookList.map(book => (
                                <tr key={book.bookId}>
                                    <td className='pc-only'>{book.bookId}</td>
                                    <td>{book.bookTitle}</td>
                                    <td>{book.bookAuthor}</td>
                                    <td className='pc-only'>{book.bookPublicationDate}</td>
                                    <td>{book.bookPrice}</td>
                                    <td>{book.bookPublisher}</td>
                                    <td className='pc-only'>{book.bookPageCount}</td>
                                    <td className='pc-only'>{book.bookGenre}</td>
                                    <td>
                                        <FaRegEdit className='text-waring' onClick={e => editBook(book)} />
                                        <FaRegTrashAlt className='text-danger' onClick={e => deleteBook(book)} />
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* <!-- Modal --> */}
            <div className="modal fade" ref={bsModal}
                data-bs-backdrop="static" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h1 className="modal-title fs-5" id="exampleModalLabel">
                                {book.bookId === undefined ? '신규 도서 등록' : `${book.bookId}번 도서 수정`}
                            </h1>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">

                            <div className='row'>
                                <div className='col'>
                                    <label className='form-label'>제목</label>
                                    <input type='text' name='bookTitle' className='form-control'
                                        onChange={changeBook} value={book.bookTitle} />
                                </div>
                            </div>

                            <div className='row'>
                                <div className='col'>
                                    <label className='form-label'>저자</label>
                                    <input type='text' name='bookAuthor' className='form-control'
                                        onChange={changeBook} value={book.bookAuthor} />
                                </div>
                            </div>

                            <div className='row'>
                                <div className='col'>
                                    <label className='form-label'>출간일</label>
                                    <input type='date' name='bookPublicationDate' className='form-control'
                                        onChange={changeBook} value={book.bookPublicationDate} />
                                </div>
                            </div>

                            <div className='row'>
                                <div className='col'>
                                    <label className='form-label'>판매가</label>
                                    <input type='number' name='bookPrice' className='form-control'
                                        onChange={changeBook} value={book.bookPrice} />
                                </div>
                            </div>

                            <div className='row'>
                                <div className='col'>
                                    <label className='form-label'>출판사</label>
                                    <input type='text' name='bookPublisher' className='form-control'
                                        onChange={changeBook} value={book.bookPublisher} />
                                </div>
                            </div>

                            <div className='row'>
                                <div className='col'>
                                    <label className='form-label'>페이지</label>
                                    <input type='text' name='bookPageCount' className='form-control'
                                        onChange={changeBook} value={book.bookPageCount} />
                                </div>
                            </div>

                            <div className='row'>
                                <div className='col'>
                                    <label className='form-label'>장르</label>
                                    <input type='text' name='bookGenre' className='form-control'
                                        onChange={changeBook} value={book.bookGenre} />
                                </div>
                            </div>

                        </div>
                        <div className="modal-footer">
                            <button className='btn btn-secondary' onClick={closeModal}>닫기</button>
                            {book.bookId === undefined ?
                                <button className='btn btn-success' onClick={saveBook}>저장</button>
                                :
                                <button className='btn btn-success' onClick={updateBook}>수정</button>
                            }
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Book;