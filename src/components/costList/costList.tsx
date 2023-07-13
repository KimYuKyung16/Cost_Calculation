/**
 * 비용 리스트 - 리스트
 *
 * */
import { useEffect, useMemo, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getCostList, deleteCost } from "../../apis/api/cost";
import { costInterface } from "../../interfaces/costInterface";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { modalStateActions } from "../../redux/modules/reducer/barReducer";
import useDidMountEffect from "../../hooks/useDidMountEffect";
import * as CostListStyle from "../../styles/costList/costListStyle";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";

function CostList() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const params = useParams();
  const num: string | undefined = params.num; // 정산 번호
  const loadRef: any = useRef();
  const cost = useAppSelector((state) => state.cost); // 비용 리스트
  const modalState = useAppSelector((state) => state.modalState); // 모달창 상태
  const costListDeleteState = useAppSelector(
    (state) => state.costListDeleteState
  ); // 삭제 버튼 상태
  const userInfo = useAppSelector((state) => state.userInfo);
  const [loadingVisible, setloadingVisible] = useState<boolean>(true); // 로딩화면 가시성 여부
  const [costList, setCostList] = useState<costInterface[]>([]); // 지출 리스트
  const [totalPageCount, setTotalPageCount] = useState(); // 총 지출 페이지 개수
  const [currentPage, setCurrentPage] = useState(1); // 현재 페이지
  const [changePage, setChangePage] = useState(1); // 페이지 변화 여부

  const [costNum, setCostNum] = useState<number>();

  /* 지출 리스트 출력 */
  const costListPrint = async () => {
    let list = await getCostList({
      params: {
        num,
        current_page: currentPage,
        filter: cost.id,
      },
    });
    setTotalPageCount(list.data.totalPageCount); // 전체 페이지
    setCostList((state) => [...state, ...list.data.list]); // 정산 리스트
  };
  // dispatch(modalStateActions.setIndex(0));
  /* 지출 상세 내용까지 보여주기 */
  const costContent = async (
    costInfo: {
      num: number;
      content: string;
      title: string;
      cost: string;
      id: string;
      payer: string;
      date: string;
      time: string;
    },
    index: number
  ) => {
    console.log(costInfo);

    if (modalState.state) dispatch(modalStateActions.setState(true));
    else {
      setCostNum(costInfo.num);
      dispatch(modalStateActions.setState(true));
      dispatch(modalStateActions.setContent(costInfo.content));
      dispatch(modalStateActions.setIndex(index));
      dispatch(modalStateActions.setTitle(costInfo.title));
      dispatch(modalStateActions.setCost(costInfo.cost));
      dispatch(modalStateActions.setUserID(costInfo.id));
      dispatch(modalStateActions.setPayer(costInfo.payer));
      dispatch(modalStateActions.setDate(costInfo.date));
      dispatch(modalStateActions.setTime(costInfo.time));
    }
  };
  /* 지출 내역 삭제 */
  const onClickDelete = async (num: number, index: number) => {
    const list = await deleteCost(num);
    if (list.status === 200) {
      let nCostList = [...costList];
      nCostList.splice(index, 1);
      setCostList(nCostList);
      alert("삭제되었습니다");
    }
  };
  const callback = (entries: any) => {
    const [entry] = entries;
    if (
      totalPageCount === currentPage ||
      totalPageCount === undefined ||
      totalPageCount === 0
    ) {
      setloadingVisible(false);
    } else {
      setloadingVisible(true);
    }
    // isIntersecting: 교차 여부 결과값(true or false)cost
    if (entry.isIntersecting && totalPageCount !== currentPage) {
      setCurrentPage((currentPage) => currentPage + 1); // 페이지 넘기기
    }
  };
  const options = useMemo(() => {
    return {
      root: null,
      rootMargin: "0px",
      threshold: 0.3,
    };
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(callback, options);
    const target = loadRef.current;
    if (target) observer.observe(target);

    return () => {
      if (target) observer.unobserve(target);
    };
  }, [loadRef, options, costList]);
  useEffect(() => {
    costListPrint();
  }, [currentPage, changePage]);
  useDidMountEffect(() => {
    setCurrentPage(1);
    setCostList([]);
    setChangePage((value) => value + 1); // 페이지가 바뀜을 알려주는 변수 하나 필요
  }, [cost.id]);

  return (
    <CostListStyle.Container>
      <CostListStyle.Modal state={modalState.state}>
        <img
          onClick={() => {
            dispatch(modalStateActions.setState(false));
          }}
          src="/image/close_icon.svg"
        />
        {costList.length > 0 && modalState && modalState.index !== null ? (
          costList[modalState.index].id === userInfo.userID ||
          costList[modalState.index].id[0] === "$" ? (
            <button
              onClick={() => {
                navigate(`cost/${costNum}`);
              }}
            >
              수정
            </button>
          ) : null
        ) : null}

        <h1>정산 내용</h1>
        <textarea value={modalState.content} readOnly />
      </CostListStyle.Modal>
      {!costList.length ? (
        <CostListStyle.Container__List_none>
          <p>지출 내역이 없습니다.</p>
          <p>지출 내역을 추가해보세요.</p>
        </CostListStyle.Container__List_none>
      ) : (
        <>
          <CostListStyle.Container__List state={costListDeleteState.state}>
            <colgroup>
              <col/>
              <col/>
              <col/>
              <col/>
              <col/>
            </colgroup>
            
            <tbody>
         
              {costList.map((x, index) => {
                const [year, month, day] = x.date.split(".");
                let dayState =
                  index >= 1 && costList[index - 1].date.split(".")[2] === day;
                return (
                  <>
                    {!dayState ? (
                      <CostListStyle.Container__List_Date>
                        <td colSpan={4}><p>{`${year}년 ${month}월 ${day}일`}</p></td>
                      </CostListStyle.Container__List_Date>
                    ) : null}
                    <tr key={index}>
                      <td
                        onClick={() => {
                          costContent(x, index);
                        }}
                      >
                        {x.title}
                      </td>
                      <td>{x.time}</td>
                      <td>{x.payer}</td>
                      <td>{x.cost.toLocaleString()} 원</td>
                      <td
                        onClick={() => {
                          onClickDelete(x.num, index);
                        }}
                      >
                        <FontAwesomeIcon icon={faTrash} />
                      </td>
                    </tr>
                  </>
                );
              })}
            </tbody>
          </CostListStyle.Container__List>
          <CostListStyle.Loading ref={loadRef} visible={loadingVisible}>
            <img src="/image/loading_icon.gif" />
          </CostListStyle.Loading>
        </>
      )}
    </CostListStyle.Container>
  );
}

export default CostList;
