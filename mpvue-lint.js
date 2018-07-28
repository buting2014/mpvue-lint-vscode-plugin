const {window, commands, Disposable, ExtensionContext, StatusBarAlignment, StatusBarItem, TextDocument} = require('vscode');
function activate(context) {
    console.log(context)
    findAllComponents();
}
function findAllComponents (){
    // 获取当前文本中的所有import
    let editor = window.activeTextEditor;
    if(!editor){
        return;
    }
    this.getAllComponents = function(doc){
        let docContent = doc.getText();
        let componentsArray = [];
        docContent = docContent.match(/components\s*:\s*\{[^\}]+\}/g)[0];
        docContent = docContent.match(/\{[\s\S]+\}/g)[0];
        docContent = docContent.slice(1,docContent.length-1).replace(/\s+/g,'');
        componentsArray = docContent.split(',');
        return componentsArray;
    }
    let doc = editor.document;
    if(doc.languageId == "vue"){
        let components = this.getAllComponents(doc);
        console.log(components);
    }else {
        console.log('no vue');
    }
}
exports.activate = activate;
