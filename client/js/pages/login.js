import { getNode, bindEvent } from '../../lib/index.js';

const loginButton = getNode('.login--button');
const loginIdInput = getNode('.login-id');
const loginPwInput = getNode('.login-pw');

function checkLogin() {
  // 로컬 스토리지에서 사용자 정보 가져오기
  const storedUserInfo = JSON.parse(localStorage.getItem('User'));

  // 입력한 아이디와 비밀번호
  const inputId = loginIdInput.value;
  const inputPw = loginPwInput.value;

  // 사용자 정보가 없거나, 아이디 또는 비밀번호가 일치하지 않으면 실패
  if (
    !storedUserInfo ||
    storedUserInfo.id !== inputId ||
    storedUserInfo.password !== inputPw
  ) {
    alert('로그인 실패: 아이디 또는 비밀번호가 일치하지 않습니다.');
    return;
  }

  // 성공적으로 로그인
  alert('로그인 성공!');

  // 홈으로 이동
  window.location.href = '/';
}

loginButton.addEventListener('click', checkLogin);
