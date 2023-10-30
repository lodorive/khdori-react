import khLogo from './kh.png'
//JSX에서는 프로그래밍 변수를 속성에 넣기 위해 { } 를 사용한다
//- src="hello" 로 되어있으면 경로를 의미
//- src={hello}로 되어있으면 변수를 의미 

//JSX에서는 모든 태그가 닫혀야 한다 <input></input> 또는 <input/>
function App() {

  var width = 300;

  return (
  <>
  <h1>KH정보교육원 React 수업자료</h1>
  <img src={khLogo} width={width}/>
  </>
  );
}

export default App;
