import * as Yup from "yup";

export const projectSchema = Yup.object({
  projectName: Yup.string()
    .min(2, "Project name must be at least 2 characters")
    .max(24, "Project name must be less than or equal to 24 characters")
    .required("Please enter project name"),
  
  inviteMembers: Yup.string()
    .email("Invalid email address")
    .min(2, "Email must be at least 2 characters")
    .max(24, "Email must be less than or equal to 24 characters")
    .required("Please enter email"),
});
