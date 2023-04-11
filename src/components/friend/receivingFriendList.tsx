/**
 * 친구 신청 받은 목록
 * 
 */
import { useEffect, useState } from "react";
import { getReceivingList, acceptFriend } from "../../apis/api/friend"; 
import { waitingListState } from "../../interfaces/friendInterface";

import { useAppDispatch } from "../../redux/hooks"; 
import { friendListActions } from "../../redux/modules/reducer/friendReducer";

import * as ReceivingFriendListStyle from "../../styles/friend/receivingFriendListStyle";

function ReceivingFriendList() {
  const dispatch = useAppDispatch();

  let [receivingList, setReceivingList] = useState<waitingListState[]>([]);

  /* 친구 신청 받은 거 리스트 가져오기 */
  const receivingListUp = async () => {
    const receivingList = await getReceivingList();

    if (receivingList.status === 200) {
      setReceivingList(receivingList.data);
    } else {
      console.log(receivingList.message);
      console.log(receivingList.status);
    }
  }

 /* 친구 신청 수락하기 */
 const accept = async (userInfo: waitingListState) => {
  const receivingList = await acceptFriend(userInfo);

  if (receivingList.status === 200) {
    receivingListUp();
    dispatch(friendListActions.addFriend({
      id: userInfo.id,
      nickname: userInfo.nickname,
      profile: userInfo.profile,
    }));
  } else {
    console.log(receivingList.message);
    console.log(receivingList.status);
  }
 }

  const component_change = () => {
    console.log(receivingList)
    if (receivingList.length) {
      return(
        <ReceivingFriendListStyle.Container__List>
          <tbody>
            {
              receivingList.map((x, index) => {
                return(
                  <tr key={index}>
                    <td><ReceivingFriendListStyle.Profile src={x.profile}/>{x.nickname}</td>
                    <td><input onClick={()=>{accept(x);}} type="button" value="수락"/></td>
                    <td><input type="button" value="거절"/></td>
                  </tr>
                )
              })
            }
          </tbody>
        </ReceivingFriendListStyle.Container__List>
      )
    } else {
      return (
        <ReceivingFriendListStyle.Container__List_None>
          <h3>친구 신청이 없습니다.</h3>
        </ReceivingFriendListStyle.Container__List_None>
      )
    }
  }

  useEffect(() => { receivingListUp(); }, [])
  useEffect(() => { component_change();  }, [receivingList])

    return(
      <ReceivingFriendListStyle.Container>
        {component_change()}
      </ReceivingFriendListStyle.Container>
    )
}


export default ReceivingFriendList;