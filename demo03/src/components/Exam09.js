import { useState } from "react";

const Exam09 = ()=>{
    //객체 배열 상태 변수
    const [monsters, setMonsters] = useState([
        {no:1, name:'이상해씨', type:'풀'},
        {no:5, name:'마임맨', type:"마임"},
        {no:9, name:'포곰곰', type:'곰곰'},
        {no:77, name:'갸라도스', type:'물'}
    ]);

    return (
        <>
            <h1>객체 배열 상태변수</h1>
            {monsters.map((monster, index)=>(
                <div key={monster.no}>
                    {index}
                    -
                    {monster.no}
                    -
                    {monster.name}
                    -
                    {monster.type}
                </div>
            ))}
        </>
    );
};

export default Exam09;