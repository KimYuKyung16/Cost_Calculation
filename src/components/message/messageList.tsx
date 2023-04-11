/** 
 * 쪽지 페이지 - 헤더
 * 
 */
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import {getMessageListApi, changeMessageReadApi, deleteMessageApi, deleteTotalMessageApi } from "../../apis/api/message";

import * as MessageListStyle from "../../styles/message/messageListStyle";


function MessageList() {
  const navigate = useNavigate();

  interface ImessageList {
    num: number,
    receiver: string,
    content: string,
    state: string,
    calculateListNum: number
  }

  let [messageList, setMessageList] = useState<ImessageList[]>([]);

  const getMessageList = async () => {
    const messageList = await getMessageListApi();
    setMessageList(messageList.data);
  }

  /* 메시지 읽음 표시 */
  const readMessage = async (messageNum: number, calculateListNum: number) => {
    const state = await changeMessageReadApi({ num: messageNum });

    if (state.status === 200) {
      navigate(`/calculate/${calculateListNum}`);
    }
  }

  /* 메시지 삭제 */
  const deleteMessage = async (messageNum: number) => {
    const state = await deleteMessageApi(messageNum);

    if (state.status === 200) {
      getMessageList();
    } else if (state.status === 600) {
      alert("로그인이 되어있지 않습니다. 다시 로그인해주세요.")
    } else {
      console.log("오류 있음");
    }
  }

  /* 메시지 전체 삭제 */
  const deleteTotalMessage = async () => {
    const state = await deleteTotalMessageApi();

    if (state.status === 200) {
      getMessageList();
    }
  }

  useEffect(() => {
    getMessageList();
  }, [])

  return (
    <MessageListStyle.Container>
      <MessageListStyle.Container__Header>
        <h1>쪽지</h1>
        <p onClick={ deleteTotalMessage }>전체 삭제</p>
      </MessageListStyle.Container__Header>
        {
          messageList.length ?
          <MessageListStyle.Container__MessageList>
            {
              messageList.map((x) => {
                return (
                    <MessageListStyle.Container__Message state={x.state}>
                      <div>
                        <img src="/image/notification_icon.svg"/>
                        <p onClick={()=>{ readMessage(x.num, x.calculateListNum) }}>{x.content}</p>
                      </div>
                      <div>
                        <p>{x.state === 'true'? '읽음' : '안읽음'}</p>
                        <p onClick={() => { deleteMessage(x.num) }}>삭제</p>
                      </div>
                    </MessageListStyle.Container__Message>
                )
              })  
            }
          </MessageListStyle.Container__MessageList>
          :
          <MessageListStyle.Container__Message_none>
            <p>쪽지가 없습니다</p>
          </MessageListStyle.Container__Message_none>
        }

    </MessageListStyle.Container>
  )
}



export default MessageList