/*
    artifact generator: C:\My\wizzi\stfnbssl\wizzi\packages\wizzi-js\dist\lib\artifacts\js\module\gen\main.js
    package: wizzi-js@0.7.9
    primary source IttfDocument: C:\My\wizzi\stfnbssl\philos\packages\wizzi.plugin.philos\.wizzi\lib\wizzi\models\philos-mtree-preprocessor.g.js.ittf
*/
'use strict';
module.exports = function(mTree, context) {
    var state = {
        mTree: mTree, 
        parent: null
     };
    var i, i_items=mTree.nodes[0].children, i_len=mTree.nodes[0].children.length, item;
    for (i=0; i<i_len; i++) {
        item = mTree.nodes[0].children[i];
        traverse(item, state);
    }
    return mTree;
}
;
function traverse(node, state) {
    if (preprocessNode(node, state)) {
        return ;
    }
    var saveParent = state.parent;
    var i, i_items=node.children, i_len=node.children.length, item;
    for (i=0; i<i_len; i++) {
        item = node.children[i];
        traverse(item, state);
    }
    state.parent = saveParent;
}
function preprocessNode(node, state) {
    if (node.n === 'ittf-panel') {
        node.wzMTreeData = {
            mTree: state.mTree
         };
        var i, i_items=node.children, i_len=node.children.length, item;
        for (i=0; i<i_len; i++) {
            item = node.children[i];
            if (item.n === 'ittf') {
                node.wzMTreeData[item.n] = item;
            }
            else {
                node.wzMTreeData[item.n] = item.v;
            }
        }
        node.children = [];
    }
    else {
        return false;
    }
}
function childNameIsOneOf(node, names) {
    var i, i_items=node.children, i_len=node.children.length, child;
    for (i=0; i<i_len; i++) {
        child = node.children[i];
        var j, j_items=names, j_len=names.length, name;
        for (j=0; j<j_len; j++) {
            name = names[j];
            if (child.n === name) {
                return true;
            }
        }
    }
    return false;
}
function descendentNameIsOneOf(node, names) {
    var found;
    var i, i_items=node.children, i_len=node.children.length, child;
    for (i=0; i<i_len; i++) {
        child = node.children[i];
        var j, j_items=names, j_len=names.length, name;
        for (j=0; j<j_len; j++) {
            name = names[j];
            if (child.n == name) {
                return true;
            }
        }
        found = descendentNameIsOneOf(child, names)
        ;
        if (found) {
            return true;
        }
    }
    return false;
}
function extractRemove(node, n) {
    var ret;
    var children = node.children;
    node.children = [];
    var i, i_items=children, i_len=children.length, item;
    for (i=0; i<i_len; i++) {
        item = children[i];
        if (item.n === n) {
        }
        else {
            node.children.push(item)
        }
    }
}
function wrapChilds(node, newN) {
    // log 'wrapChild', node.children
    copyNodeAttrsDeep(node, newN)
    var children = node.children;
    newN.parent = node.parent;
    node.children = [ newN ];
    var i, i_items=children, i_len=children.length, item;
    for (i=0; i<i_len; i++) {
        item = children[i];
        newN.children.push(item)
    }
}
function copyNodeAttrsDeep(nfrom, nto) {
    copyNodeAttrs(nfrom, nto)
    var i, i_items=nto.children, i_len=nto.children.length, item;
    for (i=0; i<i_len; i++) {
        item = nto.children[i];
        copyNodeAttrsDeep(nfrom, item)
    }
}
function copyNodeAttrs(nfrom, nto) {
    nto.r = nfrom.r;
    nto.c = nfrom.c;
    nto.s = nfrom.s;
    nto.u = nfrom.u;
    if (typeof nto.children === 'undefined') {
        nto.children = [];
    }
}
