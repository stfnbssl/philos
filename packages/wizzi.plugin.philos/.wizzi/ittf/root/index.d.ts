type cb<T> = (err: any, result: T) => void;

interface IttfDocumentStore {
}

interface ProductionContext {
}

interface ProductionManager {
    productionContext: ProductionContext;
}

interface WizziModel {
}

type WizziModelOrPOJO = WizziModel | Object;

interface LoadModelContext {
    __ittfDocumentStore: IttfDocumentStore;
    __productionManager: ProductionManager;
    mTreeBuildUpContext : WizziModelOrPOJO;
}

function loadModel(ittfDocumentUri: string, loadContext: LoadModelContext, callback: cb<WizziModel>) : void;

interface ModelFactory {
    createLoadModel(wizziObject: WizziObject) : loadModel;
}

interface ModelTransformer {
    trans(model: WizziModelOrPOJO, ctx: GenContext, callback: cb<WizziModelOrPOJO>): void
}

interface ArtifactGenerator {
    gen(model: WizziModelOrPOJO, ctx: GenContext, callback: cb<string>): void
}

interface provides {
    schemas: string[];
    modelTransformers: string[];
    artifactGenerators: string[];
}

interface FactoryPlugin {
    getName() : string;
    getFilename() : string;
    getModelFactory(schemaName: string) : ModelFactory;
    getModelTransformer(transformerName: string) : ModelTransformer;
    getArtifactGenerator(artifactName: string) : ArtifactGenerator;
    getSchemaDefinition(schemaName: string) : Object;
    getProvides() : provides;
}

interface WizziPackage {
    file: WizziFile
}

interface PluginOptions {
    // TODO, currently empty
}

export function createFactoryPlugin(wizziPackage: WizziPackage, options: PluginOptions, callback: cb<FactoryPlugin>): void;