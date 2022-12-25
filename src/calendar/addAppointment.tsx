import { useNavigate, Link } from "react-router-dom";

function addAppointment() {

  return(
    <>
      <h1>약속 추가하기</h1>
      <h5>일정이름</h5>
      <input type="text" />
      <h5>인원</h5>
      <input type="text" />
      <select>
        <option value='friend_list'>친구목록 넣기</option>
      </select>
      <input type="button" value="인원 추가하기" />
    </>
  )
}

export default addAppointment;