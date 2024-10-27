import React from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import Button from "@mui/material/Button";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import EditQuizQuestion from "./editQuizQuestion";

interface QuestionProps {
  isOpen: boolean;
  closeDrawer: () => void;
  isEdit: boolean;
  existingCourseId?: number | string;
}

const QuestionsDrawer: React.FC<QuestionProps> = ({
  isOpen,
  closeDrawer,
  isEdit,
  existingCourseId,
}) => {
  return (
    <div>
      <Drawer open={isOpen} onClose={closeDrawer}>
        <EditQuizQuestion
          closeDrawer={closeDrawer}
          isEdit={isEdit}
          existingCourseId={existingCourseId ?? ""}
        />
      </Drawer>
    </div>
  );
};

export default QuestionsDrawer;
