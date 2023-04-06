/**
 * 일정 추가
 * 
 */

 import styled from "styled-components"; // styled in js

 import Header from "../components/addCost/header";
 import CostAddition from "../components/addCost/addCost";

 function AddCost() {
 
   return(
     <>
       <Header/>
       <Main>
         <CostAddition/>
       </Main>
     </>
   );
 }
 
const Main = styled.main`
display: flex;
flex-direction: column;
align-items: center;
width: 100%;
padding: 0 20%;
background-color: #322c58;

@media screen and (max-width: 768px) { 
  padding: 0;
} 
`
 
 export default AddCost;