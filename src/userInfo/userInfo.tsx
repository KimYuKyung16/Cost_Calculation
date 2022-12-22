import styled from "styled-components"; // styled in js

const Profile = styled.img` // 사용자 프로필 사진

`;

function UserInfo() {



  return(
    <>
      <Profile src="logo192.png" />
      <ul>
        <li>1. 전체 약속</li>
        <li>2. 정산중인 약속</li>
        <li>3. 정산 완료된 약속</li>
        <li>4. 즐겨찾기 약속</li>
      </ul>
    </>
  )
}

export default UserInfo;