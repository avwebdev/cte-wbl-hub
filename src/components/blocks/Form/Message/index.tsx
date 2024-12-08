import type { SerializedEditorState } from "lexical";
import React from "react";
import RichText from "@/components/RichText";

import { Width } from "../Width";

export const Message: React.FC = ({ message }: { message: SerializedEditorState }) => {
  return (
    <Width className="my-12" width="100">
      {message && <RichText data={message} />}
    </Width>
  );
};
