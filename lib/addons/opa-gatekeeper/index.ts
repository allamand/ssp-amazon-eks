import { ClusterAddOn, ClusterInfo } from "../../spi";
// import { AppMeshAddOn } from '../appmesh/index';


/**
 * Properties available to configure opa gatekeeper
 */
export interface OpaGatekeeperAddOnProps {

    /** Default namespace
     * @default gatekeeper-system
     */
    namespace?: string;

    /**
     * Helm chart version to use to install.
     * @default 3.6.0
     */
    version?: string;

    /**
     * values to pass to the helm chart per https://github.com/open-policy-agent/gatekeeper/tree/master/charts/gatekeeper
     */
     values?: {
        [key: string]: any;
    };
}

/**
 * Defaults options for the gatekeeper add-on
 */

const defaultProps: OpaGatekeeperAddOnProps = {
    namespace: 'gatekeeper-system',
    version: '3.6.0',
    values: {}
};

export class OpaGatekeeperAddOn implements ClusterAddOn {
    private options: OpaGatekeeperAddOnProps;
    static node: any;
    
    constructor(props?: OpaGatekeeperAddOnProps) {
        this.options = { ...defaultProps, ...props };
    }
    deploy(clusterInfo: ClusterInfo): void {
        clusterInfo.cluster.addHelmChart("OpaGatekeeperAddOn", {
            chart: "gatekeeper",
            release: "gatekeeper",
            repository: "https://open-policy-agent.github.io/gatekeeper/charts",
            version: this.options.version,
            namespace: this.options.namespace,
            values: this.options.values
        });
        // OpaGatekeeperAddOn.node.addDependency(AppMeshAddOn)
    }
}