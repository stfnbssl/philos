/*
    artifact generator: C:\My\wizzi\stfnbssl\wizzi\packages\wizzi-js\dist\lib\artifacts\js\module\gen\main.js
    package: wizzi-js@0.7.9
    primary source IttfDocument: C:\My\wizzi\stfnbssl\philos\packages\wizzi.plugin.philos\.wizzi\lib\artifacts\philos\document\gen\main.js.ittf
*/
'use strict';
var util = require('util');
var path = require('path');
var async = require('async');
var verify = require('wizzi-utils').verify;
var errors = require('../../../../../errors');
var prettify = require('wizzi-utils').prettifyFromString;

var myname = 'philos.artifacts.philos.document.gen.main';

var md = module.exports = {};


md.gen = function(model, ctx, callback) {
    if (typeof(callback) !== 'function') {
        throw new Error(error('InvalidArgument', 'gen', 'The callback parameter must be a function. Received: ' + callback, model));
    }
    if (verify.isObject(model) == false) {
        return callback(error('InvalidArgument', 'gen', 'The model parameter must be an object. Received: ' + model, model));
    }
    if (model.wzElement !== 'philos') {
        callback(error('InvalidArgument', 'gen', 'Invalid model schema. Expected root element "philos". Received: ' + model.wzElement, model))
    }
    try {
        md.philos(model, ctx, function(err, notUsed) {
            if (err) {
                return callback(err);
            }
            if (ctx.artifactGenerationErrors.length > 0) {
                return callback(err);
            }
            // generation OK
            else {
                return callback(null, ctx);
            }
        })
    } 
    catch (ex) {
        return callback(error('Exception', 'gen', 'An exception encountered during generation', model, ex));
    } 
}
;
md.genItems = function(items, ctx, options, callback) {
    var opt = options || {},
        from = opt.from || 0,
        indent = typeof opt.indent === 'undefined' ? true : opt.indent;
    if (indent) {
        ctx.indent();
    }
    var goitems = [];
    for (var i = from; i < items.length; i++) {
        goitems.push(items[i]);
    }
    async.mapSeries(goitems, md.mapItem(ctx), (err, notUsed) => {
    
        if (err) {
            return callback(err);
        }
        if (indent) {
            ctx.deindent();
        }
        process.nextTick(callback)
    }
    )
}
;
md.mapItem = function(ctx) {
    return function(model, callback) {
            return md.genItem(model, ctx, callback);
        };
}
;
md.genItem = function(model, ctx, callback) {
    var method = md[model.wzElement];
    if (method) {
        return method(model, ctx, callback);
    }
    else {
        return callback(error('ArtifactGenerationError', 'genItem', myname + '. Unknown tag/element: ' + model.wzTag + '/' + model.wzElement, model, null));
    }
}
;
md.philos = function(model, ctx, callback) {
    ctx.w('philos ' + model.wzName);
    md.genItems(model.items, ctx, {
        indent: false
     }, (err, notUsed) => {
    
        if (err) {
            return callback(err);
        }
        md.genItems(model.ittfPanels, ctx, {
            indent: false
         }, callback)
    }
    )
}
;
function prettifyIttf(mTreeData, callback) {
    var schema = mTreeData.schema;
    var title = mTreeData.title;
    var mTree = mTreeData.mTree;
    var item = mTreeData.ittf;
    var itemResult = {};
    if (item.children.length == 1) {
        
        // is already ok, has the correct root
        if ((schema === 'json' && (item.children[0].n === '{' || item.children[0].n === '[')) || item.children[0].n === ittfRootFromSchema(schema) || ittfRootFromSchema(schema) === 'any') {
            itemResult[item.n] = mTree.toIttf(item.children[0]);
            itemResult[item.n + 'Wrapped'] = itemResult[item.n];
        }
        // wrap it
        else {
            var ittfNode = wrapperForSchema(schema);
            var i, i_items=item.children, i_len=item.children.length, node;
            for (i=0; i<i_len; i++) {
                node = item.children[i];
                ittfNode.children.push(node)
            }
            itemResult[item.n] = mTree.toIttf(item.children[0]);
            itemResult[item.n + 'Wrapped'] = mTree.toIttf(ittfNode);
        }
    }
    // wrap them
    else {
        var ittfNode = wrapperForSchema(schema);
        var i, i_items=item.children, i_len=item.children.length, node;
        for (i=0; i<i_len; i++) {
            node = item.children[i];
            ittfNode.children.push(node)
        }
        itemResult[item.n] = mTree.toIttf(item.children[0]);
        itemResult[item.n + 'Wrapped'] = mTree.toIttf(ittfNode);
    }
    prettify(itemResult.ittf, function(err, pretty) {
        if (err) {
            return callback(err);
        }
        itemResult.ittfPretty = pretty;
        console.log('prettifyIttf', itemResult);
        return callback(null, itemResult);
    })
}
function wrapperForSchema(schema) {
    if (schema === 'js') {
        return {
                n: 'module', 
                children: [
                    {
                        n: 'kind', 
                        v: 'react', 
                        children: [
                            
                        ]
                     }
                ]
             };
    }
    else if (schema === 'ts') {
        return {
                n: 'module', 
                children: [
                    
                ]
             };
    }
    else {
        return {
                n: schema, 
                children: [
                    
                ]
             };
    }
}
var schemaIttfRootMap = {
    css: 'css', 
    graphql: 'graphql', 
    ittf: 'any', 
    html: 'html', 
    js: 'module', 
    json: '{', 
    md: 'vtt', 
    scss: 'scss', 
    svg: 'svg', 
    ts: 'module', 
    vtt: 'vtt'
 };
function ittfRootFromSchema(schema) {
    // log 'ittfRootFromSchema', schema, schemaIttfRootMap[schema]
    return schemaIttfRootMap[schema];
}
var schemaPrismLanguageMap = {
    css: 'css', 
    graphql: 'graphql', 
    ittf: 'any', 
    html: 'html', 
    js: 'javascript', 
    json: 'json', 
    md: 'vtt', 
    scss: 'scss', 
    svg: 'svg', 
    ts: 'typescript', 
    vtt: 'vtt'
 };
//
function error(errorName, method, message, model, innerError) {
    return new errors.WizziPluginError(message, model, {
            errorName: errorName, 
            method: 'philos/lib/artifacts/philos/document/gen/main.' + method, 
            sourcePath: __filename, 
            inner: innerError
         });
}
