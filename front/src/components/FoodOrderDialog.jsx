import React from "react";
import {
  DialogContent,
  Dialog,
  DialogTitle,
  DialogActions,
} from "@material-ui/core"; // "それらしい"スタイル
import styled from "styled-components";

// components
import { SubText } from "./StyledText";

// ボタン
import { CountUpButton } from "./Buttons/CountUpButton";
import { CountDownButton } from "./Buttons/CountDownButton";
import { OrderButton } from "./Buttons/OrderButton";

// 画像
import OrderHeaderImage from "../images/order-header.png";

const OrderHeader = styled.img`
  width: 100%;
  height: 350px;
`;

const DescriptionWrapper = styled.div`
  padding: 0 8px 8px 8px;
  height: 50px;
`;

// ボタン
const CountersWrapper = styled.div`
  margin-right: auto;
  display: flex;
  padding: 0 16px;
`;

const CountItem = styled.div`
  margin: 0 8px;
`;

const CountNum = styled.div`
  padding-top: 10px;
`;

const OrderTextWrapper = styled.div`
  display: flex;
`;

const OrderButtonTextWrapper = styled.div`
  width: 300px;
`;

const PriceWrapper = styled.div`
  padding-top: 4px;
`;

// 親: Foods.jsx
// 仕様
// 数量の初期値: 親に記載
// 1 <= 数量 <= 9: 子に記載
// モーダル画面
export const FoodOrderDialog = ({
  food, // 選んだフード 親ではselectedFoodという名
  countNumber, // 数量
  isOpen, // モーダル開閉状態
  onClose, // モーダル閉じる
  onClickCountUp, // + 1 親にロジックあり
  onClickCountDown, // -1 親にロジックあり
  onClickOrder, // 仮注文ボタンが押された
}) => {
  return (
    <Dialog open={isOpen} onClose={onClose}>
      {/* 画像 */}
      <OrderHeader src={OrderHeaderImage} alt="order header" />
      <DialogTitle>{food.name}</DialogTitle>
      <DialogContent>
        <DescriptionWrapper>
          <SubText>{food.description}</SubText>
        </DescriptionWrapper>
      </DialogContent>

      <DialogActions>
        {/* 数量を操作するアクション */}
        <CountersWrapper>
          <CountItem>
            <CountDownButton
              onClick={() => onClickCountDown()}
              // 数量が1以下だったら、カウントダウンさせない
              isDisabled={countNumber <= 1}
            />
          </CountItem>
          <CountItem>
            <CountNum>{countNumber}</CountNum>
          </CountItem>
          <CountItem>
            <CountUpButton
              onClick={() => onClickCountUp()}
              // 数量が9以上だったら、カウントアップさせない
              isDisabled={countNumber >= 9}
            />
          </CountItem>
        </CountersWrapper>
        <OrderButton onClick={() => onClickOrder()}>
          <OrderTextWrapper>
            <OrderButtonTextWrapper>
              {`${countNumber}点を注文に追加`}
            </OrderButtonTextWrapper>
            <PriceWrapper>{`¥${countNumber * food.price}`}</PriceWrapper>
          </OrderTextWrapper>
        </OrderButton>
      </DialogActions>
    </Dialog>
  );
};
