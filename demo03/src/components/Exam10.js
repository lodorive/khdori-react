import { useEffect, useRef, useState } from "react";
import { Modal } from 'bootstrap/dist/js/bootstrap.esm';

const Exam10 = () => {

    const [items, setItems] = useState([
        { itemNo: 1, itemName: "포켓몬스터빵", itemPrice: 500, itemType: "식품", edit: false },
        { itemNo: 2, itemName: "허니버터칩", itemPrice: 1300, itemType: "식품", edit: false },
        { itemNo: 3, itemName: "참이슬후레시", itemPrice: 2200, itemType: "주류", edit: false },
        { itemNo: 4, itemName: "카스", itemPrice: 2500, itemType: "주류", edit: false },
        { itemNo: 5, itemName: "테라", itemPrice: 1300, itemType: "주류", edit: false },
        { itemNo: 6, itemName: "켈리", itemPrice: 1400, itemType: "주류", edit: false },
        { itemNo: 7, itemName: "처음처럼", itemPrice: 2000, itemType: "주류", edit: false },
        { itemNo: 8, itemName: "오징어땅콩", itemPrice: 3500, itemType: "식품", edit: false },
        { itemNo: 9, itemName: "신라면", itemPrice: 1500, itemType: "식품", edit: false },
        { itemNo: 10, itemName: "하리보젤리", itemPrice: 5500, itemType: "식품", edit: false }
    ]);

    const [backup, setBackup] = useState([]); //참조대상이 없는걸 null이라고 쓴다
    const [data, setData] = useState({
        itemName: "",
        itemPrice: "",
        itemType: ""
    });

    //useRef : 특정 대상(태그)을 참조할 수 있는 훅
    //- const 이름 = useRef(초기값);
    //- 태그에 ref라는 속성으로 이름을 지정해두면 언제든지 불러서 사용할 수 있다
    const bsModal = useRef();

    const changeData = e => {
        const newData = {
            ...data,
            [e.target.name]: e.target.value
        };
        setData(newData);
    };

    //(중요) "시작하자마자" items의 내용을 backup으로 복제(1회)
    useEffect(() => {
        setBackup(items.map(item => {
            return { ...item }; //새로운 객체를 만들어서 다 풀어헤쳐..
        }));
    }, []); //항목을 비워두면 시작하자마자 1번만 실행


    //줄을 수정상태로 변경하는 함수
    //- 이 함수를 실행하려면 최소한 itemNo는 알아야 한다
    //- 함수를 호출할 때 이벤트정보(e) 대신 아이템정보(item)을 전달하여 처리하도록 처리
    const changeToEdit = (target) => {
        // console.log(target);

        //아이템 변경
        //아이템이 있다면 그대로 반환해서 새로운 배열을 만들어라(복사)
        const newItems = items.map(item => {
            if (item.itemNo === target.itemNo) { //target과 같은 번호의 상품만큼은
                return {
                    ...item, //다른 건 그대로 둬도
                    edit: true //edit를 true로 바꿔라
                }
            }
            return item;//나머진 현상유지
        });
        setItems(newItems);
    };
    //줄의 데이터를 변경하는 함수(입력값 변경)
    //- 어떤 아이템(target)인지와 뭐라고 입력했는지(e)를 알아야 한다
    const changeItem = (target, e) => {
        const newItems = items.map(item => {
            if (item.itemNo === target.itemNo) {
                return {
                    ...item,
                    [e.target.name]: e.target.value
                }
            }
            return item;
        })
        setItems(newItems);
    };

    //취소 버튼을 누른 경우 실행할 함수
    //- backup에 들어있는 target과 번호가 같은 데이터를 items의 target과 같은 번호에 덮어쓰기
    const cancelItem = (target) => {

        //backup에서 target의 번호에 해당하는 객체를 찾는다(filter)
        const findResult = backup.filter(item => item.itemNo === target.itemNo);
        // console.log(findResult[0]); //찾으면 무조건 1개가 나오고 그건 0번 인덱스에 있음

        //아이템 취소
        //아이템이 있다면 그대로 반환해서 새로운 배열을 만들어라(복사)
        const newItems = items.map(item => {
            if (item.itemNo === target.itemNo) { //target과 같은 번호의 상품만큼은
                return {
                    ...findResult[0], //다른 건 백업 데이터로 두고
                    edit: false //edit를 false로 바꿔라
                }
            }
            return item;//나머진 현상유지
        });
        setItems(newItems);
    };

    const saveItem = (target) => {
        //아이템 완료

        //완료 누르면 백업 데이터를 갱신해야 함(백업 데이터 중 target과 번호가 같은 데이터)
        const newBackup = backup.map(item => {
            if (item.itemNo === target.itemNo) { //target과 같은 번호의 상품만큼은
                return {
                    ...target, //변경된 데이터로 저장하고
                    edit: false //edit를 false로 바꿔라
                }
            }
            return item;//나머진 현상유지
        });
        setBackup(newBackup);

        //아이템이 있다면 그대로 반환해서 새로운 배열을 만들어라(복사)
        const newItems = items.map(item => {
            if (item.itemNo === target.itemNo) { //target과 같은 번호의 상품만큼은
                return {
                    ...item, //다른 건 그대로 둬도
                    edit: false //edit를 false로 바꿔라
                }
            }
            return item;//나머진 현상유지
        });
        setItems(newItems);
    };

    //아이템 삭제
    //- 배열에서 항목을 삭제할 때도 filter를 사용한다
    const delectItem = (target) => {
        const newItems = items.filter(item => item.itemNo !== target.itemNo); //필터는 지워지는게 아니라 빼고 검색해주는 거임
        setItems(newItems);

        //백업 삭제
        const newBackup = backup.filter(item => item.itemNo !== target.itemNo);
        setBackup(newBackup);
    };

    //항목 추가
    //- data에 들어있는 객체를 복사해서 items에 추가
    //- data는 깨끗하게 정리
    const addItem = e => {

        const itemNo = items.length == 0 ? 1 : items[items.length - 1].itemNo + 1;

        //아이템 추가
        // const newItems = [...items, {...data}];
        const newItems = items.concat({
            ...data,
            edit: false,
            itemNo: itemNo
        });
        setItems(newItems);

        //백업 추가
        const newBackup = [
            ...backup,
            {
                ...data,
                edit: false,
                itemNo: itemNo
            }
        ];
        setItems(newItems);

        //입력창 초기화
        setData({
            itemName: "",
            itemPrice: "",
            itemType: ""
        });

        //모달 닫기
        closeModal();
    };

    //모달창 취소버튼
    const cancelAddItem = ()=>{
          //입력창 초기화
          setData({
            itemName: "",
            itemPrice: "",
            itemType: ""
        });

        //모달 닫기
        closeModal();
    };

    //모달 여는 함수
    //나는 모달만 불러오겠다
    const openModal = () => {
        // var modal = new Modal(document.querySelector("#exampleModal"));
        var modal = new Modal(bsModal.current); //React style
        modal.show();
    };

    //모달 닫는 함수
    const closeModal = () => {
        //만든 모달 중에 이 태그를 찾아서 닫아라
        // var modal = Modal.getInstance(document.querySelector("#exampleModal"));
        var modal = Modal.getInstance(bsModal.current); //React style
        modal.hide();
    };

    return (
        <div className="container-fluid">
            <div className="row">
                <div className="col-md-10 offset-md-1">

                    <div className="p-4 text-light bg-success rounded">
                        <h1>상품 목록</h1>
                    </div>

                    <div className="row mt-2">
                        <div className="col">
                            <button type="button" className="btn btn-success"
                                onClick={openModal}>
                                신규등록
                            </button>
                        </div>
                    </div>

                    <div className="row mt-2">
                        <div className="col">

                            <table className="table table-success table-hover">
                                <thead>
                                    <tr>
                                        <th className="col-2">번호</th>
                                        <th className="col-3">상품명</th>
                                        <th className="col-2">가격</th>
                                        <th className="col-2">종류</th>
                                        <th className="col-3">관리</th>
                                    </tr>
                                </thead>

                                <tbody>
                                    {items.map((item, index) => (
                                        item.edit ? (
                                            <tr key={item.itemNo}>
                                                <td>{item.itemNo}</td>
                                                <td>
                                                    <input type="text" value={item.itemName} className="form-control"
                                                        name="itemName" onChange={e => changeItem(item, e)} />
                                                    {/* 사용자가 지금 입력한 정보와 item에 있는 정보. 순서 바꿔도 상관없음*/}
                                                </td>
                                                <td>
                                                    <input type="text" value={item.itemPrice} className="form-control"
                                                        name="itemPrice" onChange={e => changeItem(item, e)} />
                                                </td>
                                                <td>
                                                    <input type="text" value={item.itemType} className="form-control"
                                                        name="itemType" onChange={e => changeItem(item, e)} /></td>
                                                <td>
                                                    <button className="btn btn-sm btn-secondary me-1"
                                                        onClick={e => cancelItem(item)}>취소</button>
                                                    <button className="btn btn-sm btn-success"
                                                        onClick={e => saveItem(item)}>완료</button>
                                                </td>
                                            </tr>
                                        ) : (
                                            <tr key={item.itemNo}>
                                                <td>{item.itemNo}</td>
                                                <td>{item.itemName}</td>
                                                <td>{item.itemPrice.toLocaleString()}원</td>
                                                <td>{item.itemType}</td>
                                                <td>
                                                    <button className="btn btn-sm btn-info me-1"
                                                        onClick={e => changeToEdit(item)}>수정</button>
                                                    {/* 함수를 부를 수 있게 하나 주고, 필요한 코드를 작성한다
                                                            이 반복문에서 사용한 item이라는 객체를 넘기겠다
                                                        */}
                                                    <button className="btn btn-sm btn-danger"
                                                        onClick={e => delectItem(item)}>삭제</button>
                                                </td>
                                            </tr>
                                        )

                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>

            {/* <!-- Modal --> */}
            <div className="modal fade" ref={bsModal} id="exampleModal" 
            data-bs-backdrop="static" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h1 className="modal-title fs-5" id="exampleModalLabel">상품 등록</h1>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <div className="row">
                                <div className="col">
                                    <label className="form-label">상품명</label>
                                    <input name="itemName" className="form-control" value={data.itemName} onChange={changeData} />
                                </div>
                            </div>
                            <div className="row mt-2">
                                <div className="col">
                                    <label className="form-label">판매가</label>
                                    <input name="itemPrice" className="form-control" value={data.itemPrice.toLocaleString()} onChange={changeData} />
                                </div>
                            </div>
                            <div className="row mt-2">
                                <div className="col">
                                    <label className="form-label">분류</label>
                                    <input name="itemType" className="form-control" value={data.itemType} onChange={changeData} />
                                </div>
                            </div>
                        </div>
                        <div className="modal-footer">
                            {/* 자동으로 닫히게 하는 버튼 */}
                            {/* <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">취소</button> */}
                            
                            {/* 수동으로 원하는 로직을 추가하여 닫히게 하는 버튼 */}
                            <button type="button" className="btn btn-secondary" onClick={cancelAddItem}>취소</button>

                            <button type="button" className="btn btn-success" onClick={addItem}>등록</button>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    );
}

export default Exam10;