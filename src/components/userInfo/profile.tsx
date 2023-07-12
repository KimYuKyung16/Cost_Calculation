/**
 * 내 정보 페이지 - 헤더
 *
 */
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { useAppSelector, useAppDispatch } from "../../redux/hooks";

function UserProfile() {
  const navigate = useNavigate();
  const userInfo = useAppSelector((state) => state.userInfo);

  return (
    <Container>
      <Container__Profile>
        <div>
          <img src={userInfo.profile} />
        </div>
      </Container__Profile>
      <Container__Info>
        <p>'{userInfo.nickname}' 님</p>
        <input
          onClick={() => {
            navigate("modify");
          }}
          type="button"
          value="프로필 수정"
        />
      </Container__Info>
    </Container>
  );
}

const Container = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 35%;
  height: 100%;
  padding: 5% 0;
  gap: 20px;

  @media screen and (max-width: 768px) {
    flex-direction: row;
    width: 100%;
    height: auto;
    padding: 30px 0;
    padding-left: 5%;
    gap: 10px;
  }
`;

/* 내 프로필 */
const Container__Profile = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 80%;
  height: auto;

  & div {
    width: 90%;
    background-color: #ffffff;
    border-radius: 70%;
    padding-top: 90%;
    position: relative;

    & img {
      width: 100%;
      height: 100%;
      border-radius: 70%;
      padding-top: 0%;
      outline: 5px solid white;
      position: absolute;
      top: 0;
    }
  }

  & p {
    // 사용자 닉네임
    color: #b7b6d6;
    font-size: 2rem;
    font-weight: bold;
  }

  @media screen and (max-width: 768px) {
    justify-content: flex-end;
    max-width: 100px;
    width: 30%;
    height: 100%;

    & div {
      & img {
        outline: 2px solid #d3d3d3;
      }
    }

    & > p {
      display: none;
    }
  }
`;

/* 내 정보 */
const Container__Info = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  height: 100%;
  gap: 20px;

  & > p {
    // 닉네임
    color: #bac7fb;
    font-size: 2rem;
    font-weight: bold;
  }

  & > input {
    // 프로필 수정 버튼
    width: 70%;
    height: 40px;
    background-color: #322c58;
    color: #bac7fb;
    font-weight: bold;
    font-size: 1.5rem;
    border: 3px solid #bac7fb;
    border-radius: 20px;
    margin: 0 5px;
    cursor: pointer;
  }

  @media screen and (max-width: 768px) {
    justify-content: flex-end;
    width: auto;
    height: 100%;
    gap: 5px;

    & > p {
      // 닉네임
      font-size: 1.5rem;
    }

    & > input {
      // 프로필 수정 버튼
      width: 100%;
      height: 30px;
      min-width: 100px;
      max-width: 200px;
      font-size: 1.2rem;
      border-radius: 10px;
    }
  }
`;

export default UserProfile;
