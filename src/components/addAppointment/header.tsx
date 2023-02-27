import styled from "styled-components"; // styled in js

function AddAppointment_Header() {
  return(
    <Header>
      <img src='image/logo_name.png' />
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
}
`

export default AddAppointment_Header;