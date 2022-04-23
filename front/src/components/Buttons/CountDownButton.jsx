import React from "react";

import { RoundButton } from "../shared_style";

// カウントダウンボタン
export const CountDownButton = ({ onClick, isDisabled }) => (
  <RoundButton onClick={onClick} disabled={isDisabled}>
    ー
  </RoundButton>
);
