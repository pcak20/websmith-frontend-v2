import React from "react";
import { TEMPLATE_REGISTRY } from "../../../templates/conf";

function useTemplate(templateId) {
  const templateConf = TEMPLATE_REGISTRY[templateId].conf;
  const EditorRouter = templateConf.editorRouter;
  const availablePages = templateConf.availablePages;
  const themes = templateConf.themes;

  return { EditorRouter, availablePages, themes };
}

export default useTemplate;
