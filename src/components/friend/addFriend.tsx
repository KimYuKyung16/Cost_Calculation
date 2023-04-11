/**
 * 친구 추가
 * 
 */
import styled from "styled-components";

import UsersSearch from './usersSearch';
import ReceivingFriendList from './receivingFriendList';


function AddFriend() {

  return(
    <Container>
      <h3>친구 신청 '◡'</h3>
      <UsersSearch />
      <ReceivingFriendList />
    </Container>
  )
}

const Container = styled.main`
display: flex;
flex-direction: column;
width: 100%;
height: 100%;
background-color: #322c58;
padding: 10px;

& > h3 {
  color: #ffffff;
  margin: 0;
  font-size: 1.3rem;
  padding: 10px;
  text-align: center;
}

@media screen and (max-width: 768px) { 
  padding: 5px;
} 
`

export default AddFriend;