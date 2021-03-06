import { ApplicationWithRepositories } from '@loopback/repository';
import { ArtifactOptions } from '../types';
import { BaseArtifactBooter } from './base-artifact.booter';
/**
 * A class that extends BaseArtifactBooter to boot the 'DataSource' artifact type.
 * Discovered DataSources are bound using `app.dataSource()`.
 *
 * Supported phases: configure, discover, load
 *
 * @param app - Application instance
 * @param projectRoot - Root of User Project relative to which all paths are resolved
 * @param bootConfig - DataSource Artifact Options Object
 */
export declare class DataSourceBooter extends BaseArtifactBooter {
    app: ApplicationWithRepositories;
    datasourceConfig: ArtifactOptions;
    constructor(app: ApplicationWithRepositories, projectRoot: string, datasourceConfig?: ArtifactOptions);
    /**
     * Uses super method to get a list of Artifact classes. Boot each file by
     * creating a DataSourceConstructor and binding it to the application class.
     */
    load(): Promise<void>;
}
/**
 * Default ArtifactOptions for DataSourceBooter.
 */
export declare const DataSourceDefaults: ArtifactOptions;
