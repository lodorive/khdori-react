import { useState } from "react";

const Exam07 = () => {

    //객체로 상태 변수를 정의
    const [member, setMember] = useState({
        memberId: "", memberPw: "", memberPwRe: ""
    });

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
                                <input type="text" className="form-control" name="memberId"
                                    value={member.memberId} onChange={changeMember} />
                            </div>
                        </div>
                        <div className="row mt-3">
                            <div className="col">

                                <label className="form-label">비밀번호</label>
                                <input type="password" className="form-control" name="memberPw"
                                    value={member.memberPw} onChange={changeMember} />
                            </div>
                        </div>
                        <div className="row mt-3">
                            <div className="col">
                                <label className="form-label">비밀번호 확인</label>
                                <input type="password" className="form-control" name="memberPwRe"
                                    value={member.memberPwRe} onChange={changeMember} />

                            </div>
                        </div>

                    </form>

                    <div className="row mt-3">
                        <div className="col text-end">
                            <button type="button" className="form-control btn btn-success">가입하기</button>
                        </div>
                    </div>

                </div>
            </div>

        </div>
    );
}
export default Exam07;