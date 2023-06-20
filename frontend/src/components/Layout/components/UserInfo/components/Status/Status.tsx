import { FC } from "react";

import { IStatusProps } from "./types";
import {
  CustomStatus,
  EditStatusArea,
  NoStatus,
  StatusWrapper,
} from "./styles";

const Status: FC<IStatusProps> = ({
  editStatus,
  statusLocal,
  isLoading,
  handleBlurSaveStatus,
  handleChangeStatusLocal,
  handleClickEditStatus,
}) => {
  return (
    <StatusWrapper>
      {editStatus ? (
        <EditStatusArea
          value={statusLocal}
          onBlur={handleBlurSaveStatus}
          onChange={handleChangeStatusLocal}
          autoFocus
          maxLength={100}
        />
      ) : (
        <CustomStatus $isLoading={isLoading} onClick={handleClickEditStatus}>
          {statusLocal?.trim() ? (
            statusLocal
          ) : (
            <NoStatus>add a status...</NoStatus>
          )}
        </CustomStatus>
      )}
    </StatusWrapper>
  );
};

export default Status;
