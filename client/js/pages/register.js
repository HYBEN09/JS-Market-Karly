import {
  getNode,
  css,
  insertAfter,
  disableElement,
  enableElement,
  isString,
  bindEvent,
} from '../../lib/index.js';

/* -------------------------------------------------------------------------- */
/*                                 전체 동의 체크박스                              */
/* -------------------------------------------------------------------------- */
function checkAllAgreements() {
  const checkAgreeAll = getNode('input[name=agreeAll]');
  const checkAgree = document.querySelectorAll('input[name=agree]');

  checkAgreeAll.addEventListener('change', (e) => {
    for (let i = 0; i < checkAgree.length; i++) {
      checkAgree[i].checked = e.target.checked;
    }
  });
}

checkAllAgreements();

/* -------------------------------------------------------------------------- */
/*                           회원가입 & 로그인                                    */
/* -------------------------------------------------------------------------- */

// 유효성 검사
const form = getNode('#form');
const telButton = getNode('.disabled__button');

const userId = getNode('#userId');
const userPw = getNode('#userPw');
const pwCheck = getNode('#pwCheck');
const userName = getNode('#name');
const userTel = getNode('#tel');
const userEmail = getNode('#email');

// 이메일 검증
const isValidEmail = (asValue) => {
  const regExpEmail =
    /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/g;
  return regExpEmail.test(String(asValue).toLowerCase());
};

// 아이디 검증
const isValidId = (asValue) => {
  const regExpId = /^[a-z]+[a-z0-9]{5,19}$/g;

  return regExpId.test(asValue);
};

//비밀번호 검증
const isValidPw = (asValue) => {
  const regExpPw = /^.*(?=.{8,20})(?=.*[0-9])(?=.*[a-zA-Z]).*$/g;

  return regExpPw.test(asValue);
};

// 휴대폰번호 검증
const isValidTel = (asValue) => {
  const regExpTel = /^\d{3}\d{3,4}\d{4}$/g;

  return regExpTel.test(asValue);
};

// Error Text 생성
const setText = (element, className) => {
  insertAfter(element, `<p class="${className}"></p>`);
};

setText(userId, 'error');
setText(userPw, 'password');
setText(pwCheck, 'passwordCheck');
setText(userName, 'name');
setText(userTel, 'number');
setText(userEmail, 'email');
setText(userTel, 'tel');

const errorText = getNode('.error');
const passwordText = getNode('.password');
const pwCheckText = getNode('.passwordCheck');
const nameText = getNode('.name');
const emailText = getNode('.email');
const telText = getNode('.tel');

let idCheckButton = getNode('.id-check');

// Event Listener

form.addEventListener('input', (e) => {
  e.preventDefault();

  if (e.target.classList.contains('user-id')) {
    if (!isValidId(e.target.value)) {
      errorText.textContent =
        '6자 이상 16자 이하의 영문 혹은 영문과 숫자를 조합해 주세요.';
      css(userId, 'border', '1px solid red');
    } else {
      errorText.textContent = '';
      css(userId, 'border', '1px solid blue');
    }
  }

  if (e.target.classList.contains('user-password')) {
    if (!isValidPw(e.target.value)) {
      passwordText.textContent = '영문, 숫자 혼합하여 8자리 이상 입력해주세요.';
      css(userPw, 'border', '1px solid red');
    } else {
      passwordText.textContent = '';
      css(userPw, 'border', '1px solid blue');
    }
  }

  if (e.target.classList.contains('pw-check')) {
    if (userPw.value !== pwCheck.value) {
      pwCheckText.textContent = '비밀번호가 같지 않습니다.';
      css(pwCheck, 'border', '1px solid red');
    } else {
      pwCheckText.textContent = '';
      css(pwCheck, 'border', '1px solid blue');
    }
  }

  if (e.target.classList.contains('user-name')) {
    if (!isString(userName.value) || userName.value === '') {
      nameText.textContent = '이름을 입력해 주세요.';
      css(userName, 'border', '1px solid red');
    } else {
      nameText.textContent = '';
      css(userName, 'border', '1px solid blue');
    }
  }

  if (e.target.classList.contains('user-email')) {
    if (!isValidEmail(e.target.value)) {
      emailText.textContent = '이메일 형식으로 입력해 주세요.';
      css(userEmail, 'border', '1px solid red');
    } else {
      emailText.textContent = '';
      css(userEmail, 'border', '1px solid blue');
    }
  }

  if (e.target.classList.contains('user-tel')) {
    if (!isValidTel(e.target.value)) {
      telText.textContent = '휴대폰 번호를 입력해 주세요.';
      css(userTel, 'border', '1px solid red');
    } else {
      telText.textContent = '';
      css(userTel, 'border', '1px solid blue');
      enableElement(telButton);
    }
  }
});

/* -------------------------------------------------------------------------- */
/*                       주소검색 창 띄우기( daum API)                             */
/* -------------------------------------------------------------------------- */

const addressButton = getNode('.address__button');

function findAddr() {
  new daum.Postcode({
    width: '500',
    height: '500',
    oncomplete: function (data) {
      console.log(data);
    },
  }).open();
}

bindEvent(addressButton, 'click', findAddr);

/* -------------------------------------------------------------------------- */
/*                  회원가입 완료시 이름 로컬 스토리지에 저장                           */
/* -------------------------------------------------------------------------- */

const signUpButton = getNode('.sign-button');

function saveUserInfo() {
  const userIdValue = userId.value;
  const userNameValue = userName.value;
  const userPwValue = userPw.value;

  if (userIdValue && userNameValue && userPwValue) {
    const userInfo = {
      id: userIdValue,
      name: userNameValue,
      password: userPwValue,
    };

    localStorage.setItem('User', JSON.stringify(userInfo));

    alert('회원가입이 완료되었습니다.');

    window.location.href = '../../pages/login.html';
  } else {
    alert('모든 필수 정보를 입력하세요.');
  }
}

signUpButton.addEventListener('click', () => saveUserInfo());
