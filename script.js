// ==UserScript==
// @name        hide-anonymous
// @namespace   Violentmonkey Scripts
// @match       https://gall.dcinside.com/board/*
// @grant       none
// @version     1.1
// @author      -
// @description 디시 만갤 념글 유동글 숨기기
// ==/UserScript==
function getQueryParams() {
    const queryParams = {};
    location.search
        .slice(1) // '?'를 제거합니다.
        .split('&') // '&'로 분리하여 각각의 파라미터를 배열로 만듭니다.
        .forEach(function(param) {
            const parts = param.split('='); // '='를 기준으로 key와 value를 분리합니다.
            queryParams[parts[0]] = decodeURIComponent(parts[1]); // 오브젝트에 key-value 쌍을 추가합니다.
        });

    return queryParams;
}
function hideElements() {
    // 요소를 선택합니다.
    const rows = document.querySelectorAll('table.gall_list > tbody > tr.ub-content');

    // 각각의 요소에 대해 숨기는 조건을 검사합니다.
    rows.forEach(function(row) {
      const writerIP = row.querySelector('td.gall_writer.ub-writer > span.ip');
      const title = row.querySelector('td.gall_tit.ub-word > a:nth-child(1)');

      // 고정닉이면 예외 (고정닉이면 writerIP가 없음)
      if(writerIP===null)return;

      // 유동닉이고 제목에 특정 단어 포함되어 있으면 예외
      const isIncluded = ['번역)', '.manhwa', '단편'].some(word=>title.textContent.includes(word));
      if(isIncluded)return;

      row.style.display = 'none';

      //개발자 도구 열고 숨겨진 게시글 출력필터에 '['입력해서 검색
      console.log(`[${title.textContent}] is hidden. (${title.href})`);
    });
}
window.onload = function(){
  const params = getQueryParams();
  if(!params.id.includes('comic_new'))return;
  if(params.exception_mode!=='recommend')return;
  hideElements();
  setTimeout(hideElements,3000); // 3초 뒤 재검사
}
