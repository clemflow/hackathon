let mongoManager = require("./mongoManager.js");

module.exports = {
     getFromBetween : {
        results:[],
        string:"",
        getFromBetween:function (sub1,sub2) {
            if(this.string.indexOf(sub1) < 0 || this.string.indexOf(sub2) < 0) return false;
            var SP = this.string.indexOf(sub1)+sub1.length;
            var string1 = this.string.substr(0,SP);
            var string2 = this.string.substr(SP);
            var TP = string1.length + string2.indexOf(sub2);
            return this.string.substring(SP,TP);
        },
        removeFromBetween:function (sub1,sub2) {
            if(this.string.indexOf(sub1) < 0 || this.string.indexOf(sub2) < 0) return false;
            var removal = sub1+this.getFromBetween(sub1,sub2)+sub2;
            this.string = this.string.replace(removal,"");
        },
        getAllResults:function (sub1,sub2) {
            if(this.string.indexOf(sub1) < 0 || this.string.indexOf(sub2) < 0) return;

            var result = this.getFromBetween(sub1,sub2);
            this.results.push(result);
            this.removeFromBetween(sub1,sub2);

            if(this.string.indexOf(sub1) > -1 && this.string.indexOf(sub2) > -1) {
                this.getAllResults(sub1,sub2);
            }
            else return;
        },
        get:function (string,sub1,sub2) {
            this.results = [];
            this.string = string;
            this.getAllResults(sub1,sub2);
            return this.results;
        }
    },
    getTags: function (codesArray, authorName) {
        // all = [];
        for (const code of codesArray) {
            // console.log("tag = " + this.getFromBetween.get(code, "tag=\"","\"").split(",").toString());
            // console.log("desc = " + this.getFromBetween.get(code, "description=\"","\""));
            let tmp = code.code + '*';
            console.log("code code : " + code.code );
            console.log("code 1 : " + code.lang );
            res = {tag: this.getFromBetween.get(code.code, "tag=\"","\"").toString().split(","),
                description: this.getFromBetween.get(code.code, "description=\"","\"")[0],
            author: authorName, code: this.getFromBetween.get(tmp, "$$", "*"),  type: "code", language: code.lang,
                date: new Date()};
            if (res.code.length > 0)
                mongoManager.saveCode(res);

            //all.push(res);
        }
        //console.log(all);
    }
};



// <$ tag="paranthesis,c#,test" description="just a example." $$
function test() {
    let str = "hfsuhfus uifezf fzifz <'$' triger part '$'> effbhfbrfref <'$other triger part $'> be";
    let result = getFromBetween.get(str,"<'$","$'>");
    console.log(result);
}
// $>
