/** 
 * 쪽지 페이지 - 헤더
 * 
 * */

import {  useEffect, useState } from 'react';

import axios from 'axios'; 
import styled from "styled-components";

import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { barActions } from '../../redux/modules/reducer/barReducer'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faEllipsisV } from '@fortawesome/free-solid-svg-icons'; // 햄버거바 아이콘
import { StringLiteral } from 'typescript';
import { useNavigate } from 'react-router-dom';
 
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
  const messageList = await axios.get('http://localhost:6001/message');
  setMessageList(messageList.data);
  console.log(messageList.data)
}

/* 메시지 읽음 표시 */
const readMessage = async (messageNum: number, calculateListNum: number) => {
  const state = await axios.put('http://localhost:6001/message', {
    num: messageNum
  });

  if (state.status === 200) {
    navigate(`/appointment/${calculateListNum}`);
  }
}

/* 메시지 삭제 */
const deleteMessage = async (messageNum: number) => {
  const state = await axios.delete(`http://localhost:6001/message/${messageNum}`);

  if (state.status === 200) {
    getMessageList();
  }
}

/* 메시지 전체 삭제 */
const deleteTotalMessage = async () => {
  const state = await axios.delete(`http://localhost:6001/message`);

  if (state.status === 200) {
    getMessageList();
  }
}



  useEffect(() => {
    getMessageList();
  }, [])

  return (
    <Container>
      <Container__Header>
        <h1>쪽지</h1>
        <p onClick={ deleteTotalMessage }>전체 삭제</p>
      </Container__Header>
      <Container__MessageList>
        {
          messageList.map((x) => {
            return (
                <Container__Message state={x.state}>
                  <div>
                    <img src="/image/notification_icon.svg"/>
                    <p onClick={()=>{ readMessage(x.num, x.calculateListNum) }}>{x.content}</p>
                  </div>
                  <div>
                    <p>{x.state === 'true'? '읽음' : '안읽음'}</p>
                    <p onClick={() => { deleteMessage(x.num) }}>삭제</p>
                  </div>
                </Container__Message>
            )
          })
        }

      </Container__MessageList>
    </Container>
  )
}

const Container = styled.div`
display: flex;
flex-direction: column;
align-items: center;
background-color: #322c58;
width: 100vw;
height: 100vh;
padding: 0 auto;
padding: 40px 10px 50px 10px;

@media screen and (max-width: 768px) { 
  padding-top: 20px;
} 
`

const Container__Header = styled.div`
display: flex;
flex-direction: row;
justify-content: space-between;
align-items: flex-end;
padding: 0 10px;
width: 60%;
margin-bottom: 10px;

& > h1 { // 타이틀
  color: #ffffff;
}

& > p { // 전체 삭제
  color: #ffec42;
  font-size: 1.2rem;
  cursor: pointer;
}

@media screen and (max-width: 768px) { 
  width: 100%;
} 
`

const Container__MessageList = styled.ul`
border: 1px solid #ffffff;
border-radius: 10px;
width: 60%;

& > li {
  border-bottom: 1px solid #ffffff;
}

& > li:last-child {
  border-bottom: none;
}

@media screen and (max-width: 768px) { 
  width: 100%;
} 
`

interface IMessageState {
  state: string
}

const Container__Message = styled.li`
display: flex;
flex-direction: row;
width: 100%;
justify-content: space-between;
height: 50px;
padding: 0 20px;

& > div:nth-child(1) { // 내용
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 10px;

  & > img { // 종 아이콘
    height: 40%;
  }

  & > p { // 쪽지 내용
    font-size: 1.3rem;
    /* color: #e0e0e0; */
    color: ${(props: IMessageState) => props.state === 'true' ? '#aaaec7' : '#e0e0e0'};
    cursor: pointer;
  }
}

& > div:nth-child(2) { // 읽음표시, 삭제
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 5px;
  font-size: 1.1rem;

  & > p:nth-child(1) { // 읽음 표시
    color: #b4b8d3;
  }

  & > p:nth-child(2) { // 삭제
    color: #fff069;
    cursor: pointer;
  }
}

@media screen and (max-width: 768px) { 
  height: 45px;
  padding: 0 15px;
} 

`

export default MessageList