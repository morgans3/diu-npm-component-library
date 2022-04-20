export interface iInpatientCounts {
  id: number;
  dcCategory: string;
  dcCount: number;
  ipCategory: string;
  ipCount: number;
  ecsCategory: string;
  ecsIpTotal: number;
  epcCategory: string;
  epcIpTotal: number;
  totalCategory: string;
  totalCount: number;
  otherCategory: string;
  otherCount: number;
  admit: string;
  admitToday: number;
  disch: string;
  dischToday: number;
  dNow: string;
}

export interface iOutpatientCounts {
  id: number;
  new: string;
  newCount: number;
  fup: string;
  fupCount: number;
  dna: string;
  dnacount: number;
  total: number;
  cancelled: number;
  dNow: string;
}

export interface iAECounts {
  id: number;
  ambCat: string;
  ambTot: number;
  noneAmbCat: string;
  noneAmbTot: number;
  total: string;
  totals: number;
  ecsCategory: string;
  ecsAeTotal: number;
  epcCategory: string;
  epcAeTotal: number;
  category: string;
  aetoday: number;
  dispCat: string;
  admittedTot: number;
  dnow: number;
  dateAdded: Date;
}

export interface iEPCCounts {
  countNeighbourhoodActiveEPC: number;
  activeNonEPC: number;
}

export interface iECSCounts {
  row: string;
  awaitStatus: string;
  awaitTotals: number;
  curStatus: string;
  curTotals: number;
  allTotals: number;
}
