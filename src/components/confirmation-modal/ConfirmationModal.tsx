import React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import type { ConfirmationModalProps } from "./type";

const ConfirmationModal: React.FC<ConfirmationModalProps> = ({
  open,
  // onConfirm,
  onCancel,
  trade,
}) => {
  return (
    <Dialog open={open} onOpenChange={(open) => !open && onCancel()}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Confirmation</DialogTitle>
        </DialogHeader>

        <div className="space-y-4 py-4">
          <div className="flex flex-col gap-2">
            <h3 className="font-semibold text-lg">
              {trade.contractSize} {trade.symbol}
            </h3>
            <p className="text-sm text-muted-foreground">
              Price: {trade.limitPrice}
            </p>
            <p className="text-sm text-muted-foreground">{trade.symbol}</p>
          </div>
        </div>

        <DialogFooter className="flex gap-2 sm:gap-0">
          <Button variant="outline" onClick={onCancel} className="w-full">
            Cancel
          </Button>
          {/* <Button onClick={onConfirm} className="w-full">
            Confirm
          </Button> */}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ConfirmationModal;
