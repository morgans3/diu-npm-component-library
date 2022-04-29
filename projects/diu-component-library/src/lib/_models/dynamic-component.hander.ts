import { cComponentHandler } from "./componentHandler";

/**
 * This class is responsible for any functionality that will happen to all dynamic components.
 */
export class dynamicContentHandler extends cComponentHandler {
    data: any;
    /**
     * Class Constructor
     * @param data - Data for the component that's unique to each component (Labels, for example)
     * @param config - The configeration required to load the component correctly
     */
    constructor(data: any, config: any) {
        super(config);
        if (data) this.data = data;
    }
}
