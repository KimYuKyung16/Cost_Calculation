/**
 * 쪽지 페이지 - 헤더
 *
 */
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import {
  getMessageListApi,
  changeMessageReadApi,
  deleteMessageApi,
  deleteTotalMessageApi,
} from "../../apis/api/message";
import * as MessageListStyle from "../../styles/message/messageListStyle";

interface ImessageList {
  num: number;
  receiver: string;
  content: string;
  state: string;
  calculateListNum: number;
}

function MessageList() {
  const navigate = useNavigate();
  const [list, setList] = useState<ImessageList[]>([]); // 쪽지 리스트
  const [totalPages, setTotalPages] = useState<number>(1); // 총 페이지 개수
  const [currentPage, setCurrentPage] = useState<number>(1); // 현재 페이지
  const [startNum, setStartNum] = useState<number>(0); // 패이지 시작 번호
  const [btnVisible, setBtnVisible] = useState<{
    left: boolean;
    right: boolean;
  }>({ left: false, right: true }); // 좌우 버튼 가시성 여부

  const getMessageList = async () => {
    const list = await getMessageListApi(currentPage);
    if (list.status === 200) {
      setTotalPages(list.data.total_pages);
      setList(list.data.list);
    }
  };
  /* 페이지 버튼 생성하기 */
  const create_PageBtn = () => {
    let buttonArray = [];
    const start = startNum * 5 + 1;
    let last = start + 4;
    last = last >= totalPages ? totalPages : last;
    for (let i = start; i <= last; i++) {
      buttonArray.push(
        <input
          key={i}
          type="button"
          value={i}
          onClick={() => {
            setCurrentPage(i);
          }}
        />
      );
    }
    return buttonArray;
  };
  /* 메시지 읽음 표시 */
  const readMessage = async (messageNum: number, calculateListNum: number) => {
    const state = await changeMessageReadApi({ num: messageNum });
    if (state.status === 200) {
      navigate(`/calculate/${calculateListNum}`);
    }
  };
  /* 메시지 삭제 */
  const deleteMessage = async (messageNum: number) => {
    const state = await deleteMessageApi(messageNum);
    if (state.status === 200) {
      getMessageList();
    } else if (state.status === 600) {
      alert("로그인이 되어있지 않습니다. 다시 로그인해주세요.");
    } else {
      console.log("오류 있음");
    }
  };
  /* 메시지 전체 삭제 */
  const deleteTotalMessage = async () => {
    const state = await deleteTotalMessageApi();
    if (state.status === 200) {
      getMessageList();
    }
  };

  /* 버튼 생성 여부 */
  useEffect(() => {
    if (totalPages <= 5) setBtnVisible({ left: false, right: false });
    else if (currentPage >= 1 && currentPage <= 5) {
      setBtnVisible({ left: false, right: true });
    } else if (
      currentPage >= startNum * 2 + 1 &&
      currentPage <= startNum * 2 + 5
    ) {
      setBtnVisible({ left: true, right: false });
    } else {
      setBtnVisible({ left: true, right: true });
    }
  }, [totalPages, currentPage]);
  /* 좌우 버튼 눌러서 페이지 이동할 때 변화 */
  useEffect(() => {
    setCurrentPage(startNum * 5 + 1);
  }, [startNum]);
  useEffect(() => {
    getMessageList();
  }, [currentPage]);

  return (
    <MessageListStyle.Container>
      <MessageListStyle.Container__Header>
        <h1>쪽지</h1>
        <p onClick={deleteTotalMessage}>전체 삭제</p>
      </MessageListStyle.Container__Header>
      {list && list.length ? (
        <MessageListStyle.Container__MessageList>
          {list.map((x) => {
            return (
              <MessageListStyle.Container__Message state={x.state}>
                <div>
                  <img src="/image/notification_icon.svg" />
                  <p
                    onClick={() => {
                      readMessage(x.num, x.calculateListNum);
                    }}
                  >
                    {x.content}
                  </p>
                </div>
                <div>
                  <p>{x.state === "true" ? "읽음" : "안읽음"}</p>
                  <p
                    onClick={() => {
                      deleteMessage(x.num);
                    }}
                  >
                    삭제
                  </p>
                </div>
              </MessageListStyle.Container__Message>
            );
          })}
        </MessageListStyle.Container__MessageList>
      ) : (
        <MessageListStyle.Container__Message_none>
          <p>쪽지가 없습니다</p>
        </MessageListStyle.Container__Message_none>
      )}

      <Container__ListBtn>
        <MoveBtn
          visible={btnVisible.left}
          onClick={() => {
            setStartNum((value) => value - 1);
          }}
          type="button"
          value="<"
        />
        {create_PageBtn()}
        <MoveBtn
          visible={btnVisible.right}
          onClick={() => {
            setStartNum((value) => value + 1);
          }}
          type="button"
          value=">"
        />
      </Container__ListBtn>
    </MessageListStyle.Container>
  );
}

const Container__ListBtn = styled.div`
  display: flex;
  justify-content: center;
  gap: 5px;

  & > input {
    background-color: #72bb99;
    color: #ffffff;
    font-size: 1.4rem;
    font-weight: 700;
    border: 1px solid #72bb99;
    padding: 5px 10px;
    border-radius: 5px;
    cursor: pointer;
  }

  @media screen and (max-width: 768px) {
    margin-top: 10px;

    & > input {
      font-size: 1.1rem;
      padding: 5px 7px;
    }
  }
`;
interface IVisible_Props {
  visible: boolean;
}

const MoveBtn = styled.input`
  display: ${(props: IVisible_Props) =>
    props.visible === true ? "visible" : "none"};
`;

export default MessageList;
