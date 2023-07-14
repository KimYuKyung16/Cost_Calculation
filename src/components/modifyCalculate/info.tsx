/**
 * 멤버 추가
 *
 */
import { useEffect, useRef, useState } from "react";
import { getSearchFriendList } from "../../apis/api/friend";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import {
  userListActions,
  userSearchActions,
} from "../../redux/modules/reducer/userListReducer";
import { memberListActions } from "../../redux/modules/reducer/memberListReducer";
import {
  modifyCalculateActions,
  calculateActions,
} from "../../redux/modules/reducer/calculateReducer";
import * as InfoStyle from "../../styles/addCalculate/infoStyle";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

function CalculateInfo() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const nicknameRef: any = useRef();
  const friendList = useAppSelector((state) => state.userList); // 친구 리스트
  const [searchVal, setSearchVal] = useState(" "); // 검색 단어
  const calculateState = useAppSelector((state) => state.calculate); // 정산 정보
  const modifyCalculateState = useAppSelector((state) => state.modifyCalculate); // 정산 정보
  const [calculateName, setCalculateName] = useState(
    calculateState.calculateName
  );

  const onChangeCalculateName = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCalculateName(e.target.value);

    dispatch(calculateActions.setCalculateName(e.target.value));
  };
  const onChangeNickname = (e: React.ChangeEvent<HTMLInputElement>) => {
    // 수동으로 입력해서 멤버 추가할 때: 닉네임 설정
    setSearchVal(e.target.value);
  };
  /* 유저 검색 (친구) */
  const friendListUp = async () => {
    const list = await getSearchFriendList({
      params: { searchVal: searchVal },
    });
    if (list.status === 200) {
      dispatch(userListActions.setInitialUserList(list.data));
    }
    if (list.status === 600) {
      Swal.fire({
        position: "center",
        icon: "error",
        title: list.message,
        showConfirmButton: false,
        timer: 1500,
      });
      navigate("/login", {replace: true});
    }
  }
  
  /* 친구 중에서 멤버 추가 */
  const addFriendMember = (id: string, nickname: string, profile: string) => {
    let nAddMemberList = [...modifyCalculateState.addMemberList];
    nAddMemberList.push({
      id: id,
      nickname: nickname,
      profile: profile,
    });
    dispatch(modifyCalculateActions.setAddMemberList(nAddMemberList));
    dispatch(
      memberListActions.addMember({
        id: id,
        nickname: nickname,
        profile: profile,
      })
    );
  };
  /* 멤버 추가 */
  const addMember = () => {
    if (nicknameRef.current.value.trim().length > 0) {
      let nAddMemberList = [...modifyCalculateState.addMemberList];
      nAddMemberList.push({
        id: "",
        nickname: nicknameRef.current.value,
        profile: "",
      });
      dispatch(modifyCalculateActions.setAddMemberList(nAddMemberList));
      dispatch(
        memberListActions.addMember({
          // 멤버 리스트 배열값 변경
          id: "",
          nickname: nicknameRef.current.value,
          profile: "",
        })
      );
    } else {
      alert("이름을 입력해주세요");
    }
  };

  useEffect(() => {
    const handleOutsideClick = (e: MouseEvent) => {
      if (nicknameRef.current && nicknameRef.current.contains(e.target)) {
        setSearchVal(""); // 친구 목록 보임
      } else {
        setSearchVal(" "); // 친구 목록 안보임
      }
    };

    document.addEventListener("click", handleOutsideClick, true);
    return () => {
      document.removeEventListener("click", handleOutsideClick, true);
    };
  }, [nicknameRef]);
  useEffect(() => {
    return () => {
      dispatch(calculateActions.setCalculateName(""));
      dispatch(dispatch(modifyCalculateActions.setAddMemberList([])));
    };
  }, []);
  useEffect(() => {
    friendListUp();
  }, [searchVal]);

  return (
    <InfoStyle.Container>
      <h2>일정 수정</h2>

      <InfoStyle.Container__information>
        <InfoStyle.AppointmentName>
          <label htmlFor="appointmentName">일정이름</label>
          <input
            id="appointmentName"
            onChange={onChangeCalculateName}
            type="text"
            value={calculateName}
            placeholder="일정 이름"
          />
        </InfoStyle.AppointmentName>

        <InfoStyle.Member>
          <label htmlFor="id">인원추가</label>
          <InfoStyle.Member_Search>
            <input
              id="id"
              ref={nicknameRef}
              onClick={() => {
                dispatch(userSearchActions.setSearch(""));
              }}
              onChange={onChangeNickname}
              type="text"
              placeholder="아이디 또는 이름"
            />
            <InfoStyle.Member_FriendList>
              <InfoStyle.List>
                {friendList.map((x, index) => {
                  return (
                    <tr
                      onClick={() => {
                        addFriendMember(x.id, x.nickname, x.profile);
                      }}
                      key={index}
                    >
                      <td>
                        <InfoStyle.Profile
                          src={
                            x.profile === "\\image\\default_profile.png"
                              ? x.profile
                              : x.profile
                          }
                        />
                        {x.nickname}
                      </td>
                    </tr>
                  );
                })}
              </InfoStyle.List>
            </InfoStyle.Member_FriendList>
          </InfoStyle.Member_Search>
          <input onClick={addMember} type="button" value="추가" />
        </InfoStyle.Member>
      </InfoStyle.Container__information>
    </InfoStyle.Container>
  );
}

export default CalculateInfo;
