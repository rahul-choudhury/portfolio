import type { ComponentType } from "react";

export type LabComponentProps = {
  compact?: boolean;
};

export type Lab = {
  slug: string;
  title: string;
  Preview: ComponentType<LabComponentProps>;
};
