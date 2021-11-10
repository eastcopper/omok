import React, { useCallback, useMemo, useState } from "react";
import * as S from "./styles";
// import { Compare } from "../compare";
import { data } from "../../lib/export";

export default function Board() {
  const [board, SetBoard] = useState(data);

  const [put, setPut] = useState(false);
  const change = useCallback(
    (i, j) => {
      setPut(!put);
      SetBoard(board, (board[i][j] = 1));
      //   Compare(board);
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
                <button id={`${i} ${j}`} onClick={() => change(i, j)}>
                  {index}
                </button>
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
