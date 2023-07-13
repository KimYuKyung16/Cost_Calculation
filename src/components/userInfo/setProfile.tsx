import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { userInfoActions } from "../../redux/modules/reducer/userInfoReducer";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { saveProfile } from "../../apis/api/user";
import styled from "styled-components"; 

function Profile() {
  const navigate = useNavigate(); // 페이지 이동을 위해 필요
  const dispatch = useAppDispatch();
  const userInfo = useAppSelector((state) => state.userInfo);
  const [nickname, setNickname] = useState(userInfo.nickname);
  const [preview, setPreview] = useState('');
  const [file, setFile] = useState(''); 

  const onChangeNickname = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNickname(e.target.value);
  };
  const profile_upload = (e: any) => {
    const upload_file = e.target.files[0];
    setFile(upload_file);
    setPreview(URL.createObjectURL(upload_file));
  };
  const profile_save = async () => {
    const fd = new FormData();
    fd.append("nickname", nickname);
    fd.append("uploadImage", file);
    const profile = await saveProfile(fd);
    if (profile.status === 200) {
      dispatch(userInfoActions.setProfile(profile.data.url));
      navigate("/main");
    }
  };

  return (
    <Container>
      <h1>프로필 설정</h1>
      <label htmlFor="profile">
        <Exist_Profile alt="profile" src={preview ? preview : userInfo.profile} />
        <input
          id="profile"
          type="file"
          accept=".jpg, .jpeg, .png"
          onChange={profile_upload}
        />
      </label>
      <label htmlFor="nickname">
        닉네임
        <input id="nickname" value={nickname} onChange={onChangeNickname} />
      </label>

      <Container__save_btn onClick={profile_save}>저장</Container__save_btn>
    </Container>
  );
}

const Container = styled.div`
display: flex;
flex-direction: column;
justify-content: center;
align-items: center;
width: 100vw;
height: 100vh;
background-color: #322c58;
padding-bottom: 20vh;
gap: 3rem;

& > h1 {
  color: white;
}

& > label {
  :nth-child(2) {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: auto;
    border-radius: 100%;
    & > input {
      display: none;
    }
  }

  :nth-child(3) {
    display: flex;
    flex-direction: row;
    justify-content: center;
    color: white;
    font-size: 1.7rem;
    gap: 10px;

    & > input {
      padding: 5px;
      width: 60%;
      border-radius: 5px;
      border: none;
    }
  }
}
`;

const Container__save_btn = styled.button`
width: 35%;
height: 40px;
background-color: #322c58;
color: #bac7fb;
font-weight: bold;
border: 3px solid #bac7fb;
border-radius: 20px;
margin: 0 5px;
max-width: 200px;
min-width: 100px;
cursor: pointer;
`;

const Exist_Profile = styled.img`
width: 40vh;
height: 40vh;
border-radius: 100%;
min-height: 200px;
min-width: 200px;
border: 5px solid white;
`;

export default Profile;
