import { ChangeEvent } from "react";

export interface IStatusProps {
  editStatus: boolean;
  statusLocal: string | undefined;
  isLoading: boolean;
  handleBlurSaveStatus: () => void;
  handleChangeStatusLocal: (event: ChangeEvent<HTMLTextAreaElement>) => void;
  handleClickEditStatus: () => void;
}

export interface ICustomStatusStyledProps {
  $isLoading: boolean;
}
