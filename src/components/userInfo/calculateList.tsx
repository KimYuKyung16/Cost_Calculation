/**
 * 내 정보 페이지 - 내가 시작한 정산 리스트
 *
 */
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { getMyCalculateList } from "../../apis/api/calculate";
import Swal from "sweetalert2";

function CalculateList() {
  const navigate = useNavigate();
  const [list, setList] = useState<any>([]); // 정산 리스트
  const [totalPages, setTotalPages] = useState<number>(0); // 총 페이지 개수
  const [currentPage, setCurrentPage] = useState<number>(1); // 현재 페이지
  const [startNum, setStartNum] = useState<number>(0); // 패이지 시작 번호
  const [btnVisible, setBtnVisible] = useState<{
    left: boolean;
    right: boolean;
  }>({ left: false, right: true }); // 좌우 버튼 가시성 여부

  /* 내가 시작한 정산 리스트 가져오기 */
  const get_MyCalculateList = async () => {
    const list = await getMyCalculateList(currentPage);
    if (list.status === 200) {
      setTotalPages(list.data.total_pages);
      setList(list.data.list);
    }
    if (list.status === 600) {
      Swal.fire({
        position: "center",
        icon: "error",
        title: list.message,
        showConfirmButton: false,
        timer: 1500,
      });
      navigate("/login");
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
    get_MyCalculateList();
  }, [currentPage]);

  return (
    <>
      {list.length >= 1 ? (
        <Container>
          {list.map((calculate: any, index: any) => {
            return (
              <li key={calculate.num}>
                <p
                  onClick={() => {
                    navigate(`/calculate/${calculate.num}`);
                  }}
                >
                  {calculate.calculate_name}
                </p>
                <p>{calculate.date}</p>
                <p>
                  <Date>
                    {calculate.state === "true" ? "정산중" : "정산완료"}
                  </Date>
                </p>
              </li>
            );
          })}
          {totalPages ? (
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
          ) : null}
        </Container>
      ) : (
        <Container_Non>
          <p>생성한 일정이 없습니다.</p>
        </Container_Non>
      )}
    </>
  );
}

const Container = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 15px;
  width: 65%;
  margin: 50px 0;

  & > li {
    display: flex;
    align-items: center;
    height: 40px;
    color: #322c58;
    font-weight: 700;
    font-size: 1.5rem;
    border: 1px solid #b6b7d5;
    border-radius: 8px;
    overflow: hidden;
    background-color: #b6b6d6;

    & > p:nth-child(1) {
      width: 60%;
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
      padding: 0 15px;
    }

    & > p:nth-child(2) {
      width: 20%;
      min-width: 75px;
      color: #f5f5f5;
      padding: 10px;
      text-align: right;
    }

    & > p:nth-child(3) {
      width: 20%;
      min-width: 55px;
      white-space: nowrap;
      height: 70%;
      padding: 0 5px;
    }
  }

  @media screen and (max-width: 1023px) {
    width: 80%;
    margin: 0px;
    margin-bottom: 30px;
  }

  @media screen and (max-width: 768px) {
    width: 95%;
    margin: 0px;
    margin-bottom: 30px;
    gap: 10px;

    & > li {
      height: 35px;
      font-size: 1.2rem;
    }
  }
`;

const Date = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  background-color: #fff985;
  color: #8b8b8b;
  border-radius: 5px;
`;

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

const Container_Non = styled.div`
  display: flex;
  justify-content: center;
  align-items: flex-end;
  width: 100%;
  height: 30vh;
  color: #bac7fb;
  font-size: 1.3rem;
`;

export default CalculateList;
