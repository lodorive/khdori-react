import { useState } from "react";

const Exam04 = ()=>{

    const [text, setText] = useState(0);

    return(
        <>
            <h1>네 번째 예제</h1>
            <h4>(Q) 주말에 뭐하세요?</h4>
            <textarea rows={10} onChange={()=>setText()}></textarea>
            <br/>
            <span value={text} onChange={e=>setText(parseInt(e.target.value))}>0</span> / 1000
        </>
    );
}

export default Exam04;