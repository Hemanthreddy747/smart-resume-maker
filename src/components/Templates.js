import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import ListTemplates from "./ListTemplates";
import SavedResumesModal from "./SavedResumesModal";
import ResumeView from "./ResumeView";

export default function Templates() {
  const [isSavedModalOpen, setSavedModalOpen] = useState(false);
  const navigate = useNavigate();

  return (
    <>
      <ListTemplates
        onOpenSaved={() => setSavedModalOpen(true)}
        onSelectTemplate={(id) => navigate(`/edit-template?template=${id}`)}
        renderPreview={(t) => (
          <div
            style={{
              padding: 0,
              maxHeight: 520,
              overflow: "hidden",
              position: "relative",
              background: "#fff",
            }}
          >
            <div
              style={{
                transform: "scale(0.5)",
                transformOrigin: "top left",
                width: "200%",
                height: "200%",
              }}
            >
              <ResumeView
                data={t.content}
                editable={false}
                isPreview={true}
                templateId={t.id}
              />
            </div>
          </div>
        )}
      />
      <SavedResumesModal
        isOpen={isSavedModalOpen}
        onClose={() => setSavedModalOpen(false)}
        onOpenResume={(item) => {
          setSavedModalOpen(false);
          navigate(`/edit-template?template=${item.templateId}`, {
            state: { resume: item.content, templateId: item.templateId },
          });
        }}
      />
    </>
  );
}
