import React, { useCallback, useMemo, useState } from "react";
import * as S from "./styles";
import { EverythingCompare } from "../../common/compare";
import { Ai } from "../../common/AI";

export default function Board({ data }) {
  const [board, setBoard] = useState(data);
  const [put, setPut] = useState(false);

  const change = useCallback(
    (i, j, e) => {
      setPut(!put); // 자신이 둘 수 있을 때
      if (board[i][j] === 0 && i !== 0 && i !== 14 && j !== 14) {
        setBoard(board, (board[i][j] = 1)); // 배열 넣기
        const coordinate = {
          board: board,
          y: i,
          x: j,
        };
        EverythingCompare(board, i, j);
        setTimeout(() => {
          // 0.3초 후에 AI 돌 놓기
          Ai(coordinate, setBoard);
        }, 300); // AI 돌 놓기
        e.target.style = "opacity: 1;";
      } else {
        if (i === 0 || i === 14 || j === 14) {
          alert("놓을 수 없는 구역입니다!");
        } else {
          alert("중복된 자리에는 놓을 수 없습니다!");
        }
      }
    },
    [board, put]
  );

  const boardMemo = useMemo(() => {
    console.log(board);
    return (
      <>
        {board.map((block, i) => (
          <tr>
            {block.map((index, j) => (
              <th>
                <div
                  id={`${i} ${j}`}
                  className="stone"
                  onClick={(e) => change(i, j, e)}
                >
                  <span>{index}</span>
                </div>
              </th>
            ))}
          </tr>
        ))}
      </>
    );
  }, [board, change]);

  function restart() {
    setBoard([
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    ]);
    for (let i = 0; i < 15; i++) {
      for (let j = 0; j < 15; j++) {
        document.getElementById(`${i} ${j}`).style = "opacity: 0;";
      }
    }
  }

  return (
    <>
      <S.GameBoard>
        <button onClick={restart}>다시하기</button>
        <table>{boardMemo}</table>
      </S.GameBoard>
    </>
  );
}
