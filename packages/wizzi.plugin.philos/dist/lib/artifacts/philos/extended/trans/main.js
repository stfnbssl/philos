/*
    artifact generator: C:\My\wizzi\stfnbssl\philos\node_modules\wizzi-js\lib\artifacts\js\module\gen\main.js
    primary source IttfDocument: C:\My\wizzi\stfnbssl\philos\packages\wizzi.plugin.philos\.wizzi\ittf\lib\artifacts\philos\extended\trans\main.js.ittf
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
        callback(error('InvalidArgument', 'gen', 'Invalid model schema. Expected "philos". Received: ' + model.wzElement, model));
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
            chapters: [
                
            ], 
            articles: [
                
            ], 
            webpages: [
                
            ], 
            thesis: [
                
            ], 
            current: {
                
            }
        };
        var i, i_items=model.items, i_len=model.items.length, item;
        for (i=0; i<i_len; i++) {
            item = model.items[i];
            doitem(item, resultObj);
        }
        delete resultObj.current
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
};
function doitem(parent, resultObj) {
    var f = functors[parent.wzElement];
    if (f) {
        f(parent, resultObj);
    }
}
var functors = {};
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
        else if (!fillContents(child, authorObj, resultObj)) {
        }
        else if (child.wzElement == "text") {
            authorObj.contents.push({
                line: child.wzName
            });
        }
        else if (['field', 'approach', 'theory', 'concept'].indexOf(child.wzElement) > -1) {
            var concept = getOrCreateConcept(resultObj, child.wzElement, child.wzName);
            if (concept) {
                fillConcept(child, resultObj, concept);
                concept.founders.push(parent.wzName);
                authorObj.foundations.push({
                    kind: child.wzElement, 
                    id: child.wzName
                });
            }
        }
        else {
            newitems.push(child);
        }
    }
    resultObj.authors.push(authorObj);
    var i, i_items=newitems, i_len=newitems.length, child;
    for (i=0; i<i_len; i++) {
        child = newitems[i];
        doitem(child, resultObj);
    }
};
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
            newitems.push(child);
        }
    }
    resultObj.authorsGroups.push(authorsGroupObj);
    var i, i_items=newitems, i_len=newitems.length, child;
    for (i=0; i<i_len; i++) {
        child = newitems[i];
        doitem(child, resultObj);
    }
};
functors.comment = function(parent, resultObj) {
    var commentObj = {
        author, 
        lines: [
            
        ]
    };
    var i, i_items=parent.items, i_len=parent.items.length, child;
    for (i=0; i<i_len; i++) {
        child = parent.items[i];
        if (!fillContents(child, commentObj, resultObj)) {
        }
    }
    return commentObj;
};
functors.concept = function(parent, resultObj) {
    var conceptObj = createConcept(parent.wzName, "concept");
    var newitems = fillConcept(parent, resultObj, conceptObj);
    resultObj.concepts.push(conceptObj);
    var i, i_items=newitems, i_len=newitems.length, child;
    for (i=0; i<i_len; i++) {
        child = newitems[i];
        doitem(child, resultObj);
    }
};
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
    conceptObj = createConcept(id, kind);
    if (kind == 'field') {
        resultObj.fields.push(conceptObj);
    }
    else if (kind == 'approach') {
        resultObj.approaches.push(conceptObj);
    }
    else if (kind == 'theory') {
        result.theories.push(conceptObj);
    }
    else if (kind == 'concept') {
        resultObj.concepts.push(conceptObj);
    }
    return conceptObj;
}
function createConcept(id, kind) {
    return {
            kind: kind, 
            id: id, 
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
            contents: [
                
            ]
        };
}
function clearConcept(conceptObj) {
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
            conceptObj.founders.push(child.wzName);
            addFounded(resultObj, child.wzName, conceptObj.kind, conceptObj.id);
        }
        else if (child.wzElement == "contributionto") {
            addContribution(child, conceptObj);
        }
        else if (child.wzElement == "relatedto") {
            addRelated(child, conceptObj);
        }
        else {
            newitems.push(child);
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
        });
        assertFieldObj(parent.wzName, currentObj.kind, resultObj);
    }
    else if (parent.wzElement == "exports") {
        if (!currentObj.exports) {
            currentObj.exports = [];
        }
        currentObj.exports.push({
            id: parent.wzName
        });
        assertFieldObj(parent.wzName, currentObj.kind, resultObj);
    }
    else {
        return true;
    }
}
function fillContents(parent, currentObj, resultObj) {
    if (!currentObj.contents) {
        console.log(currentObj.kind);
        console.log(currentObj.id);
        return ;
    }
    if (parent.wzElement == "text") {
        currentObj.contents.push({
            line: parent.wzName
        });
    }
    else if (parent.wzElement == 'quote') {
        currentObj.contents.push({
            quote: fillQuote(parent, currentObj, resultObj)
        });
    }
    else if (parent.wzElement == 'comment') {
        currentObj.contents.push({
            comment: parent.toJson()
        });
    }
    else {
        return true;
    }
}
function fillQuote(parent, currentObj, resultObj) {
    var quoteObj = {
        author: null, 
        lines: [
            
        ]
    };
    var i, i_items=parent.items, i_len=parent.items.length, child;
    for (i=0; i<i_len; i++) {
        child = parent.items[i];
        if (child.wzElement == 'text') {
            quoteObj.lines.push(child.wzName);
        }
        else if (child.wzElement == 'author') {
            quoteObj.author = child.wzName;
            var j, j_items=child.items, j_len=child.items.length, item;
            for (j=0; j<j_len; j++) {
                item = child.items[j];
                if (item.wzElement == 'text') {
                    quoteObj.lines.push(item.wzName);
                }
                else {
                    quoteObj.unknown = item.wzElement;
                }
            }
        }
        else if (child.wzElement == 'page') {
            quoteObj.page = child.wzName;
        }
        else if (child.wzElement == 'book') {
            quoteObj.book = child.wzName;
            functors.book(child, resultObj);
        }
        else if (child.wzElement == 'chapter') {
            quoteObj.chapter = child.wzName;
            functors.chapter(child, resultObj);
        }
        else if (child.wzElement == 'comment') {
            quoteObj.comment = functors.comment(child, resultObj);
        }
        else {
            quoteObj.unknown = child.wzElement;
        }
    }
    return quoteObj;
}
functors.field = function(parent, resultObj) {
    var fieldObj = createConcept(parent.wzName, "field");
    var newitems = fillConcept(parent, resultObj, fieldObj);
    resultObj.fields.push(fieldObj);
    var i, i_items=newitems, i_len=newitems.length, child;
    for (i=0; i<i_len; i++) {
        child = newitems[i];
        doitem(child, resultObj);
    }
};
function addFieldObj(fieldObj, resultObj) {
    var i, i_items=resultObj.fields, i_len=resultObj.fields.length, item;
    for (i=0; i<i_len; i++) {
        item = resultObj.fields[i];
        if (item.id == fieldObj.id) {
            // TODO merge???
            return ;
        }
    }
    resultObj.fields.push(fieldObj);
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
    resultObj[kind+'s'].push(fieldObj);
}
functors.approach = function(parent, resultObj) {
    var approachObj = createConcept(parent.wzName, "approach");
    var newitems = fillConcept(parent, resultObj, approachObj);
    resultObj.approaches.push(approachObj);
    var i, i_items=newitems, i_len=newitems.length, child;
    for (i=0; i<i_len; i++) {
        child = newitems[i];
        doitem(child, resultObj);
    }
};
functors.book = function(parent, resultObj) {
    var bookObj = {
        id: parent.wzName, 
        title: null, 
        authors: [
            
        ], 
        reviews: [
            
        ], 
        contents: [
            
        ]
    };
    var newitems = [];
    var i, i_items=parent.items, i_len=parent.items.length, child;
    for (i=0; i<i_len; i++) {
        child = parent.items[i];
        if (child.wzElement == "title") {
            bookObj.title = child.wzName;
        }
        else if (child.wzElement == "edition") {
            bookObj.edition = child.wzName;
        }
        else if (child.wzElement == "author") {
            bookObj.authors.push(child.wzName);
        }
        else if (!fillContents(child, bookObj)) {
        }
        else {
            newitems.push(child);
        }
    }
    resultObj.books.push(bookObj);
    var i, i_items=newitems, i_len=newitems.length, child;
    for (i=0; i<i_len; i++) {
        child = newitems[i];
        doitem(child, resultObj);
    }
    return bookObj;
};
functors.chapter = function(parent, resultObj) {
    var chapterObj = {
        id: parent.wzName, 
        title: null, 
        authors: [
            
        ], 
        reviews: [
            
        ], 
        contents: [
            
        ]
    };
    var newitems = [];
    var i, i_items=parent.items, i_len=parent.items.length, child;
    for (i=0; i<i_len; i++) {
        child = parent.items[i];
        if (child.wzElement == "title") {
            chapterObj.title = child.wzName;
        }
        else if (child.wzElement == "edition") {
            chapterObj.edition = child.wzName;
        }
        else if (child.wzElement == "author") {
            chapterObj.authors.push(child.wzName);
        }
        else if (child.wzElement == "book") {
            chapterObj.book = child.wzName;
            functors.book(child, resultObj);
        }
        else if (child.wzElement == 'page') {
            chapterObj.page = child.wzName;
        }
        else if (!fillContents(child, chapterObj)) {
        }
        else {
            newitems.push(child);
        }
    }
    resultObj.chapters.push(chapterObj);
    var i, i_items=newitems, i_len=newitems.length, child;
    for (i=0; i<i_len; i++) {
        child = newitems[i];
        doitem(child, resultObj);
    }
    return chapterObj;
};
/**
     params
     string errorName
     # the error name or number
     string method
     string message
     # optional
     { model
     # optional
     { innerError
     # optional
*/
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
                    contrib.opinions.push(child);
                }
            }
        }
        else if (item.wzElement == 'opinionof') {
            contrib.opinions.push(item.toJson());
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
                    related.opinions.push(child);
                }
            }
        }
        else if (item.wzElement == 'opinionof') {
            related.opinions.push(item.toJson());
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
            });
            return ;
        }
    }
}
