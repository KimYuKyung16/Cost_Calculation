import { useEffect, useMemo, useRef, useState } from "react";
import { useParams } from "react-router-dom";

import { getCostList } from "../../apis/api/cost";
import { costInterface } from "../../interfaces/costInterface";

import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { modalStateActions } from "../../redux/modules/reducer/barReducer";

import useDidMountEffect from "../../hooks/useDidMountEffect";

import * as CostListStyle from "../../styles/costList/costListStyle";


function CostList() {
  const dispatch = useAppDispatch();
  const params = useParams();
  const num: string | undefined = params.num; // 정산 번호

  const loadRef:any = useRef(); 

  const cost = useAppSelector(state => state.cost); // 비용 리스트
  const modalState = useAppSelector(state => state.modalState); // 모달창 상태

  let [loadingVisible, setloadingVisible] = useState<boolean>(true); // 로딩화면 가시성 여부
  let [costList, setCostList] = useState<costInterface[]>([]); // 정산 리스트
  let [totalPageCount, setTotalPageCount] = useState(); // 총 정산 페이지 개수
  let [currentPage, setCurrentPage] = useState(1); // 현재 페이지
  let [changePage, setChangePage] = useState(1); // 페이지 변화 여부

  /* 정산 리스트 출력 */
  const costListPrint = async () => {
    let list = await getCostList({
      params: {
        num,
        current_page: currentPage,
        filter: cost.id
      }
    })
    setTotalPageCount(list.data.totalPageCount); // 전체 페이지
    setCostList(state => [...state, ...list.data.list]); // 정산 리스트
  }

  /* 정산 상세 내용까지 보여주기 */
  const costContent = async (content: string) => {
    if (modalState.state) dispatch(modalStateActions.setState(true)); 
    else {
      dispatch(modalStateActions.setState(true)); 
      dispatch(modalStateActions.setContent(content)); 
    }
  }

  const callback = (entries: any) => {
    const [entry] = entries;

    if (totalPageCount === currentPage || totalPageCount === undefined || totalPageCount === 0) setloadingVisible(false);
    else setloadingVisible(true); 

    // isIntersecting: 교차 여부 결과값(true or false)
    if (entry.isIntersecting && totalPageCount !== currentPage) {
      setCurrentPage(currentPage => currentPage+1); // 페이지 넘기기
    } 
  };

  const options = useMemo(() => {
    return {
      root: null,
      rootMargin: '0px',
      threshold: 0.3
    }
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(callback, options); 
    const target = loadRef.current;  

    if (target) observer.observe(target);

    return () => {
      if (target) observer.unobserve(target);
    }
  }, [loadRef, options, costList])
  
  useEffect(() => { costListPrint(); }, [currentPage, changePage])
  useDidMountEffect(() => { 
    setCurrentPage(1);
    setCostList([]); 
    setChangePage((value) => value+1); // 페이지가 바뀜을 알려주는 변수 하나 필요
  }, [cost.id])

  return(
    <CostListStyle.Container>
      <CostListStyle.Modal state={modalState.state}>
        <img onClick={() => { dispatch(modalStateActions.setState(false)) }} src="/image/close_icon.svg"/>
        <h1>정산 내용</h1>
        <textarea value={modalState.content} readOnly/>
      </CostListStyle.Modal>
      {
        !costList.length ? 
        <CostListStyle.Container__List_none>
          <p>지출 내역이 없습니다.</p>
          <p>지출 내역을 추가해보세요.</p>
        </CostListStyle.Container__List_none>
        :
        <>
          <CostListStyle.Container__List>
            <tbody>
              {
                costList.map((x, index) => {
                  return(
                    <tr key={index}>
                      <td onClick={() => { costContent(x.content) }}>{x.title}</td>
                      <td>{x.payer}</td>
                      <td>{x.cost.toLocaleString()} 원</td>
                    </tr>
                  )
                })
              }
            </tbody>
          </CostListStyle.Container__List>
          <CostListStyle.Loading ref={loadRef} visible={loadingVisible}>
            <img src='/image/loading_icon.gif'/>
          </CostListStyle.Loading> 
         </>
      }
    </CostListStyle.Container>
  )
}


export default CostList;