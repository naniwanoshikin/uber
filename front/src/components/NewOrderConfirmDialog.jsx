import React from "react";

// components
import { DialogContent, Dialog, DialogTitle } from "@material-ui/core";
import { OrderButton } from "./Buttons/OrderButton";

// 親: Foods.jsx
// 新規注文モーダル: 例外失敗時_406エラーが返ってきた場合に出す
export const NewOrderConfirmDialog = ({
  isOpen, // 開閉
  onClose,
  existingRestaurautName, // 他店舗の名前
  newRestaurautName, // いま選択した店舗の名前
  onClickSubmit, // 仮注文の置き換えAPIを呼ぶ
}) => (
  <Dialog open={isOpen} onClose={onClose} maxWidth="xs">
    <DialogTitle>新規注文を開始しますか？</DialogTitle>
    <DialogContent>
      <p>
        {`ご注文に ${existingRestaurautName} の商品が含まれています。
          新規の注文を開始して ${newRestaurautName} の商品を追加してください。`}
      </p>
      <OrderButton onClick={onClickSubmit}>新規注文</OrderButton>
    </DialogContent>
  </Dialog>
);
