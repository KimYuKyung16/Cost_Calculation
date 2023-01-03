import { useEffect } from 'react';
import axios from "axios";
import { useNavigate } from 'react-router-dom';

import { userInfoActions } from '../redux/modules/reducer/userInfoReducer'
import { useAppDispatch, useAppSelector } from "../redux/hooks";


import styled from "styled-components"; // styled in js

const FormData = require('form-data');

const Exist_Profile = styled.img`
width: 300px;
height: 300px;
`;


function Profile() {
  axios.defaults.withCredentials = true; // withCredentials 전역 설정
  const navigate = useNavigate(); // 페이지 이동을 위해 필요
  const dispatch = useAppDispatch();

  const userInfo = useAppSelector((state  => state.userInfo));

  const exist_Nickname = userInfo.nickname;
  const exist_Profile = userInfo.profile; 
  const file = userInfo.file; 

  function profile_upload(e: any) {
    const upload_file = e.target.files[0];

    dispatch(userInfoActions.setFile(upload_file)); 
    dispatch(userInfoActions.setProfile(URL.createObjectURL(upload_file)));     
  }

  function profile_save() {
    const fd = new FormData();
    fd.append("uploadImage", file);

    axios.post(`http://localhost:6001/userinfo/profile`, fd,
    { headers: {
      'Content-Type': 'multipart/form-data; charset: UTF-8;'
    }})
    .then(function (response) { 
      console.log(response.data)
      dispatch(userInfoActions.setProfile(response.data.url));   
      navigate('/main')
    })
    .catch(function (error) {
      console.log(error);
    });
  }

  // useEffect(() => { profile_print(); }, [setProfile])



  return(
    <>
      <div className='total_profile_div'>
        <div className='modified_profile_div'>
          <h3>바꿀 프로필</h3>
          <Exist_Profile alt="profile" src={exist_Profile}/>
          <div className='save_div'>
            <input type="file" className="inputfile" accept=".jpg, .jpeg, .png" onChange={profile_upload}/>
            <input onClick={profile_save} type="button" value="저장" />
          </div>
        </div>
      </div>
    </>
  );
}

export default Profile;