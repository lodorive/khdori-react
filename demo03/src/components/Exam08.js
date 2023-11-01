import { useState } from "react";

const Exam08 = ()=>{
    const [names, setNames] = useState(['꼬부기', '갸라도스', '마임맨', '포곰곰']);

    //- map 함수는 배열의 데이터를 변화시키면서 새로운 배열을 생성하는 명령
    //- map 함수로 화면을 반복적으로 출력할 때 반드시 반복되는 영역에 key 속성이 있어야 한다
    //- key 속성은 반드시 유일해야 한다(백엔드에서 데이터를 가져오면 PK를 사용)
    //- 도저히 사용할 값이 없다면 map에 두번째 매개변수인 index를 사용
    return (
        <>
            <h1>배열 형태의 상태변수</h1>

            {/* {names.map(name=><div>{name}</div>)} */}
            {/* 엔터나 태그를 넣어줄 땐 괄호로 묶어주는게 좋음 */}
            {/* {names.map(name=>(
                <div>{name}</div>
                ))} */}

            {names.map((name, index)=>(
                <>
                    <div key={index}>{name}</div>
                </>
            ))}

            {/* {names.map(name=>(
            <>
            <input type="text" value={name}/> <br/>
            </>
                ))} */}
            </>
    );
};

export default Exam08;