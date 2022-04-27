export interface NiceResponse {
    Title:        string;
    SearchResult: SearchResult;
    Resources:    Resource[];
    LastModified: string;
    Uri:          string;
    TitleContent: null;
}
export interface Resource {
    Rel:          string;
    Uri:          string;
    Title:        string;
    TitleContent: null;
}
export interface SearchResult {
    Debug:                      Debug;
    Failed:                     boolean;
    ErrorMessage:               null;
    ParentResultUrl:            null;
    ResultCount:                number;
    RolledUpCount:              number;
    UnrolledCount:              number;
    Documents:                  Document[];
    PagerLinks:                 PagerLinks;
    PageSize:                   number;
    FirstResult:                number;
    LastResult:                 number;
    FinalSearchText:            string;
    FinalSearchTextNoStopWords: string;
    OriginalSearch:             null;
    Navigators:                 Navigator[];
    UnfilteredResultsUrl:       null;
}
export interface Debug {
    RawResponse: string;
}
export interface Document {
    Id:                         string;
    TagsHigh:                   null;
    GuidanceRef:                null;
    Xml:                        null;
    Abstract:                   string;
    MetaDescription:            string;
    Accredited:                 boolean;
    AlternativePublicationDate: null;
    AltSourceNames:             string[];
    AreaOfInterest:             null;
    Breadcrumbs:                null;
    ChildDocumentCount:         number;
    ChildDocuments:             any[];
    ChildDocumentsUrl:          null;
    ClusterId:                  number;
    EvidenceTypes:              EvidenceType[];
    Impact:                     null;
    Content:                    null;
    ContentId:                  string;
    Index:                      number;
    LessSuitableForPrescribing: boolean;
    NiceDocType:                any[];
    NiceGuidanceType:           any[];
    NiceAdviceType:             any[];
    NiceResultType:             null;
    ParentPathTitle:            null;
    ParentPathUrl:              null;
    ParentPathWayUrl:           null;
    PathAndQuery:               string;
    PublicationDate:            null | string;
    LastUpdated:                null;
    ResourceType:               any[];
    GuidanceStatus:             any[];
    PublicationType:            null | string;
    Publisher:                  null | string;
    ResourceCategory:           null;
    RelatedLinks:               null;
    RelatedLinkList:            RelatedLinkList;
    SourceName:                 string;
    SourceUrl:                  string;
    StaticAbstract:             null | string;
    SubSectionLinks:            null;
    SummaryUrl:                 SummaryURL | null;
    Tags:                       any[];
    Teaser:                     string;
    Title:                      string;
    TitleNoHtml:                null;
    BoostValue:                 number;
    Score:                      number;
    TitleParts:                 string[];
    UKMISummaryUrl:             null | string;
    Url:                        string;
    Debug:                      null;
}
export enum EvidenceType {
    EvidenceSummaries = "Evidence Summaries",
    Guidance = "Guidance",
    GuidanceAndPolicy = "Guidance and Policy",
    PrescribingAndTechnicalInformation = "Prescribing and Technical Information",
    SafetyAlerts = "Safety Alerts",
    SecondaryEvidence = "Secondary Evidence",
}
export interface RelatedLinkList {
}
export interface SummaryURL {
    ci:      string;
    id:      number;
    fullUrl: string;
}
export interface Navigator {
    DisplayName: string;
    ShortName:   ShortName;
    Modifiers:   Modifier[];
}
export interface Modifier {
    Active:             boolean;
    DisplayName:        string;
    Excluding:          boolean;
    NavigatorShortName: ShortName;
    ResultCount:        number;
    ToggleUrl:          Next;
    ChildNavigators:    null;
}
export enum ShortName {
    Acc = "acc",
    Ain = "ain",
    DRM = "drm",
    Ety = "ety",
    Srn = "srn",
}
export interface Next {
    fullUrl: string;
}
export interface PagerLinks {
    Previous: null;
    First:    null;
    Pages:    Page[];
    Next:     Next;
}
export interface Page {
    Title:     string;
    url:       Next;
    IsCurrent: boolean;
}
