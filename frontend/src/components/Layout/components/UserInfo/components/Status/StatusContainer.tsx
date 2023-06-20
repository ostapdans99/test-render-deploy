import { ChangeEvent, useState } from "react";

import { useUserProfileCache } from "hooks";
import { useChangeStatus } from "api/user";
import { generateNotification } from "utils/generateNotification";

import Status from "./Status";
import { MESSAGES } from "../constants";

const StatusContainer = () => {
  const { isLoading, mutate: changeStatus } = useChangeStatus();

  const userProfile = useUserProfileCache();

  const status = userProfile?.status;

  const [statusLocal, setStatusLocal] = useState(status);
  const [editStatus, setEditStatus] = useState(false);

  const handleChangeStatusLocal = (event: ChangeEvent<HTMLTextAreaElement>) => {
    setStatusLocal(event.target.value);
  };

  const handleClickEditStatus = () => {
    setEditStatus(true);
  };

  const handleBlurSaveStatus = () => {
    statusLocal !== undefined && changeStatus({ status: statusLocal.trim() });
    setEditStatus(false);
  };

  isLoading && generateNotification({ type: "info", content: MESSAGES.CHANGE });

  return (
    <Status
      editStatus={editStatus}
      statusLocal={statusLocal}
      isLoading={isLoading}
      handleBlurSaveStatus={handleBlurSaveStatus}
      handleChangeStatusLocal={handleChangeStatusLocal}
      handleClickEditStatus={handleClickEditStatus}
    />
  );
};

export default StatusContainer;
