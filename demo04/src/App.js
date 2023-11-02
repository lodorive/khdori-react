import Jumbotron from "./components/Jumbotron";
import { useState } from "react";
import { FaXmark } from "react-icons/fa6";
import { FaRegEdit } from "react-icons/fa";
import { AiOutlinePlus } from "react-icons/ai";

function App() {
  const [todoList, setTodoList] = useState([
    { no: 1, title: "학원가기", type: "공부", edit:false},
    { no: 2, title: "영어단어외우기", type: "공부", edit:false },
    { no: 3, title: "헬스장가기", type: "운동", edit:false },
    { no: 4, title: "친구만나기", type: "일상", edit:false }
]);


//등록을 위한 state
const [data, setData] = useState({title:"", type:""});

//수정을 위한 state
const [editData, setEditData] = useState({title:"", type:""});

const changeData = (e)=>{
  setData({
    ...data,
    [e.target.name] : e.target.value
  });
};

const addTodoList = ()=>{
  //data의 내용을 todoList에 추가 후 data를 초기화
  
  //내용 검사 코드 추가 if(맘에 안들면) return;
  if(data.title.length === 0 || data.type.length === 0) return;
  
  const last = todoList.length - 1; //마지막 번호
  const no = todoList.length === 0 ? 1 : todoList[last].no + 1;

  setTodoList([
    ...todoList,
    {
      ...data, 
      no:no
    } 
  ]);
  
  //초기화
  setData({title:"", type:""});
};

//todo 항목 삭제
const deleteTodoList = (todo) =>{
  const newTodoList = todoList.filter(target => target.no !== todo.no);
  setTodoList(newTodoList)
};

//todo 수정을 위한 선택
const editTodoList = (todo) => {
  //setEditData(todo) //안되는 코드(얕은 복사, shallow copy) //열쇠만 주는 느낌..
  setEditData({...todo}); //가능한 코드(깊은 복사, deep copy) 
};

const changeEditData = (e)=>{
  setEditData({
    ...editData,
    [e.target.name] : e.target.value
  });
};

return (
  <div className='container-fluid my-3'>
      <div className='row'>
        <div className='col-md-8 offset-md-2'>

          {/* 점보트론을 만들면서 제목과 내용을 전달 */}
          <Jumbotron title="todo list" content="오늘 할 일"/>

          {/* 입력 화면 */}
          <div className="row mt-4">
            <div className="col-6">
              <input className="form-control" name="title" value={data.title} onChange={changeData}/>
            </div>
            <div className="col-3">
              <select className="form-select" name="type" value={data.type} onChange={changeData}>
                <option value={""}>선택</option>
                <option>일상</option>
                <option>약속</option>
                <option>취미</option>
                <option>공부</option>
              </select>
            </div>
            <div className="col-3">
              <button className="btn btn-primary w-100" onClick={addTodoList}>
                <AiOutlinePlus/>
                추가
                </button>
            </div>
          </div>

          {/* 수정 화면 */}
          <div className="row mt-4">
            <div className="col-6">
              <input type="text" name="title" value={editData.title} onChange={changeEditData}/>
            </div>
            <div className="col-3">
              <select name="type" value={editData.type} onChange={changeEditData}>
              <option>일상</option>
                <option>약속</option>
                <option>취미</option>
                <option>공부</option>
                </select>
            </div>
          </div>

          {/* 출력 화면 */}
          <div className='row mt-4'>
            {todoList.map(todo=>(
            <div className='col-12 fs-5 mb-1'>
              <span className='badge bg-warning me-2'>
                {todo.type}
              </span>
              {todo.title}
              
              {/* 수정버튼 */}
              <FaRegEdit className="text-warning ms-1" onClick={e=>editTodoList(todo)}/>
              {/* 삭제버튼 */}
              <FaXmark className="text-danger" onClick={e=>deleteTodoList(todo)}/>
            </div>
            ))}
          </div>
          
        </div>
      </div>
    </div>
  );
}

export default App;
