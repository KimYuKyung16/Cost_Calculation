import { useState, useEffect, useRef, useMemo, useLayoutEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  getCalculateList,
  deleteBookmark,
  addBookmark,
} from "../../../apis/api/calculate";
import { useAppDispatch, useAppSelector } from "../../../redux/hooks";
import {
  calculateListActions,
  calculateListTypeCountActions,
} from "../../../redux/modules/reducer/calculateListReducer";
import { ICalculateListState } from "../../../interfaces/calculateInterface";
import * as CalculateListStyle from "../../../styles/main/calculateListStyle";

function CalculateList() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const loadRef: any = useRef();
  // ※ 리덕스에 일정 리스트 저장하는 이유: 즐겨찾기 시 사용자에게 보여지는 이미지를 바로바로 바꿔주기 위해서 필요
  const calculateList = useAppSelector((state) => state.calculateList); // 일정 리스트
  const calculateListType = useAppSelector((state) => state.calculateListType); // 현재 선택한 리스트 타입
  const calculateListCount = useAppSelector(
    (state) => state.calculateListTypeCount
  ); // 타입 별 리스트 개수
  const [loadingVisible, setloadingVisible] = useState<boolean>(false); // 로딩화면 가시성 여부
  const [currentPage, setCurrentPage] = useState<number>(1); // 현재 페이지
  const [totalPageCount, setTotalPageCount] = useState(1); // 총 페이지 개수
  const [calculateList_sub, setCalculateList] = useState<ICalculateListState[]>(
    []
  ); // 일정 리스트 : useState() 형태가 필요해서 추가
  const [type, setType] = useState(calculateListType.type); // useState() 형태가 필요해서 추가

  /* 정산 내역 출력 */
  const calculateListUp = async () => {
    const list = await getCalculateList({
      params: {
        type: calculateListType.type,
        current_page: currentPage,
      },
    });
    setTotalPageCount(list.data.totalPageCount); // 총 페이지 개수 설정
    setCalculateList((state) => [...state, ...list.data.list]); // 일정 리스트 설정
    dispatch(
      calculateListActions.setInitialCalculateList([
        ...calculateList,
        ...list.data.list,
      ])
    );
  };
  /* 즐겨찾기 설정 */
  const setBookmark = async (index: number, num: number) => {
    let bookmark = calculateList[index].bookmark;

    if (bookmark === "true") {
      // 즐겨찾기가 설정되어있을 경우
      bookmark = "false";
      dispatch(
        calculateListActions.setBookmark({ index: index, bookmark: bookmark })
      );
      const bookmarkState = await deleteBookmark(num);
      if (bookmarkState.status === 200) {
        let changedCalculateListCount = [...calculateListCount];
        changedCalculateListCount[3] = {
          ...changedCalculateListCount[3],
          count: String(Number(changedCalculateListCount[3].count) - 1),
        };
        dispatch(
          calculateListTypeCountActions.setInitialCalculateListTypeCount(
            changedCalculateListCount
          )
        );
      }
    } else {
      // 즐겨찾기가 설정되어있지않을 경우
      bookmark = "true";
      dispatch(
        calculateListActions.setBookmark({ index: index, bookmark: bookmark })
      );
      const bookmarkState = await addBookmark(num);

      if (bookmarkState.status === 200) {
        let changedCalculateListCount = [...calculateListCount];
        changedCalculateListCount[3] = {
          ...changedCalculateListCount[3],
          count: String(Number(changedCalculateListCount[3].count) + 1),
        };
        dispatch(
          calculateListTypeCountActions.setInitialCalculateListTypeCount(
            changedCalculateListCount
          )
        );
      }
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
      setCurrentPage((currentPage) => currentPage + 1);
    }
  };
  const options = useMemo(() => {
    return {
      root: null,
      rootMargin: "0px",
      threshold: 0.3,
    };
  }, []);

  /* 스크롤페이징 구현 */
  useEffect(() => {
    const observer = new IntersectionObserver(callback, options);
    const target = loadRef.current;
    if (target) observer.observe(target);

    return () => {
      if (target) observer.unobserve(target);
    };
  }, [loadRef, options, calculateList_sub]);
  useEffect(() => {
    dispatch(calculateListActions.setInitialCalculateList([]));
    setCurrentPage(1);
    setType(calculateListType.type);
  }, [calculateListType.type]);
  useLayoutEffect(() => {
    calculateListUp();
  }, [currentPage, type]); // 현재 페이지가 바뀔 경우
  /* 다른 페이지로 이동했을 경우: 리덕스 초기화 */
  useEffect(() => {
    return () => {
      dispatch(calculateListActions.setInitialCalculateList([]));
    };
  }, []);

  return (
    <CalculateListStyle.Container>
      <CalculateListStyle.Container__List>
        {!calculateList.length ? (
          <CalculateListStyle.Container__calculateList__none>
            <p>
              일정이 없습니다.
              <br />
              새로운 일정을 추가해보세요.
            </p>
          </CalculateListStyle.Container__calculateList__none>
        ) : (
          <>
            <CalculateListStyle.Container__calculateList>
              {calculateList.map((x, index) => {
                return (
                  <tr key={index}>
                    <td>
                      <CalculateListStyle.Container__Title>
                        <CalculateListStyle.Star
                          onClick={() => {
                            setBookmark(index, x.num);
                          }}
                          src={
                            calculateList[index].bookmark === "true"
                              ? "image/star.png"
                              : "image/empty_star.png"
                          }
                        />
                        <p
                          onClick={() => {
                            navigate("/calculate/" + x.num);
                          }}
                        >
                          {x.calculate_name}
                        </p>
                        <span>{x.members.length}</span>
                      </CalculateListStyle.Container__Title>

                      <CalculateListStyle.Container__List__Members>
                        <div>
                          <div>
                            {" "}
                            {
                              /* 3개의 프로필을 모아둔 div*/
                              x.members.slice(0, 4).map(
                                (
                                  member: {
                                    id: string;
                                    nickname: string;
                                    profile: string;
                                  },
                                  index: any
                                ) => {
                                  return (
                                    <div key={index}>
                                      <img src={member.profile} />
                                    </div>
                                  );
                                }
                              )
                            }
                          </div>
                        </div>
                      </CalculateListStyle.Container__List__Members>
                    </td>

                    <td>
                      <CalculateListStyle.Container__Date>
                        {x.date}
                      </CalculateListStyle.Container__Date>
                      <CalculateListStyle.Container__State state={x.state}>
                        {x.state === "true" ? "정산중" : "정산완료"}
                      </CalculateListStyle.Container__State>
                    </td>
                  </tr>
                );
              })}
            </CalculateListStyle.Container__calculateList>
            <CalculateListStyle.Container__Loading
              ref={loadRef}
              visible={loadingVisible}
            >
              <img src="image/loading_icon.gif" />
            </CalculateListStyle.Container__Loading>
          </>
        )}
      </CalculateListStyle.Container__List>
    </CalculateListStyle.Container>
  );
}

export default CalculateList;
