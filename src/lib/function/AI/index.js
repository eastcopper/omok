/* eslint-disable no-sequences */
/* eslint-disable no-loop-func */
import { Compare, EverythingCompare, MainCompare } from "../compare";

let beforeX, beforeY;

export function Ai(manage) {
  let y, x; // 좌표 선언
  const drawStyle = "opacity: 1; background-color: white;"; // 색 및 투명도
  if (
    Compare(1, 0, -1, 0, manage, manage.y, manage.x) !== 0 ||
    Compare(0, 1, 0, -1, manage, manage.y, manage.x) !== 0 ||
    Compare(1, 1, -1, -1, manage, manage.y, manage.x) !== 0 ||
    Compare(1, -1, -1, 1, manage, manage.y, manage.x) !== 0
  ) {
    // 흑돌 주변에 아무 것도 없을 때
    for (let i = 3; i > 0; i--) {
      if (Compare(1, 0, -1, 0, manage, beforeY, beforeX) >= i) {
        // 가로로 공격할 때
        Put(1, 0, -1, 0, beforeY, beforeX);
        return (document.getElementById(`${y} ${x}`).style = drawStyle);
      } else if (Compare(0, 1, 0, -1, manage, beforeY, beforeX) >= i) {
        // 세로로 공격할 때
        Put(0, 1, 0, -1, beforeY, beforeX);
        return (document.getElementById(`${y} ${x}`).style = drawStyle);
      } else if (Compare(1, 1, -1, -1, manage, beforeY, beforeX) >= i) {
        // 대각선으로 공격할 때
        Put(1, 1, -1, -1, beforeY, beforeX);
        return (document.getElementById(`${y} ${x}`).style = drawStyle);
      } else if (Compare(1, -1, -1, 1, manage, beforeY, beforeX) >= i) {
        // 대각선(반대)으로 공격할 때
        Put(1, -1, -1, 1, beforeY, beforeX);
        return (document.getElementById(`${y} ${x}`).style = drawStyle);
      } else if (Compare(1, 0, -1, 0, manage, manage.y, manage.x) >= i) {
        // 가로로 공격을 받았을 때
        Put(1, 0, -1, 0, manage.y, manage.x);
        return (document.getElementById(`${y} ${x}`).style = drawStyle);
      } else if (Compare(0, 1, 0, -1, manage, manage.y, manage.x) >= i) {
        // 세로로 공격을 받았을 때
        Put(0, 1, 0, -1, manage.y, manage.x);
        return (document.getElementById(`${y} ${x}`).style = drawStyle);
      } else if (Compare(1, 1, -1, -1, manage, manage.y, manage.x) >= i) {
        // 대각선으로 공격을 받았을 때
        Put(1, 1, -1, -1, manage.y, manage.x);
        return (document.getElementById(`${y} ${x}`).style = drawStyle);
      } else if (Compare(1, -1, -1, 1, manage, manage.y, manage.x) >= i) {
        // 대각선(반대)으로 공격을 받았을 떄
        Put(1, -1, -1, 1, manage.y, manage.x);
        return (document.getElementById(`${y} ${x}`).style = drawStyle);
      }
      function Put(x1, y1, x2, y2, Y, X) {
        const randomNumber = getRandomIntInclusive(0, 1);
        let tmp;
        if (randomNumber) {
          tmp = x1;
          x1 = x2;
          x2 = tmp;
          tmp = y1;
          y1 = y2;
          y2 = tmp;
        } // 랜덤으로 값 변경
        y = Y + y1 * (MainCompare(x1, y1, manage.board, Y, X, 0) + 1); // y좌표
        x = X + x1 * (MainCompare(x1, y1, manage.board, Y, X, 0) + 1); // x좌표 // 공격을 받았을 때 수비
        if (manage.board[y][x] === 0) {
          // 좌표가 빈 배열이라면 돌을 놓고 리턴
          setting();
          return y, x;
        } else {
          // 좌표가 빈 배열이 아니라면 반대쪽에 돌을 놓고 리턴
          y = Y + y2 * (MainCompare(x2, y2, manage.board, Y, X, 0) + 1); // x좌표 반대쪽
          x = X + x2 * (MainCompare(x2, y2, manage.board, Y, X, 0) + 1); // y좌표 반대쪽
          if (manage.board[y][x] === 0) {
            setting();
            return y, x;
          } else {
            return;
          }
        }
      }
    }
  } else {
    while (1) {
      y = manage.y + getRandomIntInclusive(-1, 1);
      x = manage.x + getRandomIntInclusive(-1, 1); // 랜덤
      if (manage.board[y][x] === 0) {
        // 빈 배열일 때
        setting();
        return (document.getElementById(`${y} ${x}`).style = drawStyle); // 돌 그리기
      }
    }
  }
  function setting() {
    manage.setBoard(manage.board, (manage.board[y][x] = 2)); // 백돌 놓기
    EverythingCompare(manage, y, x);
    EverythingCompare(manage, manage.y, manage.x); // 승리 조건
    manage.setPlay(manage.play, (manage.play.game = true)); // 게임 true로 설정
    beforeX = x;
    beforeY = y; // 이전 좌표 기억
  }
}

function getRandomIntInclusive(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
} // 랜덤 함수
