import { Achievements } from "./achievements";
import { Interests } from "./interests";
import { ProfileSection } from "./profile-section";

const AboutContent = () => {
  return (
    <>
      <ProfileSection />
      <Achievements />
      <Interests />
    </>
  );
};
export default AboutContent;
