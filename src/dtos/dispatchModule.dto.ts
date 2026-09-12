export type DispatchEntity =
  | { type: "operator"; name: string }
  | { type: "alliance"; name: string };

export type DispatchModuleEntryDto = {
  sources: DispatchEntity[];
  targets: DispatchEntity[];
  odds?: string;
  note?: string;
};

export type DispatchModuleSectionDto = {
  early: DispatchModuleEntryDto[];
  noChoice: DispatchModuleEntryDto[];
  midLate: DispatchModuleEntryDto[];
};
