export const templateConfigs = {
  1: {
    name: "Classic Professional",
    description: "Traditional blue theme",
    primaryColor: "#2b6cb0",
    secondaryColor: "#3182ce",
    accentBg: "#ebf4ff",
    fontFamily: "'Inter', Arial, sans-serif",
    headerAlign: "center",
    sectionBorderStyle: "2px solid #2b6cb0",
    skillBadgeBg: "#ebf4ff",
    skillBadgeColor: "#1a365d",
    nameColor: "#000",
    titleColor: "#000",
    skillsLayout: "grid",
    skillBorderRadius: "4px",
    skillPadding: "6px 10px",
  },
  2: {
    name: "Modern Executive",
    description: "Elegant dark theme",
    primaryColor: "#1a202c",
    secondaryColor: "#2d3748",
    accentBg: "#edf2f7",
    fontFamily: "'Georgia', serif",
    headerAlign: "left",
    sectionBorderStyle: "none",
    sectionUnderline: "3px solid #1a202c",
    skillBadgeBg: "transparent",
    skillBadgeColor: "#1a202c",
    skillBorder: "1px solid #cbd5e0",
    nameColor: "#1a202c",
    titleColor: "#2d3748",
    skillsLayout: "flex",
    skillGap: "16px 10px",
    skillBorderRadius: "20px",
    skillPadding: "8px 16px",
  },
  3: {
   
  },
};

export const getTemplateStyles = (templateId = 1) => {
  return templateConfigs[templateId] || templateConfigs[1];
};
