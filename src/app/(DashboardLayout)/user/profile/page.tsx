// Imports
import { Grid } from "@mui/material";
import PageContainer from "@/app/components/container/PageContainer";
import { FbBasicHeaderForm } from "@/app/components/forms/form-layouts/index";

const FormLayouts = () => (
  <PageContainer title="User profile" description="User profile">
    <Grid container spacing={3}>
      <Grid item lg={12} md={12} xs={12}>
        <FbBasicHeaderForm />
      </Grid>
    </Grid>
  </PageContainer>
);

export default FormLayouts;
