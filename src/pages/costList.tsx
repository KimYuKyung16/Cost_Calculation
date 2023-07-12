/**
 * 비용 리스트
 *
 */
import { useEffect } from "react";
import styled from "styled-components"; // styled in js
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { modalStateActions } from "../redux/modules/reducer/barReducer";
import Header from "../components/costList/header";
import List from "../components/costList/costList";

function CostList(props: { num: string | undefined }) {
  const dispatch = useAppDispatch();
  const modalState = useAppSelector((state) => state.modalState); // 모달창 상태

  useEffect(() => {
    return () => {
      dispatch(modalStateActions.setState(false));
      dispatch(modalStateActions.setContent(""));
    };
  }, []);

  return (
    <Container>
      <Black state={modalState.state} />
      <Header />
      <Main>
        <List />
      </Main>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  height: 100%;
  background-color: #e4e4e4;
  padding: 0 3% 1% 3%;
  overflow: auto;
  position: relative;

  @media screen and (max-width: 768px) {
    -ms-overflow-style: none;
    scrollbar-width: none;
    &::-webkit-scrollbar {
      display: none;
    }
  }
`;

interface IModalState {
  state: boolean;
}

const Black = styled.div`
  width: 100%;
  height: 100%;
  background-color: black;
  position: fixed;
  overflow: hidden;
  opacity: 80%;
  top: 0;
  left: 0;
  z-index: 2;
  display: ${(props: IModalState) => (props.state ? "flex" : "none")};
`;

const Main = styled.div`
  width: 100%;
  height: 100%;
`;

export default CostList;
