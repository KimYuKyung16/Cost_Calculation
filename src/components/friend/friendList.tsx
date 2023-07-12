/**
 * 친구 목록
 *
 */
import { useEffect } from "react";
import { getFriendList, deleteFriend } from "../../apis/api/friend";
import { useAppSelector, useAppDispatch } from "../../redux/hooks";
import { friendVisibleActions } from "../../redux/modules/reducer/barReducer";
import { friendListActions } from "../../redux/modules/reducer/friendReducer";
import * as FriendListStyle from "../../styles/friend/friendListStyle";

function FriendList() {
  const dispatch = useAppDispatch();
  const friendVisibleState = useAppSelector((state) => state.friendVisible);
  const friendList = useAppSelector((state) => state.friendList);

  /* 친구 리스트 출력 */
  const FriendListUp = async () => {
    const friendlist = await getFriendList();
    dispatch(friendListActions.setInitialFriendList(friendlist.data));
  };
  /* 친구추가 버튼을 클릭했을 때 실행되는 함수 */
  const click_AddFriendBtn = () => {
    if (friendVisibleState.visible === "none") {
      dispatch(friendVisibleActions.setVisible("block"));
    } else {
      dispatch(friendVisibleActions.setVisible("none"));
    }
  };
  /* 친구 삭제 버튼을 클릭했을 때 뜨는 안내문구 */
  const delete_friend = (index: number, id: string) => {
    if (window.confirm("친구 목록에서 삭제하시겠습니까?")) {
      click_deleteFriend(index, id);
    }
  };
  /* 친구삭제 버튼을 클릭했을 때 실행되는 함수 */
  const click_deleteFriend = async (index: number, id: string) => {
    const state = await deleteFriend({ params: { id } });
    if (state.status === 200) {
      dispatch(friendListActions.deleteFriend(index));
      // FriendListUp();
    }
  };

  useEffect(() => {
    FriendListUp();
  }, []);

  return (
    <FriendListStyle.Container>
      {friendList.length ? (
        <FriendListStyle.Container__friendList>
          <tbody>
            {friendList.map((x, index) => {
              return (
                <tr key={index}>
                  <td>
                    <FriendListStyle.Profile src={x.profile} />
                    {x.nickname}
                  </td>
                  <td>
                    <img
                      src="/image/delete_icon.svg"
                      onClick={() => {
                        delete_friend(index, x.id);
                      }}
                    />
                  </td>
                </tr>
              );
            })}
          </tbody>
        </FriendListStyle.Container__friendList>
      ) : (
        <FriendListStyle.Container__friendList_none>
          <h3>등록된 친구가 없습니다.</h3>
        </FriendListStyle.Container__friendList_none>
      )}
      <FriendListStyle.Container__button
        onClick={click_AddFriendBtn}
        src="/image/add_friend_icon.svg"
      />
    </FriendListStyle.Container>
  );
}

export default FriendList;
