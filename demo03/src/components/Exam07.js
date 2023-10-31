import { useEffect, useState } from "react";

const Exam07 = () => {

    //객체로 상태 변수를 정의
    //입력 데이터
    const [member, setMember] = useState({
        memberId: "", memberPw: "", memberPwRe: ""
    });

    //검사 결과
    const [result, setResult] = useState({
        memberId:false, memberPw:false, memberPwRe:false
    });

    //입력데이터가 변하면 검사결과가 자동으로 계산되도록 처리
    useEffect(()=>{
        // console.log("member가 변했습니다");
        //ID검사
        const idRegex = /^[a-z][a-z0-9]{7,19}$/;
        const idMatch = idRegex.test(member.memberId);

        //PW검사
        const pwRegex = /^[A-Za-z0-9!@#$]{8,16}$/;
        const pwMatch = pwRegex.test(member.memberPw);

        //PW-RE검사
        const pwReMatch = member.memberPw.length > 0 
                                        && member.memberPw === member.memberPwRe; 

        //초기값이 false, 검사를 통해 true인 값을 넣겠다
        setResult({
            memberId: idMatch,
            memberPw: pwMatch,
            memberPwRe: pwReMatch
        });
    },[member])

    //객체의 상태를 한 번에 변경하는 함수를 구현
    const changeMember = (e) => {
        setMember({
            ...member,
            [e.target.name]: e.target.value
        });
    };

    return (

        <div className="container-fluid">

            <div className="row">
                <div className="col-md-10 offset-md-1">

                    <div className="p-4 text-light bg-success rounded">
                        <h1>회원가입</h1>
                    </div>

                    <form autoComplete="off">

                        <div className="row mt-3">
                            <div className="col">

                                <label className="form-label">아이디</label>
                                <input type="text" name="memberId"
                                    className={`form-control ${result.memberId ? 'is-valid' : 'is-invalid'}`} 
                                    value={member.memberId} onChange={changeMember}/>
                                <div className="valid-feedback">멋진 아이디입니다!</div>
                                <div className="invalid-feedback">사용할 수 없는 아이디입니다</div>
                            </div>
                        </div>
                        <div className="row mt-3">
                            <div className="col">

                                <label className="form-label">비밀번호</label>
                                <input type="password" name="memberPw"
                                className={`form-control ${result.memberPw ? 'is-valid' : 'is-invalid'}`}
                                    value={member.memberPw} onChange={changeMember}/>
                                <div className="valid-feedback">사용 가능한 비밀번호입니다</div>
                                <div className="invalid-feedback">사용할 수 없는 비밀번호입니다</div>
                            </div>
                        </div>
                        <div className="row mt-3">
                            <div className="col">
                                <label className="form-label">비밀번호 확인</label>
                                <input type="password" name="memberPwRe" 
                                className={`form-control ${result.memberPwRe ? 'is-valid' : 'is-invalid'}`}
                                    value={member.memberPwRe} onChange={changeMember} />
                                <div className="valid-feedback">비밀번호가 일치합니다</div>
                                <div className="invalid-feedback">비밀번호가 일치하지 않습니다</div>
                            </div>
                        </div>

                    </form>

                    <div className="row mt-3">
                        <div className="col text-end">
                            <button type="button" className="form-control btn btn-success" 
                            disabled={!(result.memberId && result.memberPw && result.memberPwRe)}>
                                가입하기</button>
                        </div>
                    </div>

                </div>
            </div>

        </div>
    );
}
export default Exam07;