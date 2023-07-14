<p align="center">
  <img src="https://github.com/KimYuKyung16/cost_calculation/assets/81006438/3de3e232-f7ea-4faa-88f6-fa560c7c82d2" />
</p>

# Expensify
정산 관리를 도와주는 웹페이지입니다.
보통 여행을 다니거나 놀러다닐 때 돈을 사용하게 됩니다.
인원이 많아지고 지출 금액이 많아질수록 어디에 얼마를 사용했는지 기억도 잘 안나고 계산하기가 힘들어지는 경우가 많습니다. 그럴 경우 보다 편하게 정산을 정리해주고 개인별 지출 내역 또한 관리해줍니다. :money_with_wings:


<br/>

## Back-end 리포지토리
https://github.com/KimYuKyung16/cost_calculation_server


## :information_desk_person: 프로젝트 기능
1. 함께 정산을 하고 싶은 사람들을 모아서 정산을 할 수 있습니다.

2. 지출 내역을 날짜별로 등록하고 정리할 수 있습니다.

3. 필터링 기능을 통해 본인이 지출한 내역만 확인할 수 있습니다.

4. 더치페이를 자동으로 계산해주어 각자 얼마를 내야하는지 알려줍니다.


<br/>

<div align="center">
  <h4 weight="bold">✨Tech Stack✨</h4>

  <img src="https://img.shields.io/badge/React-61DAFB?style=flat&logo=react&logoColor=white"/>
  <img src="https://img.shields.io/badge/Typescript-3178C6?style=flat&logo=typescript&logoColor=white"/>
  <img src="https://img.shields.io/badge/styledcomponents-DB7093?style=flat&logo=styledcomponents&logoColor=white"/>
  <img src="https://img.shields.io/badge/Redux-764ABC?style=flat&logo=redux&logoColor=white"/>
  <br/>
  <img src="https://img.shields.io/badge/Node.js-339933?style=flat&logo=Node.js&logoColor=white"/>
  <img src="https://img.shields.io/badge/Express-000000?style=flat&logo=express&logoColor=white"/>
  <img src="https://img.shields.io/badge/MySQL-4479A1?style=flat&logo=mysql&logoColor=white"/>
</div>


## :key: 기술 사용 이유
1. 정산 관리 시스템의 경우에는 개인의 정산 관리를 도와주는 것이기 때문에 SEO는 중요하지 않습니다. 그 대신 빠른 속도를 더 원했습니다. 지출을 등록하고 지출 내역을 계산하는 과정이 많이 있기 때문에 부분부분의 내용이 바뀌는 경우가 많기 때문인데요. React는 부분을 변경해 렌더링한다는 장점이 있기 때문에 사용하게 되었습니다.

2. 컴포넌트를 분리해서 사용하다보니 컴포넌트끼리 주고받을 데이터가 많아졌습니다. 전역 상태 관리를 위한 도구 없이는 데이터를 관리하기에 너무 불편한 점이 많아서 Redux를 사용했습니다.


## :page_with_curl: 화면 구성
<img src="https://github.com/KimYuKyung16/cost_calculation/assets/81006438/935479bf-ac67-421f-b040-5cd30c9e3b58"/>

> `로그인`: 회원가입 후 로그인할 수 있습니다.

 <br/>

<div align="center">
  <img src="https://github.com/KimYuKyung16/cost_calculation/assets/81006438/ed1f595c-c0e6-4830-9bc8-1ff3f0a9c245" width="77%"/>
  <img src="https://github.com/KimYuKyung16/cost_calculation/assets/81006438/9650d39a-c365-46f9-a267-41bde1e92504" width="21%"/>
</div>

> `메인 페이지`: 본인이 포함되어있는 일정 리스트를 볼 수 있습니다. 리스트는 무한 스크롤로 페이지가 구성이 되어있으며 '전체, 정산중, 정산완료, 즐겨찾기' 총 4가지로 필터링이 가능합니다. 그리고 자주 사용하는 일정에는 즐겨찾기를 할 수 있습니다.

 <br/>
 
<div align="center">
  <img src="https://github.com/KimYuKyung16/cost_calculation/assets/81006438/093e6995-12bb-4af3-8ae6-8692f1ca6428" width="77%"/>
  <img src="https://github.com/KimYuKyung16/cost_calculation/assets/81006438/9b05db50-ed02-4c10-be8b-58651cdc25d1" width="21%"/>
</div>

> `친구 추가`: 아이디를 검색해서 친구를 추가할 수 있습니다. 친구를 추가한 후에는 친구와 함께 정산 관리를 할 수 있게 됩니다.

 <br/>
 
<img src="https://github.com/KimYuKyung16/cost_calculation/assets/81006438/41c736d6-459c-466e-a405-e74d3f01830e"/>

> `일정 추가`: 일정을 추가한 후에 해당 일정에 대한 정산 관리를 할 수 있습니다. 정산을 함께할 멤버에는 친구를 포함할 수 있을 뿐만 아니라 본인이 이름을 입력해서 비회원인 사람도 추가할 수 있습니다. 

 <br/>
 
<img src="https://github.com/KimYuKyung16/cost_calculation/assets/81006438/cb3ba7b8-7b2e-4ef9-9882-0b274d5575d9" />
<div>
  <img src="https://github.com/KimYuKyung16/cost_calculation/assets/81006438/09fd2614-c3c4-41b4-9733-b57a7569bf9c" width="77%">
  <img src="https://github.com/KimYuKyung16/cost_calculation/assets/81006438/f762890d-41a1-4829-8f5c-6e11b294a73e" width="21%"/>
</div>
<img src="https://github.com/KimYuKyung16/cost_calculation/assets/81006438/1a4a4d3b-1314-4891-bc58-2ccfe2ab8de9" />

> `일정 상세 내역`: 왼쪽에는 해당 일정을 함께 관리하는 멤버들의 정보가 나옵니다. 현재까지의 총 비용과 1인당 지출 비용을 알 수 있고 각자의 지출 비용, 더 내야하는 비용, 받아야 하는 비용에 대한 정보를 확인할 수 있습니다. 오른쪽에는 현재까지의 지출 내역을 확인할 수 있습니다. 날짜별로 정리를 해주기 때문에 지출 흐름을 쉽게 확인할 수 있습니다. 그리고 지출 내역에 있는 체크표시는 멤버들이 해당 정산을 완료할 것인지에 대해서 체크하는 것입니다. 모든 멤버가 정산 완료에 동의한다면 해당 정산은 정산 완료 상태로 바뀝니다.

 <br/>
 
<img src="https://github.com/KimYuKyung16/cost_calculation/assets/81006438/4f540116-935f-463d-bf0d-e050bc8a2b59"/>

> `지출 등록`: 지출을 등록할 수 있습니다. 금액은 천 만원까지만 입력할 수 있습니다.

 <br/>
 
<img src="https://github.com/KimYuKyung16/cost_calculation/assets/81006438/bed22df4-2124-4748-8c21-3b397dc10265"/>

> `내 정보`: 내가 생성한 일정 리스트들을 볼 수 있습니다.

 <br/>
 
<img src="https://github.com/KimYuKyung16/cost_calculation/assets/81006438/f862d313-d6e4-4fd5-ab07-50cda6d4d110"/>

> `메시지`: 다른 사람이 생성한 일정에서 본인을 멤버로 추가했을 경우 본인에게 해당 정산에 초대되었다는 메시지를 받을 수 있습니다. 

 <br/>
 


