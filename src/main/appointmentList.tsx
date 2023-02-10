import { useState, useEffect, useRef, useMemo } from 'react';
import { useNavigate, Link } from "react-router-dom";

// import { appointmentListActions } from '../redux/modules/reducer/appointmentListReducer'
import { useAppDispatch, useAppSelector } from "../redux/hooks";

import styled from 'styled-components'; // styled in js
import UserInfo from '../userInfo/userInfo'; // 유저 정보 페이지

import axios from 'axios';
import { memberListActions } from '../redux/modules/reducer/memberListReducer';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'; // 아이콘 사용 위해 필요
import { faPlus } from '@fortawesome/free-solid-svg-icons'; // 제거 아이콘
 


const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%; 
  height: 100%;
  /* height: 100%; */
  /* padding: 2% 5%; */
  box-sizing: border-box;  
  overflow: auto; 
  -ms-overflow-style: none;
  scrollbar-width: none;

  &::-webkit-scrollbar {
    display: none;
  }
`

const Main = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 90%;
  box-sizing: border-box;
  /* overflow: auto; // 화면을 넘어가면 스크롤이 되도록 */
  /* background-color: aqua; */
`

const Main__List = styled.table`
  /* background-color: #7e4a4a; */
  /* table-layout:fixed;  */
  width: 100%;
  border-spacing: 0 15px;
  border-collapse: collapse;

  * {
    /* padding: 1% 2%; */
    
    & tr {
      display: flex;
      width: 100%;
      border-bottom: 1px solid #e3e3e3;
      /* background-color: #191a68; */
      
    }

    & td {
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: space-between;
      font-weight: bold;
      font-size: 1.2em;
      /* width: 100%; */
      padding: 0 3%;
      /* background-color: red; */
      box-sizing: border-box;

      & p {
        color: #322c59;

        & span:nth-child(2) {
          color: #3c3c3c;
          padding-left: 10px;
          font-weight: bold;
        }

        & span:nth-child(3) {
          color: #4b4b74;
          padding-left: 10px;
          font-weight: 600;
        }
      }

    }

    & td:nth-child(1) {
      width: 100%;
      /* background-color: #e61414; */
    }

    & td:nth-child(2) {
      /* width: 10%; */
      /* background-color: #ecc529; */
      white-space: nowrap;;
      padding: 0;
    }

    & td:nth-child(3) {
      /* background-color: #282ab1; */
      width: 200px;
      padding: 0;
      padding-left: 10px;
    }
  }
`
const Main__List__Members = styled.div`
  border-radius: 10px;
  width: 10%;
  max-width: 70px;
  max-height: 70px;

  & div {
    padding-top: 0%;
    max-width: 50px;
    max-height: 50px;

      & div {
        display: flex;
        flex-direction: row;
        flex-flow: wrap-reverse;
        justify-content: center;
        align-items: center;

        width: 100%;
        padding-top: 0%;
        max-width: 70px;
        max-height: 70px;
        top: 0;


        

        & div {
          width: 50%;
          padding-top: 50%;
          max-width: 30px;
          max-height: 30px; 
          position: relative;
          border-radius: 10px;
          background-color: #000000;

          & img {
            width: 100%;
            height: 100%;
            border-radius: 10px;
            padding-top: 0%;
            position: absolute;
            top: 0;
            border: 1px solid #bfbfbf;
          } 
        }
      }
  }
`

const Star = styled.img`
  width: 20px;
  height: 20px;
  /* padding-right: 10px; */
`

const Main__Btn = styled.div`
display: flex;
justify-content: center;
align-items: center;
position: absolute;
background-color: #322c5a;
color: #ffffff;
width: 60px;
height: 60px;
bottom: 10%;
right: 10%;
font-size: 3em;
`

interface State_Props {
  state: string | undefined;
}

const Main__Date = styled.div`
color: #6c6c6c;
font-size: 0.8em;
padding: 0;
`

const Main__State = styled.div`
background-color: ${(props: State_Props) => props.state === 'true' ? '#72bc93' : '#b6b7d5' };
/* background-color: #72bc93; */
color: #ffffff;
padding: 3px 10px;
font-size: 0.8em;
`

interface Loading_Props {
  visible: boolean | undefined | null;
}

const TargetTest = styled.tfoot`
  /* background-color: aquamarine; */
  height: 100%;
  width: 100%;
  display: ${(props: Loading_Props) => props.visible ? 'block' : 'none' };

  & td {
    display: flex;
    flex-direction: row;
    justify-content: center;
  }
`

const LoadingImage = styled.img`
  width: 100px;
  height: 100px;
`

function AppointmentList() {
  axios.defaults.withCredentials = true; // 요청, 응답에 쿠키를 포함하기 위해 필요
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  let [visible, setVisible] = useState<boolean>(true); // 로딩화면 가시성 여부
  let [currentPage, setCurrentPage] = useState(1); // 현재 페이지
  

  const testRef:any = useRef(); 

  interface membersState {
    id: string;
    nickname: string;
    profile: string;
  }
  interface appointmentListState {
    num: number;
    id: string;
    calculate_name: string;
    members: membersState[] | any;
    bookmark: string;
    date: string;
    time: string;
    state: string;
  }
  
  let [appointmentList, setAppointmentList] = useState<appointmentListState[]>([]); // 일정 리스트
  let [totalPageCount, setTotalPageCount] = useState(); // 총 페이지 개수

  // const appointmentList = useAppSelector(state => state.appointmentList);
  const appointmentListType = useAppSelector(state => state.appoinmentListType); // 현재 선택한 리스트 타입
  let [type, setType] = useState(appointmentListType.type);

  /* 정산 내역 출력 */
  const appointmentListUp = async () => { 
    console.log('정산내역 출력하려고 하는데 현재 페이지:', currentPage)
    try {
      console.log('리스트 출력')
      let list = await axios.get('http://localhost:6001/appointmentList', {
        params: {
          type: appointmentListType.type,
          current_page: currentPage
        }
      })
      // console.log(list.data.list)
      setTotalPageCount(list.data.totalPageCount); // 총 페이지 개수


      if (appointmentListType.type !== 'count') { // 정산 타입이 count가 아닐 경우에는 정산 리스트 저장
        // if (currentPage === 1) {
        //   setAppointmentList([]);
        //   setAppointmentList(list.data.list);
        //   console.log(list.data.list)
        // }else {
          setAppointmentList(state => [...state, ...list.data.list]);
        // }
      }
    } catch(e) {
      console.log(e);
    }
  }


  /* 즐겨찾기 설정 */
  const bookmark = async (index: number, num: number) => {
    let bookmark = appointmentList[index].bookmark;
    if (bookmark === 'true') bookmark = 'false' 
    else bookmark = 'true'

    // dispatch(appointmentListActions.setBookmark({index: index, bookmark: bookmark}));
    let setBookmark = await axios.put(`http://localhost:6001/appointmentList/bookmark/${num}`, {
      data: {
        bookmark: bookmark
      }
    });
  }

  const componentChange = () => {
    if (!appointmentList.length) {
      return (
        <>
          <p>일정이 없습니다.</p>
          <p>새로운 일정을 추가해보세요.</p>
        </>
      )
    } else {
      return (
        <>

          <tbody>
            {
              appointmentList.map((x, index) => {
                return(
                  <tr key={index}>

                    <td>
                      <p>
                        <Star onClick={()=>{bookmark(index, x.num)}} src={appointmentList[index].bookmark === 'true'? 'image/star.png' : 'image/empty_star.png'}  />
                        <span onClick={()=>{navigate('/appointment/' + x.num)}}>{x.calculate_name}</span>
                        <span>{x.members.length}</span>
                      </p>   

                      <Main__List__Members>
                        <div>
                          <div> {/* 3개의 프로필을 모아둔 div*/}
                            {
                              x.members.map((member: { id: string, nickname:string, profile: string }, index: any) => {
                                return(
                                  <div key={index}>
                                    <img src={member.profile}/>
                                  </div>
                                )
                              })
                            }
                          </div>
                        </div>
                      </Main__List__Members>
                    </td>

                    <td>
                      <Main__Date>{x.date}</Main__Date>
                    </td>

                    <td>
                      <Main__State state={x.state}>{x.state === 'true' ? '정산중' : '정산완료' }</Main__State>
                    </td>               
                  </tr>
                )
              })
            }
          </tbody>
          <TargetTest ref={testRef} visible={visible}>
            <tr>
              <td><LoadingImage src='image/loading_icon.gif'/></td>
            </tr>
          </TargetTest>   
        </>
      )
    }
  }


  let callback = (entries: any) => {
    const [entry] = entries;

    // isIntersecting: 교차 여부 결과값(true or false)
    if (entry.isIntersecting && totalPageCount !== currentPage) {
      setCurrentPage(currentPage => currentPage+1);
    } 

    // 현재 페이지가 가장 마지막 페이지라면
    if (totalPageCount === currentPage) setVisible(false); // 로딩화면 안보이게
    else setVisible(true); // 로딩화면 보이게

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
    const target = testRef.current;  

    if (target) observer.observe(target);

    return () => {
      if (target) observer.unobserve(target);
    }
  }, [testRef, options, appointmentList])


  
  useEffect(() => { 
    setAppointmentList([]);
    setCurrentPage(1); 
    // appointmentListUp(); 
    setType(appointmentListType.type)
  }, [appointmentListType.type])

  useEffect(() => { 
    appointmentListUp(); 
  }, [currentPage,type]) // 현재 페이지가 바뀔 경우


  return(
    <Container>
      <Main>
        <Main__List>
          {componentChange()}
        </Main__List>
        <Main__Btn><FontAwesomeIcon onClick={()=>{navigate('/appointment')}} icon={faPlus}/></Main__Btn>
      </Main>
    </Container>
  )
}

export default AppointmentList;