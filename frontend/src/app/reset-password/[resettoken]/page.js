import ResetPasswordContainer from "@/Container/Auth/ResetPasswordContainer";
import ResetPasswordWrapper from "@/components/pageWrapper/Auth/ResetPasswordWrapper";

export const metadata = {
  title: "Reset Password | Engiknow",
  description: "Set your new Engiknow password",
};

export default function ResetPasswordPage({ params }) {
  return (
    <ResetPasswordContainer params={params}>
      <ResetPasswordWrapper />
    </ResetPasswordContainer>
  );
}
