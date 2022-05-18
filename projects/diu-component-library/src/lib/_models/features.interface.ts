export interface FeatureCollection {
    type: "FeatureCollection";
    name?: string;
    crs: Crs;
    features: Feature[];
}

export interface Feature {
    type: string;
    id?: number;
    properties: Properties;
    geometry: Geometry;
}

export interface Geometry {
    type: string;
    coordinates: any;
}

export interface Properties {
    Code?: string;
    Name?: string;
    Lat?: number;
    Long?: number;
    wd15cd?: string;
    wd15nm?: string;
    wd15nmw?: any;
    lad15cd?: string;
    lad15nm?: string;
    objectid?: number;
    st_lengths?: number;
    st_areasha?: number;
    MosaicType?: string;
    MosaicGroup?: string;
    POSTCODE?: string;
    MosType?: string;
    Pop?: number;
    rmapshaperid?: number;
}

export interface Crs {
    type: string;
    properties: CRSProperties;
}

export interface CRSProperties {
    name: string;
}
