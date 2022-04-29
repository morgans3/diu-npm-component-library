/**
 * Image Meta Data
 */
export interface iImages {
    /**
     * Unique ID
     */
    id: string;
    /**
     * Filename as stored in S3
     */
    s3Filename: string;
    /**
     * URL for retrieving image
     */
    fileData: string;
    /**
     * Custom field for configuration options
     */
    config?: string;
}
