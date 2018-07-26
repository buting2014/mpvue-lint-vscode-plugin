const {window, commands, Disposable, ExtensionContext, StatusBarAlignment, StatusBarItem, TextDocument} = require('vscode');
function activate(context) {
    console.log(context)
    findAllImport();
}
function findAllImport (){
    // 获取当前文本中的所有import
    let editor = window.activeTextEditor;
    if(!editor){
        return;
    }
    this.getWordCount = function(doc){
        let docContent = doc.getText();
        console.log(docContent);
        // docContent = docContent.replace(/(< ([^>]+)<)/g, '').replace(/\s+/g, ' ');
        // docContent = docContent.replace(/^\s\s*/, '').replace(/\s\s*$/, '');
        // if(docContent !== ''){
        //     wordCount = docContent.split(" ").length;
        // }
        // return wordCount;
    }
    let doc = editor.document;
    if(doc.languageId == "javascript"){
        this.getWordCount(doc);
    }else {
        console.log('no vue');
    }
}
exports.activate = activate;
