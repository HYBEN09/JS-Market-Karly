  <img src="https://github.com/HYBEN09/JS-Market-Karly/assets/104710243/bcae301c-72aa-4e21-a44d-0287d1ad2ff0" width="900" height="600">
  
# Market-Karly

## 1. 프로젝트 소개

- 개인 프로젝트
- 주제 : 마켓 컬리(Market Kurly) 클론코딩 프로젝트
- 목적 : 멋쟁이사자처럼 프론트엔드스쿨 4기에서 진행한 마켓 칼리 팀 프로젝트 리펙토링
- [팀 깃헙 저장소](https://github.com/likelion-LAB12-VainillaProject/market-karly)

## 2. 개발 기간
2023.10.10 ~ 진행중

## 3. 배포링크
`vercel` : https://js-market-karly.vercel.app/


## 4. 기술 스택 
<div>
  <img src="https://img.shields.io/badge/html5-E34F26?style=for-the-badge&logo=html5&logoColor=white">
<img src="https://img.shields.io/badge/css3-1572B6?style=for-the-badge&logo=css3&logoColor=white">
<img src="https://img.shields.io/badge/javascript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black">
</div>

## 5. 페이지별 기능 소개
<details>
  <summary>📃 홈 (메인 페이지) </summary>
  <table>
    <tr>
      <td width="300">
        <h4>✅ 상단 헤더 베너 </h4>
        <h5> 상단 배너 닫는 기능</h5>
        <p>1) 닫기 버튼 클릭시 상단 배너의 display 스타일 속성을 'none'으로 설정하여, 배너를 화면에서 숨김</p>
      </td>
      <td width="700">
        <img src="https://github.com/HYBEN09/JS-Market-Karly/assets/104710243/47a29fa7-6939-466a-a2d7-8c629b6ad088"/>
      </td>        
    </tr>
    <tr>
      <td width="300">
        <h4>✅ 상단 헤더의 메뉴 </h4>
         <h5>드롭다운 메뉴의 표시와 숨김을 제어하는 기능</h5>
        <p>1) 클로저(closure)를 이용하여 자신의 스코프에 있는 isEnter 변수의 상태를 기억하고 변경</p>
        <p>2) 'mouseover'와 'focus' 이벤트 발생 시에는 handler 함수가 실행되도록 설정, 'mouseout'와 'blur' 이벤트 발생 시에도 동일하게 처리</p>
      </td>
      <td width="700">
           <img src="https://github.com/HYBEN09/JS-Market-Karly/assets/104710243/e657e58d-f59e-416d-a623-345e583ce78c"/>   
      </td>       
    </tr>
    <tr>
      <td width="300">
         <h4>✅ 메인 케로셀</h4>
         <h5>Swiper를 사용하여 슬라이더를 생성</h5>
        <p>1) 다음'과 '이전' 버튼을 사용하여 다음/이전 슬라이더 보여주기</p>
      </td>
      <td width="700">
        <img src="https://github.com/HYBEN09/JS-Market-Karly/assets/104710243/2c75f8bd-65d2-4e5c-9062-d42845234a94"/>   
      </td>        
    </tr>
   </table>
</details>

<details>
  <summary>📃 회원가입 (register 페이지)</summary>
  <table>
    <tr>
      <td width="400">
        <h4> ✅ 회원가입 하기</h4>
        <p>1)아이디, 비밀번호, 이메일, 휴대폰 번호 등 각 필드마다 정규 표현식을 사용하여 입력 형식이 올바른지 확인</p>
        <p>2)이벤트 핸들링을 사용하여 사용자가 입력한 정보의 유효성을 실시간으로 검사 <br/> 
          - 'input' 이벤트는 사용자가 폼 필드에 값을 입력할 때마다 발생 <br/> 
          - 각 폼 필드에 대해 조건을 만족하는지 확인하고, 그렇지 않으면 오류 메시지를 보여주고 해당 필드의 테두리 색상을 변경 <br/> 
          - 모든 유효성 검사를 통과하면 해당 필드 테두리 색상을 파란색으로 변경하고 오류 메시지를 제거</p>
      </td>
      <td width="600">
          <img src="https://github.com/HYBEN09/JS-Market-Karly/assets/104710243/d579da55-accf-4c8c-9b42-d2fba121f80b"/>
      </td>        
    </tr>
    <tr>
      <td width="400">
        <h4>✅ 회원가입 하기</h4>
        <p>1) 전체 동의 체크박스 기능</p>
        <p>2) Daum Postcode 서비스를 활용하여 주소검색 창 띄우기(daum API)</p>
        <p>3) 회원가입 완료시 이름 로컬 스토리지에 저장 </p>
      </td>
      <td width="600">
             <img src="https://github.com/HYBEN09/JS-Market-Karly/assets/104710243/bb225574-8c0d-4a43-b13a-e3e75f9c55dd"/>   
      </td>  
    </tr>
  </table>
</details>

<details>
  <summary>📃 로그인 (login 페이지)</summary>
  <table>
    <tr>
      <td width="500">
        <h4> ✅ 로그인 하기</h4>
        <h5>로그인 버튼을 클릭했을 때 사용자가 입력한 아이디와 비밀번호를 검사하여 로그인 과정을 처리</h5>
        <p>1)로컬 스토리지에 저장된 사용자 정보가 없거나, 저장된 아이디나 비밀번호가 입력한 값과 일치하지 않으면 '로그인 실패' 메시지를 보여주기 </p>
        <p>2)모든 검사를 통과하면 '로그인 성공' 메시지를 보여주고 홈 페이지('/')로 이동 </p>
      </td>
      <td width="500">
          <img src="https://github.com/HYBEN09/JS-Market-Karly/assets/104710243/55509d94-3849-4420-a5c7-e1d1bce3c9d6"/>
      </td>        
    </tr>
    <tr>
      <td width="500">
        <h4>✅ 로그인 하기</h4>
         <h5>페이지가 로드될 때 로그인 상태를 확인하고, 해당 상태에 따라 화면의 내용을 업데이트하는 기능</h5>
        <p>1) 로컬 스토리지에서 사용자 정보를 가져오기</p>
        <p>2) 사용자 정보가 있다면, "로그인"과 "회원가입" 링크의 텍스트를 각각 사용자 이름과 "로그아웃"으로 변경</p>
         <p>2)로그아웃을 하면 로컬 스토리지에서 사용자 정보를 삭제</p>
      </td>
      <td width="500">
          <img src="https://github.com/HYBEN09/JS-Market-Karly/assets/104710243/153beb16-ef7f-4a6d-9f78-0349c748f27a"/>   
      </td>        
    </tr>
  </table>
</details>

<details>
  <summary>📃 제품 (productList 페이지)</summary>
  <table>
    <tr>
      <td width="500">
        <h4> ✅ 제품 메뉴 드롭다운 </h4>
        <h5> 메뉴 클릭에 따른 토글 기능을 구현 </h5>
        <p>1)메뉴 클릭에 따라 해당 메뉴 아이템과 관련 리스트를 표시하거나 숨기는 토글 기능을 구현 </p>
        <p>2)이벤트 리스너를 사용하여 각 토글 버튼이 클릭되었을 때 동작하도록 설정 </p>
      </td>
      <td width="500">
          <img src="https://github.com/HYBEN09/JS-Market-Karly/assets/104710243/d8d70280-ace7-4d6b-a83a-94729c83d21a"/>
      </td>        
    </tr>
    <tr>
      <td width="500">
        <h4> ✅ 제품 나열</h4>
        <h5> 제품 리스트를 동적으로 생성 </h5>
        <p>1) JSON Server 설정 및 실행 </p>
        <p>2)fetch를 사용하여 상품 데이터 요청 및 수신</p>
				<p>3)불러온 상품 데이터(JSON 형태)은 웹 페이지에 동적으로 나열</p>
				<p>4)불러온 상품 데이터는 웹 페이지에 동적으로 나열되기 위해 HTML로 변환되고 화면에 표시</p>
      </td>
      <td width="500">
          <img src="https://github.com/HYBEN09/JS-Market-Karly/assets/104710243/c81ffd41-2e2f-499a-bffa-1308f4de0c21"/>
      </td>
    </tr>
		<tr>
      <td width="500">
        <h4> ✅ 장바구니 팝업</h4>
        <h5> 장바구니 팝업을 동적으로 생성 </h5>
         <p>1)선택한 상품(item)에 대한 정보를 받아서 장바구니 팝업 HTML을 생성하고 화면에 추가 </p>
         <p>2)'취소' 버튼 클릭 시 장바구니 팝업 닫기</p>
				 <p>3) 클릭한 상품 정보를 받아서, 해당 팝업의 내용(상품 이름, 가격 등)을 갱신</p> 
				 <p>4)'+' 버튼 클릭 시 상품 개수가 증가하며 '-' 버튼 클릭 시 상품 개수가 감소</p>
		 	 	 <p>3)  특정 상품을 선택하여 '장바구니' 버튼을 클릭시 그 정보를 로컬 스토리지에 저장</p> 
      </td>
      <td width="500">
          <img src="https://github.com/HYBEN09/JS-Market-Karly/assets/104710243/f59e9eee-b60b-46e1-ba53-3c561e6fdfe2"/>
      </td>        
    </tr>
  </table>
</details>

<details>
  <summary>📃 장바구니 (cart 페이지)</summary>
  <table>
    <tr>
      <td width="500">
        <h4> ✅ 장바구니 상품 추가 </h4>
        <p>1)상품 페이지에서 '장바구니에 담기' 버튼을 클릭하면, 해당 상품의 정보가 localStorage의 'cart' 항목에 JSON 형태로 저장 </p>
        <p>2)localStorage에서 'cart' 항목의 값을 가져와 파싱 후, 각 아이템에 대해 createCartItemHTML 함수를 호출하여 HTML 생성하고 화면에 추가 </p>
      </td>
      <td width="500">
          <img src="https://github.com/HYBEN09/JS-Market-Karly/assets/104710243/b03d0e54-5c4f-4a6f-becd-20afd9d7b824"/>
      </td>        
    </tr>
    <tr>
      <td width="500">
        <h4> ✅ 상품 수량 조정 / 삭제</h4>
        <p>1) 장바구니에 담긴 상품의 수량을 증가하거나 감소 </p>
        <p>2) localStorage에 저장된 상품 데이터의 수량을 변경 </p>
        <p>3)'삭제' 버튼을 클릭하면 해당 상품이 장바구니 목록에서 제거</p>
        <p>4) localStorage에 저장된 상품 데이터를 삭제 </p>
      </td>
      <td width="500">
          <img src="https://github.com/HYBEN09/JS-Market-Karly/assets/104710243/aa1db082-a8cc-45e5-b901-4182a85e8f8a"/>
      </td>
    </tr>
  </table>
</details>


<details>
  <summary>📃 특가/헤택 (productBenefit 페이지) </summary>
  <table>
    <tr>
      <td width="300">
        <h4>✅ 특가/헤택 </h4>
        <h5> 특가/헤택 베너</h5>
      </td>
      <td width="700">
        <img src="https://github.com/HYBEN09/JS-Market-Karly/assets/104710243/61bc1d9c-7fe7-48a3-a279-dffc8b9478ef"/>
      </td>        
    </tr>
   </table>
</details>






