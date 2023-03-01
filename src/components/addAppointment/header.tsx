import { useNavigate } from "react-router-dom";

import styled from "styled-components"; // styled in js


function AddAppointment_Header() {
  const navigate = useNavigate();
  return(
    <Header>
      <img onClick={()=>{ navigate('/main') }} src='image/logo_name.png' />
    </Header>
  )
}

const Header = styled.header`
display: flex;
flex-direction: row;
align-items: center;
height: 40px;
width: 100%;
overflow: auto;
background: #322c58;
border-bottom: 1px solid #ffffff;


& > img {
  height: 80%;
  padding-left: 15px;
}
`

export default AddAppointment_Header;