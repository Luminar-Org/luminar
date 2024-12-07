import type { DualDexTradeParams, Trade } from "../../types";

export interface ConfirmationModalProps {
  open: boolean;
  // onConfirm: () => void;
  onCancel: () => void;
  trade: DualDexTradeParams;
}
