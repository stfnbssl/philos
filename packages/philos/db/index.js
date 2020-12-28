/*
    artifact generator: C:\My\wizzi\stfnbssl\philos\node_modules\wizzi-js\lib\artifacts\js\module\gen\main.js
    primary source IttfDocument: C:\My\wizzi\stfnbssl\philos\packages\philos\.wizzi\db\index.js.ittf
*/
'use strict';
/**
     Use this to test packages in the monoropo before publishing to npm.
     Override '$virtual requireWizzi' to use the wizzi package version under development.
     Append wizzi factory plugins to '$hook plugins', using the 'pluginsBaseFolder' property
     to use plugins under development.
*/
var path = require('path');
var fs = require('fs');
var stringify = require('json-stringify-safe');
var async = require('async');
var wizziUtils = require('wizzi-utils');
var verify = wizziUtils.verify;
var file = wizziUtils.file;
var wizzi = null;
function createWizziFactory(globalContext, callback) {
    if (wizzi == null) {
        // The wizzi package will be the npm version from wizzi/node_modules
        wizzi = require('wizzi');
    }
    console.log('"wizzi" package version', wizzi.version);
    wizzi.fsnoaclFactory({
        plugins: {
            items: [
                './index.js'
            ], 
            pluginsBaseFolder: path.resolve(__dirname, '..', '..', 'wizzi.plugin.philos', 'dist')
        }, 
        globalContext: globalContext || {}
    }, callback);
}
function loadMTree(ittfDocumentUri, context, callback) {
    createWizziFactory({}, function(err, wf) {
        if (err) {
            return callback(err);
        }
        wf.loadMTree(ittfDocumentUri, context, callback);
    });
}
function loadWizziModel(ittfDocumentUri, context, callback) {
    var fi = fileInfoByPath(ittfDocumentUri);
    createWizziFactory({}, function(err, wf) {
        if (err) {
            return callback(err);
        }
        wf.loadModel(fi.schema, ittfDocumentUri, {
            mTreeBuildUpContext: context, 
            globalContext: {}
        }, callback);
    });
}
function loadWizziModelAndSaveToJson(ittfDocumentUri, context, outputFolder, callback) {
    var fi = fileInfoByPath(ittfDocumentUri);
    loadWizziModel(ittfDocumentUri, context, function(err, model) {
        if (err) {
            return callback(err);
        }
        file.write(path.join(outputFolder, fi.basename + '.json'), stringify(model.toJson(), null, 4));
        return callback(null);
    });
}
function loadModelAndGenerateArtifact(ittfDocumentUri, context, artifactName, callback) {
    var fi = fileInfoByPath(ittfDocumentUri);
    createWizziFactory({}, function(err, wf) {
        if (err) {
            return callback(err);
        }
        wf.loadModelAndGenerateArtifact(ittfDocumentUri, {
            modelRequestContext: context, 
            artifactRequestContext: {}
        }, artifactName, callback);
    });
}
function loadModelAndTransform(ittfDocumentUri, context, transformName, callback) {
    var fi = fileInfoByPath(ittfDocumentUri);
    createWizziFactory({}, function(err, wf) {
        if (err) {
            return callback(err);
        }
        loadWizziModel(ittfDocumentUri, context, function(err, model) {
            if (err) {
                return callback(err);
            }
            wf.transformModel(model, transformName, context, callback);
        });
    });
}
function executeWizziJob(ittfDocumentUri, context, callback) {
    createWizziFactory({}, function(err, wf) {
        if (err) {
            return callback(err);
        }
        wf.executeJob({
            name: path.basename(ittfDocumentUri), 
            path: ittfDocumentUri, 
            productionOptions: wizzi.productionOptions({
                indentSpaces: 4, 
                basedir: __dirname, 
                verbose: 2
            }), 
            modelContext: context || {}, 
            jobContext: {}
        }, callback);
    });
}
function executeGenerateModelTypes(wfschemaIttfDocumentUri, outputPackagePath, wfschemaName, mTreeBuildUpContext, callback) {
    createWizziFactory({}, function(err, wf) {
        if (err) {
            return callback(err);
        }
        wf.generateModelTypes(wfschemaIttfDocumentUri, outputPackagePath, wfschemaName, mTreeBuildUpContext, callback);
    });
}
function generateArtifactsByNames(names, schema, artifact, callback) {
    async.mapSeries(names, (name, callback) => {
        var ittfDocumentUri = path.join(__dirname, 'ittf', name + '.' + schema + '.ittf');
        var outputPath = path.join(__dirname, 'dist', name + '.' + schema);
        loadModelAndGenerateArtifact(ittfDocumentUri, {}, artifact, function(err, artifactText) {
            if (err) {
                return callback(err);
            }
            file.write(outputPath, artifactText);
            return callback(null, artifactText);
        });
    }, callback);
}
function getFiles(srcpath, schema) {
    return fs.readdirSync(srcpath).filter((file) => {
            return fs.lstatSync(path.join(srcpath, file)).isFile() && verify.endsWith(file, (schema === 'ittf' ? '.ittf' : '.' + schema + '.ittf'));
        })
    ;
}
function fileInfoByPath(filePath, baseFolder) {
    if (typeof baseFolder === 'undefined') {
        baseFolder = path.dirname(filePath);
    }
    filePath = normalize(filePath);
    var basename = path.basename(filePath);
    var dirname = path.dirname(filePath);
    var relFolder = path.dirname(filePath).length > baseFolder.length ? path.dirname(filePath).substr(baseFolder.length + 1) : '';
    var fileUri = filePath.substr();
    var ss = basename.split('.');
    if (ss[ss.length-1] === 'ittf') {
        var name = ss.slice(0, ss.length-2).join('.');
        var schema = ss[ss.length-2];
        var mime = DEFAULT_MIME[schema] || schema;
        return {
                name: name, 
                basename: basename, 
                isIttfDocument: true, 
                isFragment: filePath.indexOf('/t/') > -1, 
                schema: schema, 
                mime: mime, 
                relFolder: relFolder, 
                fullPath: filePath, 
                destBasename: name + '.' + mime, 
                destRelPath: relFolder.length > 0 ? relFolder + '/' + name + '.' + mime : name + '.' + mime
            };
    }
    else {
        return {
                name: ss.slice(0, ss.length-1).join('.'), 
                basename: basename, 
                isIttfDocument: false, 
                schema: null, 
                mime: ss[ss.length-1], 
                relFolder: relFolder, 
                fullPath: filePath, 
                destBasename: basename, 
                destRelPath: relFolder.length > 0 ? relFolder + '/' + basename : basename
            };
    }
}
function normalize(filepath) {
    return verify.replaceAll(filepath, '\\', '/');
}
var DEFAULT_MIME = {
    css: 'css', 
    graphql: 'graphql', 
    html: 'html', 
    js: 'js', 
    json: 'json', 
    scss: 'scss', 
    text: 'text', 
    ts: 'ts', 
    xml: 'xml', 
    vtt: 'vtt', 
    vue: 'vue'
};
executeGenerateModules([
    'first'
], function(err, result) {
    if (err) {
        console.log('philos.examples.executeGenerateModules.err', err);
        console.log('philos.examples.executeGenerateModules.err.toString()', err.toString());
        if (err.inner) {
            console.log('philos.examples.executeGenerateModules.err.inner.toString()', err.inner.toString());
        }
    }
    else {
        console.log('philos.examples.executeGenerateModules.result', result);
    }
});
function executeGenerateModules(modules, callback) {
    async.mapSeries(modules, (module, callback) => {
        var ittfDocumentUri = path.join(__dirname, module + '.philos.ittf');
        var outputPath = path.join(__dirname, '..', 'json', module + '.philos');
        loadWizziModel(ittfDocumentUri, {}, function(err, model) {
            if (err) {
                return callback(err);
            }
            file.write(outputPath + '.json', stringify(model.toJson(), null, 4));
            loadModelAndTransform(ittfDocumentUri, {}, "philos/extended", function(err, model) {
                if (err) {
                    return callback(err);
                }
                file.write(outputPath + '.extended.json', stringify(model, null, 4));
                const replacer = new RegExp("'", 'g');
                file.write(outputPath + '.extended.jsonvar.js', "var jsonData = JSON.parse('" + stringify(model,null).replace(replacer,"\\'") + "');");
                return callback(null);
            });
        });
    }, callback);
}
