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
  const [loadingVisible, setloadingVisible] = useState<boolean>(true); // 로딩화면 가시성 여부
  const [costList, setCostList] = useState<costInterface[]>([]); // 지출 리스트
  const [totalPageCount, setTotalPageCount] = useState(); // 총 지출 페이지 개수
  const [currentPage, setCurrentPage] = useState(1); // 현재 페이지
  const [changePage, setChangePage] = useState(1); // 페이지 변화 여부

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
  /* 지출 상세 내용까지 보여주기 */
  const costContent = async (content: string, index: number) => {
    if (modalState.state) dispatch(modalStateActions.setState(true));
    else {
      dispatch(modalStateActions.setState(true));
      dispatch(modalStateActions.setContent(content));
      dispatch(modalStateActions.setIndex(index));
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
    // isIntersecting: 교차 여부 결과값(true or false)
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
        <button
          onClick={() => {
            navigate(`cost/${modalState.index}`);
          }}
        >
          수정
        </button>
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
            <tbody>
              {costList.map((x, index) => {
                return (
                  <tr key={index}>
                    <td
                      onClick={() => {
                        costContent(x.content, index);
                      }}
                    >
                      {x.title}
                    </td>
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
                );
              })}
            </tbody>
          </CostListStyle.Container__List>
          <></>
          <CostListStyle.Loading ref={loadRef} visible={loadingVisible}>
            <img src="/image/loading_icon.gif" />
          </CostListStyle.Loading>
        </>
      )}
    </CostListStyle.Container>
  );
}

export default CostList;
