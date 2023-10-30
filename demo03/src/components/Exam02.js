import { useState } from 'react';
import baoImage from '../assets/images/푸바옹.gif';

function Exam02(){
    //이 화면의 상태(state)는 한 개이다.
    const [size, setSize] = useState(200);

    function small(){
        setSize(100); //React스러운 방법 
    }

    function normal(){
        setSize(200);
    }

    function big(){
        setSize(300);
    }

    return(
        <>
            <h1>두 번째 예제</h1>
            <button className='btn btn-primary me-1' onClick={function(){setSize(100)}}>작게</button>
            <button className='btn btn-primary me-1' onClick={()=>setSize(200)}>기본</button>
            <button className='btn btn-primary' onClick={big}>크게</button>
            <br/>
            <img src={baoImage} width={size} height={size}/> 
        </>
    );
}

export default Exam02;