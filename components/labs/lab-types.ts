import type { ComponentType } from "react";

export type LabComponentProps = {
  compact?: boolean;
};

export type Lab = {
  slug: string;
  title: string;
  description: string;
  Preview: ComponentType<LabComponentProps>;
  Demo: ComponentType<LabComponentProps>;
};
