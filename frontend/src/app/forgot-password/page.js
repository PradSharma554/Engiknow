import ForgotPasswordContainer from "@/Container/Auth/ForgotPasswordContainer";
import ForgotPasswordWrapper from "@/components/pageWrapper/Auth/ForgotPasswordWrapper";

export const metadata = {
  title: "Forgot Password | Engiknow",
  description: "Reset your Engiknow password",
};

export default function ForgotPasswordPage() {
  return (
    <ForgotPasswordContainer>
      <ForgotPasswordWrapper />
    </ForgotPasswordContainer>
  );
}
