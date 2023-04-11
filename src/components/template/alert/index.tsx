import * as RadixAlertDialog from "@radix-ui/react-alert-dialog";
import { styled } from "@styles/stitches.config";

const AlertDialogRoot = styled(RadixAlertDialog.Root, {});
const AlertDialogTrigger = styled(RadixAlertDialog.Trigger, {});
const AlertDialogCancle = styled(RadixAlertDialog.Cancel, {});
const AlertDialogAction = styled(RadixAlertDialog.Action, {});
const AlertDialogPortal = styled(RadixAlertDialog.Portal, {});

const AlertDialogContent = styled(RadixAlertDialog.Content, {
  position: "fixed",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
});

const AlertDialogOverlay = styled(RadixAlertDialog.Overlay, {
  width: "100%",
  position: "fixed",
  top: 0,
  bottom: 0,
  bc: "$gary09",
  opacity: 0.7,
});

export {
  AlertDialogRoot as Root,
  AlertDialogTrigger as Trigger,
  AlertDialogCancle as Cancel,
  AlertDialogAction as Action,
  AlertDialogPortal as Portal,
  AlertDialogContent as Content,
  AlertDialogOverlay as Overlay,
};
