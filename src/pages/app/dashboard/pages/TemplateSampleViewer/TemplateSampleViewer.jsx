import { useParams } from "react-router-dom";
import { TEMPLATE_REGISTRY } from "../../../../templates/conf";

function TemplateSampleViewer() {
  const { templateId } = useParams();
  const template = TEMPLATE_REGISTRY[templateId];

  if (!template) {
    return <div>Template not found</div>;
  }
  const RouterComponent = template.router;
  return <RouterComponent />;
}

export default TemplateSampleViewer;
