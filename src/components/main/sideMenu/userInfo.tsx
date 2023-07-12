/**
 * 유저 정보
 *
 */
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getUserInfo } from '../../../apis/api/user';
import { useAppSelector, useAppDispatch } from "../../../redux/hooks";
import { userInfoActions } from "../../../redux/modules/reducer/userInfoReducer";
import CalculateListType from "./calculateListType";
import UserInfo_Mobile from "./userInfo_mobile";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"; 
import { faUserFriends, faEnvelope, faBars } from "@fortawesome/free-solid-svg-icons"; 
import * as UserInfoStyle from "../../../styles/main/userInfoStyle"; 

function UserInfo() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const userInfo = useAppSelector((state  => state.userInfo));
  const nickname = userInfo.nickname;
  const profile = userInfo.profile; 
  const [userInfoVisible, setUserInfoVisible] = useState('none');
  const [menubarVisible, setMenubarVisible] = useState('none');
  
  const profileMouseClick = () => {
    if (userInfoVisible === 'none') setUserInfoVisible('block');
    else setUserInfoVisible('none');
  }
  const menubarMouseClick = () => {
    if (menubarVisible === 'none') setMenubarVisible('block');
    else setMenubarVisible('none');
  }
  const get_UserInfo = async () => {
    const userInfo = await getUserInfo();
    if (userInfo.status === 200) {
      dispatch(userInfoActions.setNickname(userInfo.data.nickname));
      dispatch(userInfoActions.setProfile(userInfo.data.profile));
    }
  }
  
  useEffect(() => {
    get_UserInfo();
  }, [])

  return(
      <UserInfoStyle.Container>
        <UserInfoStyle.Container__Icon>
          <FontAwesomeIcon onClick={()=>{ navigate('/friend') }} icon={faUserFriends}/>
          <FontAwesomeIcon onClick={()=>{ navigate('/message') }} icon={faEnvelope}/>
        </UserInfoStyle.Container__Icon>

        <UserInfoStyle.Container__Info>
          <UserInfoStyle.Container__Profile>
            <UserInfoStyle.Container__Profile_Image>
              <div><img src={profile} onClick={ profileMouseClick }/></div>
              <p>'{nickname}' 님</p>
            </UserInfoStyle.Container__Profile_Image>
            <UserInfoStyle.Container__UserInfoDiv_mobile visible={ userInfoVisible }>
              <UserInfo_Mobile></UserInfo_Mobile>
            </UserInfoStyle.Container__UserInfoDiv_mobile>
          </UserInfoStyle.Container__Profile>
          
          <FontAwesomeIcon icon={faBars} onClick={ menubarMouseClick }/>
        </UserInfoStyle.Container__Info>
      
        <UserInfoStyle.Container__Info_Btn>
          <input onClick={()=>{ navigate('/userinfo') }} type="button" value="내 정보"/>
          <input onClick={()=>{ navigate('/userinfo/modify') }} type="button" value="프로필 수정"/>
        </UserInfoStyle.Container__Info_Btn>

        <UserInfoStyle.Container__ListType visible = {menubarVisible}>
          <CalculateListType />
        </UserInfoStyle.Container__ListType>

      </UserInfoStyle.Container>
  )
}

export default UserInfo;