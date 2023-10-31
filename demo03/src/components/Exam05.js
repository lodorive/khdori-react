import { useEffect, useState } from "react";

const Exam05 = () => {

    const [javaScore, setjavaScore] = useState(0);
    const [dbScore, setdbScore] = useState(0);
    const [bootScore, setbootScore] = useState(0);
    const [total, setTotal] = useState(0);
    const [avg, setAvg] = useState(0);

    useEffect(()=>{
        setTotal(javaScore + dbScore + bootScore);
    }, [javaScore, dbScore, bootScore]);
    
    useEffect(()=>{
        setAvg(total/3)
    },[total])

    return (
        <>
        <h1>다섯 번째 예제</h1>
        <h4>성적 계산기</h4>
        자바 <input className="form-control" type="number" value={javaScore} onChange={e=>setjavaScore(parseInt(e.target.value))}/>
        데이터베이스 <input className="form-control" type="number" value={dbScore} onChange={e=>setdbScore(parseInt(e.target.value))}/>
        스프링부트 <input className="form-control" type="number"value={bootScore}  onChange={e=>setbootScore(parseInt(e.target.value))}/>
        <hr/>
        총점 = {total}점, 평균 {avg} 점
        </>
        );
    }
    
    export default Exam05;