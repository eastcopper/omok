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
<<<<<<< HEAD
      e.target.style = "opacity: 1;";
=======
      e.target.style = "opacity: 1; background-color: black;";
>>>>>>> master
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

  return (
    <>
      <S.GameBoard>
        <table>{boardMemo}</table>
      </S.GameBoard>
    </>
  );
}
