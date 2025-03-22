// Imports
import { Grid } from "@mui/material";
import PageContainer from "@/app/components/container/PageContainer";
import ChangePasswordForm from "@/app/components/user/ChangePasswordForm";

const ChangePassword = () => (
  <PageContainer title="Change password" description="Change password">
    <Grid container spacing={3}>
      <Grid item lg={12} md={12} xs={12}>
        <ChangePasswordForm />
      </Grid>
    </Grid>
  </PageContainer>
);

export default ChangePassword;
