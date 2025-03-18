// Imports
import React from "react";
import PageContainer from "@/app/components/container/PageContainer";
import FormWizardSteps from "@/app/components/forms/form-wizard/FormWizardSteps";

const FormWizard = () => {
  return (
    <PageContainer title="User profile" description="User profile">
      <FormWizardSteps />
    </PageContainer>
  );
};

export default FormWizard;
