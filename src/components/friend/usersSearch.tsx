/**
 * 유저 검색
 *
 */
import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getUserList, addFriend } from "../../apis/api/friend";
import { userListState } from "../../interfaces/friendInterface";
import * as UsersSearchStyle from "../../styles/friend/usersSearchStyle";
import Swal from "sweetalert2";

function UsersSearch() {
  const navigate = useNavigate();
  const inputRef: any = useRef();
  const [searchVal, setSearchVal] = useState<string>(""); // 검색어
  const [totalUserList, setTotalUserList] = useState<userListState[]>([]); // 전체 유저 리스트

  const onChangeSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchVal(e.target.value);
  };
  /* 전체 유저 가져오기 */
  const userListUp = async () => {
    const userList = await getUserList({ params: { searchVal: searchVal } });
    if (userList.status === 200) {
      setTotalUserList(userList.data);
    } else if (userList.status === 600) {
      Swal.fire({
        position: "center",
        icon: "error",
        title: userList.message,
        showConfirmButton: false,
        timer: 1500
      })
      navigate('/login')
    } else {
      console.log(userList.message);
    }
  };
  /* 친구 추가하기 */
  const add_Friend = async (receiver: string) => {
    const friendAddition = await addFriend({ receiver });
    setSearchVal("");
    inputRef.current.value = "";
    if (friendAddition.status === 200) {
      alert(receiver + "님에게 친구 신청을 보냈습니다.");
    } else {
      console.log(friendAddition.message);
      console.log(friendAddition.status);
    }
  };

  useEffect(() => {
    userListUp();
  }, [searchVal]);

  return (
    <UsersSearchStyle.Container>
      <UsersSearchStyle.Container__Search>
        <input
          ref={inputRef}
          onChange={onChangeSearch}
          type="text"
          placeholder="아이디를 입력하세요"
        />
        <img src="/image/friend_add_icon.svg" />
      </UsersSearchStyle.Container__Search>
      <UsersSearchStyle.Container__list>
        <UsersSearchStyle.Container__list_memberList>
          <tbody>
            {totalUserList.map((x, index) => {
              return (
                <tr key={index}>
                  <td>
                    <UsersSearchStyle.Profile
                      src={
                        x.profile === "\\image\\default_profile.png"
                          ? x.profile
                          : x.profile
                      }
                    />
                    {x.nickname}
                  </td>
                  {x.userID || x.receiver || x.sender ? null : (
                    <td>
                      <input
                        onClick={() => {
                          add_Friend(x.id);
                        }}
                        type="button"
                        value="친구 추가"
                      />
                    </td>
                  )}
                </tr>
              );
            })}
          </tbody>
        </UsersSearchStyle.Container__list_memberList>
      </UsersSearchStyle.Container__list>
    </UsersSearchStyle.Container>
  );
}

export default UsersSearch;
