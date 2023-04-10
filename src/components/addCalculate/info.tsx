/**
 * 멤버 추가
 * 
 */
import { useEffect, useRef, useState } from 'react';

import { getFriendList } from "../../apis/api/friend";

import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { userListActions, userSearchActions } from '../../redux/modules/reducer/userListReducer'
import { memberActions, memberListActions, calculateActions } from '../../redux/modules/reducer/memberListReducer'

import * as InfoStyle from "../../styles/addCalculate/infoStyle"; 


function CalculateInfo() {
  const dispatch = useAppDispatch();

  const nicknameRef: any = useRef();

  const member = useAppSelector(state => state.member); // 멤버 정보
  const friendList = useAppSelector((state  => state.userList)); // 친구 리스트

  let [searchVal, setSearchVal] = useState(' '); // 검색 단어

  const onChangeCalculateName = (e: React.ChangeEvent<HTMLInputElement>) => { // 정산 이름 변경
    dispatch(calculateActions.setCalculateName(e.target.value));
  };

  const onChangeNickname = (e: React.ChangeEvent<HTMLInputElement>) => { // 수동으로 입력해서 멤버 추가할 때: 닉네임 설정
    dispatch(memberActions.setNickname(e.target.value));
    setSearchVal(e.target.value);
  };

  /* 유저 검색 (친구) */
  const friendListUp = async () => {
    let list = await getFriendList({ params: { searchVal: searchVal } });

    if (list.status === 200) {
      dispatch(userListActions.setInitialUserList(list.data));
    }
  }

  /* 친구 중에서 멤버 추가 */
  const addFriendMember = (id: string, nickname: string, profile: string) => { 
    dispatch(memberListActions.addMember({
      id: id, 
      nickname: nickname, 
      profile: profile
    }));
  }
 
  /* 멤버 추가 */
  const addMember = () => { 
    if (nicknameRef.current.value) { // 이름이 입력되어있을 경우
      dispatch(memberListActions.addMember({
        id: member.id, 
        nickname: member.nickname, 
        profile: member.profile
      })); // 멤버 리스트 배열값 변경
      dispatch(memberActions.setNickname('')); // input 초기화
    } else { // 이름이 입력되어있지 않을 경우
      alert("이름을 입력해주세요");
    }
  }

  useEffect(() => {
    const handleOutsideClick = (e: any) => {
      if (nicknameRef.current && nicknameRef.current.contains(e.target)) setSearchVal(''); // 친구 목록 보임
      else setSearchVal(' '); // 친구 목록 안보임
    }

    document.addEventListener('click', handleOutsideClick, true);
    return () => {
      document.removeEventListener('click', handleOutsideClick, true); 
    };
  }, [nicknameRef]);


  /* 다른 페이지로 이동했을 경우: 리덕스 초기화 */
  useEffect(() => {
    return () => {
      dispatch(memberListActions.setInitialMemberList([]));
      dispatch(memberActions.setNickname('')); 
    }
  }, []);

  useEffect(() => { friendListUp(); }, [searchVal])


  return(
    <InfoStyle.Container>
      <h2>일정 추가</h2>

      <InfoStyle.Container__information>
        <InfoStyle.AppointmentName>
          <label htmlFor="appointmentName">일정이름</label>
          <input id="appointmentName" onChange={onChangeCalculateName} type="text" placeholder="일정 이름"/>
        </InfoStyle.AppointmentName>

        <InfoStyle.Member>
          <label htmlFor="id">인원추가</label>
          <InfoStyle.Member_Search>
            <input id="id" ref={nicknameRef} onClick={ ()=>{ dispatch(userSearchActions.setSearch(''))} } onChange={onChangeNickname} type="text" placeholder="아이디 또는 이름" value={member.nickname}/>
            <InfoStyle.Member_FriendList>
              <InfoStyle.List>
              {
                  friendList.map((x, index) => {
                    return(
                      <tr onClick={()=>{ addFriendMember(x.id, x.nickname, x.profile)}} key={index}>
                        <td><InfoStyle.Profile src={x.profile === "\\image\\default_profile.png" ? x.profile : x.profile}/>{x.nickname}</td>
                      </tr>
                    )
                  })
                }
              </InfoStyle.List>
            </InfoStyle.Member_FriendList>
          </InfoStyle.Member_Search>
          <input onClick={ addMember } type="button" value="추가" />
        </InfoStyle.Member>
      </InfoStyle.Container__information>

    </InfoStyle.Container>
  );
}


export default CalculateInfo;