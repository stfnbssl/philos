/*
    artifact generator: C:\My\wizzi\stfnbssl\wizzi\packages\wizzi-js\dist\lib\artifacts\js\module\gen\main.js
    package: wizzi-js@0.7.9
    primary source IttfDocument: C:\My\wizzi\stfnbssl\philos\packages\wizzi.plugin.philos\.wizzi\lib\artifacts\philos\extended\trans\main.js.ittf
*/
'use strict';
var util = require('util');
var async = require('async');
var verify = require('wizzi-utils').verify;
var lineparser = verify.lineParser;

var md = module.exports = {};
var myname = 'philos.philos..trans.main';

md.trans = function(model, ctx, callback) {
    var transformedModel = {};
    if (model.wzElement !== 'philos') {
        console.log('wizzi-core', 'transformer', 'model', model);
        callback(error('InvalidArgument', 'gen', 'Invalid model schema. Expected "philos". Received: ' + model.wzElement, model))
    }
    try {
        var resultObj = {
            authors: [
                
            ], 
            authorsGroups: [
                
            ], 
            fields: [
                
            ], 
            approaches: [
                
            ], 
            concepts: [
                
            ], 
            theories: [
                
            ], 
            books: [
                
            ], 
            articles: [
                
            ], 
            relations: [
                
            ], 
            current: {
                
             }
         };
        var i, i_items=model.items, i_len=model.items.length, item;
        for (i=0; i<i_len; i++) {
            item = model.items[i];
            doitem(item, resultObj)
        }
        delete resultObj.current
        delete resultObj.ns
        var i, i_items=resultObj.fields, i_len=resultObj.fields.length, obj;
        for (i=0; i<i_len; i++) {
            obj = resultObj.fields[i];
            clearConcept(obj);
        }
        var i, i_items=resultObj.approaches, i_len=resultObj.approaches.length, obj;
        for (i=0; i<i_len; i++) {
            obj = resultObj.approaches[i];
            clearConcept(obj);
        }
        var i, i_items=resultObj.theories, i_len=resultObj.theories.length, obj;
        for (i=0; i<i_len; i++) {
            obj = resultObj.theories[i];
            clearConcept(obj);
        }
        var i, i_items=resultObj.concepts, i_len=resultObj.concepts.length, obj;
        for (i=0; i<i_len; i++) {
            obj = resultObj.concepts[i];
            clearConcept(obj);
        }
        return callback(null, resultObj);
    } 
    catch (ex) {
        return callback(ex);
    } 
    callback(null, transformedModel);
}
;
function doitem(parent, resultObj) {
    var f = functors[parent.wzElement];
    if (f) {
        f(parent, resultObj)
    }
}
var functors = {};
functors.namespace = function(parent, resultObj) {
    resultObj.ns = parent.wzName;
    console.log('functors.namespace');
    var i, i_items=parent.items, i_len=parent.items.length, child;
    for (i=0; i<i_len; i++) {
        child = parent.items[i];
        if (child.wzElement == "author") {
            resultObj.ns_author = child.wzName;
        }
        else {
            doitem(child, resultObj)
        }
    }
    resultObj.ns = 'global';
    resultObj.ns_author = 'global';
}
;
functors.getQualified = function(ns, name) {
    return name.indexOf('.') > -1 ? name : (ns || 'global') + '.' + name;
}
;
functors.author = function(parent, resultObj) {
    var authorObj = {
        id: parent.wzName, 
        foundations: [
            
        ], 
        opinions: [
            
        ], 
        contents: [
            
        ]
     };
    var newitems = [];
    var i, i_items=parent.items, i_len=parent.items.length, child;
    for (i=0; i<i_len; i++) {
        child = parent.items[i];
        if (child.wzElement == "fullname") {
            authorObj.fullname = child.wzName;
        }
        else if (child.wzElement == "born") {
            authorObj.born = createEvent(child);
        }
        else if (child.wzElement == "died") {
            authorObj.died = createEvent(child);
        }
        else if (child.wzElement == "avatar") {
            authorObj.avatar = child.wzName;
        }
        else if (!fillContents(child, authorObj, resultObj)) {
        }
        else if (['field', 'approach', 'theory', 'concept'].indexOf(child.wzElement) > -1) {
            var concept = getOrCreateConcept(resultObj, child.wzElement, child.wzName);
            if (concept) {
                fillConcept(child, resultObj, concept);
                concept.founders.push(parent.wzName)
                authorObj.foundations.push({
                    kind: child.wzElement, 
                    id: child.wzName
                 })
            }
        }
        else {
            newitems.push(child)
        }
    }
    resultObj.authors.push(authorObj)
    var i, i_items=newitems, i_len=newitems.length, child;
    for (i=0; i<i_len; i++) {
        child = newitems[i];
        doitem(child, resultObj)
    }
}
;
functors.authorsgroup = function(parent, resultObj) {
    var authorsGroupObj = {
        id: parent.wzName
     };
    var newitems = [];
    var i, i_items=parent.items, i_len=parent.items.length, child;
    for (i=0; i<i_len; i++) {
        child = parent.items[i];
        if (child.wzElement == "fullname") {
            authorsGroupObj.fullname = child.wzName;
        }
        else if (child.wzElement == "born") {
        }
        else if (child.wzElement == "died") {
        }
        else {
            newitems.push(child)
        }
    }
    resultObj.authorsGroups.push(authorsGroupObj)
    var i, i_items=newitems, i_len=newitems.length, child;
    for (i=0; i<i_len; i++) {
        child = newitems[i];
        doitem(child, resultObj)
    }
}
;
functors.comment = function(parent, resultObj) {
    var commentObj = {
        contents: [
            
        ]
     };
    var i, i_items=parent.items, i_len=parent.items.length, child;
    for (i=0; i<i_len; i++) {
        child = parent.items[i];
        if (!fillContents(child, commentObj, resultObj)) {
        }
    }
    return commentObj;
}
;
functors.concept = function(parent, resultObj) {
    console.log('functors.concept');
    var conceptObj = createConcept(parent.wzName, resultObj, "concept");
    conceptObj.ns = resultObj.ns;
    // TODO (when wizzi-core is ok) set conceptObj.sourcePath = parent.wzSourceFilepath()
    conceptObj.sourcePath = parent.wzRoot().loadHistory.ittfDocumentDatas[parent.wzSourceLineInfo.sourceKey].ittfDocumentUri;
    var newitems = fillConcept(parent, resultObj, conceptObj);
    resultObj.concepts.push(conceptObj)
    var i, i_items=newitems, i_len=newitems.length, child;
    for (i=0; i<i_len; i++) {
        child = newitems[i];
        doitem(child, resultObj)
    }
}
;
function getConcept(resultObj, kind, id) {
    if (kind == 'field') {
        var i, i_items=resultObj.fields, i_len=resultObj.fields.length, item;
        for (i=0; i<i_len; i++) {
            item = resultObj.fields[i];
            if (item.id == id) {
                return item;
            }
        }
    }
    else if (kind == 'approach') {
        var i, i_items=resultObj.approaches, i_len=resultObj.approaches.length, item;
        for (i=0; i<i_len; i++) {
            item = resultObj.approaches[i];
            if (item.id == id) {
                return item;
            }
        }
    }
    else if (kind == 'theory') {
        var i, i_items=resultObj.theories, i_len=resultObj.theories.length, item;
        for (i=0; i<i_len; i++) {
            item = resultObj.theories[i];
            if (item.id == id) {
                return item;
            }
        }
    }
    else if (kind == 'concept') {
        var i, i_items=resultObj.concepts, i_len=resultObj.concepts.length, item;
        for (i=0; i<i_len; i++) {
            item = resultObj.concepts[i];
            if (item.id == id) {
                return item;
            }
        }
    }
    return null;
}
function getOrCreateConcept(resultObj, kind, id) {
    var conceptObj = getConcept(resultObj, kind, id);
    if (conceptObj) {
        return conceptObj;
    }
    conceptObj = createConcept(id, resultObj, kind)
    ;
    if (kind == 'field') {
        resultObj.fields.push(conceptObj)
    }
    else if (kind == 'approach') {
        resultObj.approaches.push(conceptObj)
    }
    else if (kind == 'theory') {
        result.theories.push(conceptObj)
    }
    else if (kind == 'concept') {
        resultObj.concepts.push(conceptObj)
    }
    return conceptObj;
}
function createConcept(name, resultObj, kind) {
    console.log('createConcept', resultObj.ns, (resultObj.ns || 'global'));
    return {
            kind: kind, 
            ns: (resultObj.ns || 'global'), 
            author: (resultObj.ns_author || 'global'), 
            name: name, 
            id: (resultObj.ns || 'global') + '.' + name, 
            aliases: [
                
            ], 
            founders: [
                
            ], 
            contributors: [
                
            ], 
            contributiontos: [
                
            ], 
            forerunnersof: [
                
            ], 
            relatedtos: [
                
            ], 
            periods: [
                
            ], 
            contents: [
                
            ]
         };
}
function clearConcept(conceptObj) {
    if (conceptObj.aliases.length == 0) {
        delete conceptObj.aliases
    }
    if (conceptObj.founders.length == 0) {
        delete conceptObj.founders
    }
    if (conceptObj.contributors.length == 0) {
        delete conceptObj.contributors
    }
    if (conceptObj.contributiontos.length == 0) {
        delete conceptObj.contributiontos
    }
    if (conceptObj.forerunnersof.length == 0) {
        delete conceptObj.forerunnersof
    }
    if (conceptObj.relatedtos.length == 0) {
        delete conceptObj.relatedtos
    }
    if (conceptObj.periods.length == 0) {
        delete conceptObj.periods
    }
    if (conceptObj.contents.length == 0) {
        delete conceptObj.contents
    }
}
function fillConcept(parent, resultObj, conceptObj) {
    var newitems = [];
    var i, i_items=parent.items, i_len=parent.items.length, child;
    for (i=0; i<i_len; i++) {
        child = parent.items[i];
        if (!fillContents(child, conceptObj, resultObj)) {
        }
        else if (!fillExtendsExports(child, conceptObj, resultObj)) {
        }
        else if (child.wzElement == "author") {
            conceptObj.founders.push(child.wzName)
            addFounded(resultObj, child.wzName, conceptObj.kind, conceptObj.id)
        }
        else if (child.wzElement == "title") {
            functors.title(child, conceptObj)
        }
        else if (child.wzElement == 'alias') {
            functors.alias(child, conceptObj)
        }
        else if (child.wzElement == 'period') {
            functors.period(child, conceptObj, resultObj)
        }
        else if (child.wzElement == "contributionto") {
            addContribution(child, conceptObj)
        }
        else if (child.wzElement == "relatedto") {
            addRelated(child, conceptObj)
        }
        else if (child.wzElement == "synonim") {
            conceptObj.synonim = child.wzName;
        }
        else {
            newitems.push(child)
        }
    }
    return newitems;
}
function fillExtendsExports(parent, currentObj, resultObj) {
    console.log(parent.wzElement, parent.wzElement == true);
    if (parent.wzElement == "xextends") {
        if (!currentObj.extends) {
            currentObj.extends = [];
        }
        currentObj.extends.push({
            id: parent.wzName
         })
        assertFieldObj(parent.wzName, currentObj.kind, resultObj)
    }
    else if (parent.wzElement == "exports") {
        if (!currentObj.exports) {
            currentObj.exports = [];
        }
        currentObj.exports.push({
            id: parent.wzName
         })
        assertFieldObj(parent.wzName, currentObj.kind, resultObj)
    }
    else {
        return true;
    }
}
functors.contents = function(node, parentObj, resultObj) {
    var i, i_items=node.items, i_len=node.items.length, child;
    for (i=0; i<i_len; i++) {
        child = node.items[i];
        
        // functors.contents is called when contents only are expected
        if (!fillContents(child, parentObj, resultObj)) {
        }
    }
}
;
function fillContents(node, currentObj, resultObj) {
    if (!currentObj.contents) {
        console.log('fillContents.currentObj.contents is null, kind, id', currentObj.kind, currentObj.id);
        return ;
    }
    if (node.wzElement == "text") {
        currentObj.contents.push({
            line: node.wzName
         })
    }
    else if (node.wzElement == 'img') {
        currentObj.contents.push({
            img: node.wzName
         })
    }
    else if (node.wzElement == 'quote') {
        currentObj.contents.push({
            quote: fillQuote(node, currentObj, resultObj)
         })
    }
    else if (node.wzElement == 'comment') {
        currentObj.contents.push({
            comment: functors.comment(node, resultObj)
         })
    }
    else if (node.wzElement == 'bax') {
        currentObj.contents.push({
            bax: functors.comment(node, resultObj)
         })
    }
    else if (node.wzElement == 'example') {
        currentObj.contents.push({
            example: functors.comment(node, resultObj)
         })
    }
    else if (node.wzElement == 'concept' && currentObj.kind == 'concept') {
        var savens = resultObj.ns;
        resultObj.ns = currentObj.id;
        functors.concept(node, resultObj)
        resultObj.ns = savens;
        currentObj.contents.push({
            concept: currentObj.id + '.' + node.wzName
         })
    }
    else if (node.wzElement == 'relatedconcept') {
        var rconceptObj = {
            kind: 'rconcept', 
            id: functors.getQualified(resultObj.ns, node.wzName), 
            contents: [
                
            ]
         };
        var i, i_items=node.items, i_len=node.items.length, child;
        for (i=0; i<i_len; i++) {
            child = node.items[i];
            if (!fillContents(child, rconceptObj, resultObj)) {
            }
            else {
            }
        }
        currentObj.contents.push(rconceptObj)
        resultObj.relations.push({
            kind: 'rconcept', 
            from: currentObj.id, 
            to: functors.getQualified(resultObj.ns, node.wzName)
         })
    }
    else if (node.wzElement == 'relatedarticle') {
        var rarticleObj = {
            kind: 'rarticle', 
            id: node.wzName, 
            contents: [
                
            ]
         };
        var i, i_items=node.items, i_len=node.items.length, child;
        for (i=0; i<i_len; i++) {
            child = node.items[i];
            if (!fillContents(child, rarticleObj, resultObj)) {
            }
            else {
            }
        }
        currentObj.contents.push(rarticleObj)
        resultObj.relations.push({
            kind: 'rarticle', 
            from: currentObj.id, 
            to: node.wzName
         })
    }
    else {
        return true;
    }
}
function fillQuote(node, currentObj, resultObj) {
    var quoteObj = {
        author: (resultObj.ns_author || 'global'), 
        lines: [
            
        ]
     };
    var i, i_items=node.items, i_len=node.items.length, child;
    for (i=0; i<i_len; i++) {
        child = node.items[i];
        if (functors.contentFields(child, quoteObj)) {
        }
        else if (child.wzElement == 'text') {
            quoteObj.lines.push(child.wzName)
        }
        else if (child.wzElement == 'img') {
            quoteObj.lines.push({
                img: child.wzName
             })
        }
        else if (child.wzElement == 'author') {
            quoteObj.author = child.wzName;
            var j, j_items=child.items, j_len=child.items.length, item;
            for (j=0; j<j_len; j++) {
                item = child.items[j];
                if (item.wzElement == 'text') {
                    quoteObj.lines.push(item.wzName)
                }
            }
        }
        else if (child.wzElement == 'book') {
            quoteObj.book = functors.getQualified(resultObj.ns, child.wzName);
            var j, j_items=child.items, j_len=child.items.length, item;
            for (j=0; j<j_len; j++) {
                item = child.items[j];
                if (functors.contentFields(item, quoteObj)) {
                }
            }
        }
        else if (child.wzElement == 'article') {
            quoteObj.article = functors.getQualified(resultObj.ns, child.wzName);
            var j, j_items=child.items, j_len=child.items.length, item;
            for (j=0; j<j_len; j++) {
                item = child.items[j];
                if (functors.contentFields(item, quoteObj)) {
                }
            }
        }
        else if (child.wzElement == 'comment') {
            quoteObj.lines.push({
                comment: functors.comment(child, resultObj)
             })
        }
        else if (child.wzElement == 'quote') {
            quoteObj.lines.push({
                quote: fillQuote(child, currentObj, resultObj)
             })
        }
        else if (child.wzElement == 'bax') {
            quoteObj.lines.push({
                bax: functors.comment(child, resultObj)
             })
        }
        else {
            quoteObj.unknown = child.wzElement + '/' + child.wzName;
        }
    }
    return quoteObj;
}
functors.period = function(field, parentObj, resultObj) {
    var periodObj = {
        title: field.wzName, 
        contents: [
            
        ]
     };
    functors.contents(field, periodObj, resultObj)
}
;
functors.contentFields = function(field, parentObj) {
    if (field.wzElement == 'page') {
        parentObj.page = field.wzName;
        return true;
    }
    else if (field.wzElement == 'eloc') {
        parentObj.eloc = field.wzName;
        return true;
    }
    else if (field.wzElement == 'epage') {
        parentObj.epage = field.wzName;
        return true;
    }
    else {
        return false;
    }
}
;
functors.field = function(parent, resultObj) {
    var fieldObj = createConcept(parent.wzName, "field");
    var newitems = fillConcept(parent, resultObj, fieldObj);
    resultObj.fields.push(fieldObj)
    var i, i_items=newitems, i_len=newitems.length, child;
    for (i=0; i<i_len; i++) {
        child = newitems[i];
        doitem(child, resultObj)
    }
}
;
function addFieldObj(fieldObj, resultObj) {
    var i, i_items=resultObj.fields, i_len=resultObj.fields.length, item;
    for (i=0; i<i_len; i++) {
        item = resultObj.fields[i];
        
        // TODO merge???
        if (item.id == fieldObj.id) {
            return ;
        }
    }
    resultObj.fields.push(fieldObj)
}
function assertFieldObj(fieldId, kind, resultObj) {
    var i, i_items=resultObj.fields, i_len=resultObj.fields.length, item;
    for (i=0; i<i_len; i++) {
        item = resultObj.fields[i];
        if (item.id == fieldId) {
            return ;
        }
    }
    var fieldObj = createConcept(fieldId, kind);
    fieldObj.placeholder = true;
    resultObj[kind+'s'].push(fieldObj)
}
functors.approach = function(parent, resultObj) {
    var approachObj = createConcept(parent.wzName, resultObj, "approach");
    var newitems = fillConcept(parent, resultObj, approachObj);
    resultObj.approaches.push(approachObj)
    var i, i_items=newitems, i_len=newitems.length, child;
    for (i=0; i<i_len; i++) {
        child = newitems[i];
        doitem(child, resultObj)
    }
}
;
functors.theory = function(parent, resultObj) {
    var theoryObj = createConcept(parent.wzName, resultObj, "theory");
    var newitems = fillConcept(parent, resultObj, theoryObj);
    resultObj.theories.push(theoryObj)
    var i, i_items=newitems, i_len=newitems.length, child;
    for (i=0; i<i_len; i++) {
        child = newitems[i];
        doitem(child, resultObj)
    }
}
;
functors.book = function(parent, resultObj) {
    var bookObj = {
        id: (resultObj.ns || 'global') + '.' + parent.wzName, 
        title: null, 
        authors: [
            
        ], 
        editions: [
            
        ], 
        translations: [
            
        ], 
        reviews: [
            
        ], 
        buys: [
            
        ], 
        contents: [
            
        ]
     };
    if (resultObj.ns_author) {
        bookObj.authors.push(resultObj.ns_author)
    }
    var newitems = [];
    var i, i_items=parent.items, i_len=parent.items.length, child;
    for (i=0; i<i_len; i++) {
        child = parent.items[i];
        if (functors.writingfields(child, bookObj)) {
        }
        else if (child.wzElement == "datepub") {
            bookObj.datepub = child.wzName;
        }
        else if (child.wzElement == "written") {
            bookObj.written = child.wzName;
        }
        else if (child.wzElement == "index") {
            bookObj.index = [];
            var j, j_items=child.items, j_len=child.items.length, c2;
            for (j=0; j<j_len; j++) {
                c2 = child.items[j];
                if (c2.wzElement == "text") {
                    bookObj.index.push(c2.wzName)
                }
            }
        }
        else if (child.wzElement == "backcover") {
            var backcoverObj = {
                contents: [
                    
                ]
             };
            var j, j_items=child.items, j_len=child.items.length, c2;
            for (j=0; j<j_len; j++) {
                c2 = child.items[j];
                fillContents(c2, backcoverObj, resultObj);
            }
            bookObj.backcover = backcoverObj;
        }
        else if (child.wzElement == "source") {
            functors.source(child, bookObj)
        }
        else if (child.wzElement == "textabstract") {
            functors.abstract(child, bookObj, resultObj)
        }
        else if (child.wzElement == "ereader") {
            bookObj.ereader = child.wzName;
        }
        else if (child.wzElement == "buy") {
            bookObj.buys.push({
                seller: child.seller, 
                url: child.url
             })
        }
        else if (!fillContents(child, bookObj, resultObj)) {
        }
        else {
            newitems.push(child)
        }
    }
    functors.clearWritings(bookObj)
    resultObj.books.push(bookObj)
    var i, i_items=newitems, i_len=newitems.length, child;
    for (i=0; i<i_len; i++) {
        child = newitems[i];
        doitem(child, resultObj)
    }
    return bookObj;
}
;
functors.article = function(parent, resultObj) {
    var articleObj = {
        id: (resultObj.ns || 'global') + '.' + parent.wzName, 
        title: null, 
        authors: [
            
        ], 
        editions: [
            
        ], 
        translations: [
            
        ], 
        reviews: [
            
        ], 
        contents: [
            
        ]
     };
    if (resultObj.ns_author) {
        articleObj.authors.push(resultObj.ns_author)
    }
    var newitems = [];
    var i, i_items=parent.items, i_len=parent.items.length, child;
    for (i=0; i<i_len; i++) {
        child = parent.items[i];
        if (functors.writingfields(child, articleObj)) {
        }
        else if (child.wzElement == "datepub") {
            articleObj.datepub = child.wzName;
        }
        else if (child.wzElement == "url") {
            articleObj.url = child.wzName;
        }
        else if (child.wzElement == "book") {
            articleObj.book = child.wzName;
        }
        else if (child.wzElement == "source") {
            functors.source(child, bookObj)
        }
        else if (child.wzElement == "textabstract") {
            functors.abstract(child, articleObj, resultObj)
        }
        else if (!fillContents(child, articleObj, resultObj)) {
        }
        else {
            newitems.push(child)
        }
    }
    resultObj.articles.push(articleObj)
    var i, i_items=newitems, i_len=newitems.length, child;
    for (i=0; i<i_len; i++) {
        child = newitems[i];
        doitem(child, resultObj)
    }
    functors.clearWritings(articleObj)
    return articleObj;
}
;
functors.abstract = function(field, parentObj, resultObj) {
    var abstractObj = {
        contents: [
            
        ]
     };
    var i, i_items=field.items, i_len=field.items.length, child;
    for (i=0; i<i_len; i++) {
        child = field.items[i];
        if (child.wzElement == "epage") {
            abstractObj.epage = child.wzName;
        }
        else if (child.wzElement == "eloc") {
            abstractObj.eloc = child.wzName;
        }
        else if (!fillContents(child, abstractObj, resultObj)) {
        }
        else {
        }
    }
    parentObj.abstract = abstractObj;
}
;
functors.source = function(parent, resultObj) {
    var sourceObj = {
        id: parent.wzName, 
        contents: [
            
        ]
     };
    var i, i_items=parent.items, i_len=parent.items.length, child;
    for (i=0; i<i_len; i++) {
        child = parent.items[i];
        if (child.wzElement == "title") {
            sourceObj.title = child.wzName;
        }
        else if (child.wzElement == "url") {
            sourceObj.url = child.wzName;
        }
    }
    resultObj.source = sourceObj;
}
;
functors.title = function(field, parentObj) {
    var titleObj = {
        text: null, 
        langs: [
            
        ]
     };
    titleObj.text = field.wzName;
    var i, i_items=field.items, i_len=field.items.length, child;
    for (i=0; i<i_len; i++) {
        child = field.items[i];
        functors.language(child, titleObj)
    }
    if (titleObj.langs.length == 0) {
        delete titleObj.langs
    }
    parentObj.title = titleObj;
}
;
functors.alias = function(field, parentObj) {
    if (!parentObj || !parentObj.aliases) {
        console.log('wrong alias position', field.wzName);
        return ;
    }
    var aliasObj = {
        text: null, 
        langs: [
            
        ]
     };
    aliasObj.text = field.wzName;
    var i, i_items=field.items, i_len=field.items.length, child;
    for (i=0; i<i_len; i++) {
        child = field.items[i];
        functors.language(child, aliasObj)
    }
    if (aliasObj.langs.length == 0) {
        delete aliasObj.langs
    }
    parentObj.aliases.push(aliasObj)
}
;
functors.language = function(field, parentObj) {
    if (['en','de','fr','sp'].indexOf(field.wzElement) > -1) {
        var langObj = {
            lang: field.wzElement, 
            text: field.wzName
         };
        var i, i_items=field.items, i_len=field.items.length, child;
        for (i=0; i<i_len; i++) {
            child = field.items[i];
            if (child.wzElement == 'it') {
                langObj.it = child.wzName;
            }
        }
        parentObj.langs.push(langObj)
    }
}
;
functors.edition = function(field, parentObj) {
    var edition = {
        name: field.wzName
     };
    var i, i_items=field.items, i_len=field.items.length, child;
    for (i=0; i<i_len; i++) {
        child = field.items[i];
        if (functors.writingfields(child, edition)) {
        }
    }
    return edition;
}
;
functors.translation = function(field, parentObj) {
    var translation = {
        language: field.wzName, 
        editions: [
            
        ]
     };
    var i, i_items=field.items, i_len=field.items.length, child;
    for (i=0; i<i_len; i++) {
        child = field.items[i];
        if (functors.writingfields(child, translation)) {
        }
    }
    return translation;
}
;
functors.writingfields = function(field, parentObj) {
    if (field.wzElement == 'date') {
        parentObj.date = field.wzName;
        return true;
    }
    else if (field.wzElement == 'prefator') {
        parentObj.prefator = field.wzName;
        return true;
    }
    else if (field.wzElement == 'curator') {
        parentObj.curator = field.wzName;
        return true;
    }
    else if (field.wzElement == 'page') {
        parentObj.page = field.wzName;
        return true;
    }
    else if (field.wzElement == 'e-page') {
        parentObj.epage = field.wzName;
        return true;
    }
    else if (field.wzElement == 'e-loc') {
        parentObj.eloc = field.wzName;
        return true;
    }
    else if (field.wzElement == 'in') {
        parentObj.in = field.wzName;
        return true;
    }
    else if (field.wzElement == "author") {
        parentObj.authors.push(field.wzName);
        return true;
    }
    else if (field.wzElement == "title") {
        functors.title(field, parentObj)
        return true;
    }
    else if (field.wzElement == 'edition') {
        parentObj.editions.push(functors.edition(field, parentObj))
    }
    else if (field.wzElement == 'translation') {
        parentObj.translations.push(functors.translation(field, parentObj))
    }
    else {
        return false;
    }
}
;
functors.clearWritings = function(parentObj) {
    if (parentObj.reviews && parentObj.reviews.length == 0) {
        delete parentObj.reviews
    }
    if (parentObj.contents && parentObj.contents.length == 0) {
        delete parentObj.contents
    }
    if (parentObj.buys && parentObj.buys.length == 0) {
        delete parentObj.buys
    }
    if (parentObj.editions && parentObj.editions.length == 0) {
        delete parentObj.editions
    }
    if (parentObj.translations && parentObj.translations.length == 0) {
        delete parentObj.translations
    }
}
;
//
function error(errorName, method, message, model, innerError) {
    return new errors.WizziPluginError(message, model, {
            errorName: errorName, 
            method: 'philos/lib/artifacts/philos/extended/trans/main.' + method, 
            sourcePath: __filename, 
            inner: innerError
         });
}
function createEvent(parent) {
    var eventObj = {};
    var i, i_items=parent.items, i_len=parent.items.length, item;
    for (i=0; i<i_len; i++) {
        item = parent.items[i];
        if (item.wzElement == "date") {
            eventObj.date = item.wzName;
        }
        else if (item.wzElement == "place") {
            eventObj.place = item.wzName;
        }
    }
    return eventObj;
}
function addContribution(parent, fromObj, resultObj) {
    var contrib = {} = {
        kind: null, 
        id: null, 
        opinions: [
            
        ], 
        contents: [
            
        ]
     };
    var i, i_items=parent.items, i_len=parent.items.length, item;
    for (i=0; i<i_len; i++) {
        item = parent.items[i];
        if (['field', 'approach', 'theory', 'concept'].indexOf(item.wzElement) > -1) {
            contrib.kind = item.wzElement;
            contrib.id = item.wzName;
            var j, j_items=item.items, j_len=item.items.length, child;
            for (j=0; j<j_len; j++) {
                child = item.items[j];
                if (!fillContents(child, contrib, resultObj)) {
                }
                else if (child.wzElement == 'opinionof') {
                    contrib.opinions.push(child)
                }
            }
        }
        else if (item.wzElement == 'opinionof') {
            contrib.opinions.push(item.toJson())
        }
    }
    fromObj.contributionsto.push(contrib);
}
function addRelated(parent, fromObj, resultObj) {
    var related = {} = {
        kind: null, 
        id: null, 
        opinions: [
            
        ], 
        contents: [
            
        ]
     };
    var i, i_items=parent.items, i_len=parent.items.length, item;
    for (i=0; i<i_len; i++) {
        item = parent.items[i];
        if (['field', 'approach', 'theory', 'concept'].indexOf(item.wzElement) > -1) {
            related.kind = item.wzElement;
            related.id = item.wzName;
            var j, j_items=item.items, j_len=item.items.length, child;
            for (j=0; j<j_len; j++) {
                child = item.items[j];
                if (!fillContents(child, related, resultObj)) {
                }
                else if (child.wzElement == 'opinionof') {
                    related.opinions.push(child)
                }
            }
        }
        else if (item.wzElement == 'opinionof') {
            related.opinions.push(item.toJson())
        }
    }
    fromObj.relatedsto.push(related);
}
function addFounded(resultObj, authorId, kind, id) {
    var i, i_items=resultObj.authors, i_len=resultObj.authors.length, item;
    for (i=0; i<i_len; i++) {
        item = resultObj.authors[i];
        if (item.id == authorId) {
            var j, j_items=item.foundations, j_len=item.foundations.length, found;
            for (j=0; j<j_len; j++) {
                found = item.foundations[j];
                if (found.kind == kind && found.id == id) {
                    return ;
                }
            }
            if (!item.foundations) {
                item.foundations = [];
            }
            item.foundations.push({
                kind: kind, 
                id: id
             })
            return ;
        }
    }
}
