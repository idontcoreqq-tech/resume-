import BasicInfo from "./FormSections/BasicInfo.jsx";
import Contacts from "./FormSections/Contacts.jsx";
import Experience from "./FormSections/Experience.jsx";
import Education from "./FormSections/Education.jsx";
import Languages from "./FormSections/Languages.jsx";
import Skills from "./FormSections/Skills.jsx";
import AiContent from "./FormSections/AiContent.jsx";

export default function FormEditor(props) {
  return (
    <div className="form-editor">
      <BasicInfo {...props} />
      <Contacts {...props} />
      <Skills {...props} />
      <Experience {...props} />
      <Education {...props} />
      <Languages {...props} />
      <AiContent {...props} />
    </div>
  );
}
