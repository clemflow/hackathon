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
        res = {};
        for (const code of codesArray) {
            // console.log("tag = " + this.getFromBetween.get(code, "tag=\"","\"").split(",").toString());
            // console.log("desc = " + this.getFromBetween.get(code, "description=\"","\""));
            res.append({tag: this.getFromBetween.get(code, "tag=\"","\"").toString().split(","),
                description: this.getFromBetween.get(code, "description=\"","\""),
            author: authorName, code: this.getFromBetween.get(code, "$$", "$>") })
        }
        console.log(res);
    }
};


// <$ tag="paranthesis,c#,test" description="just a example." $$
function test() {
    let str = "hfsuhfus uifezf fzifz <'$' triger part '$'> effbhfbrfref <'$other triger part $'> be";
    var result = getFromBetween.get(str,"<$","$>");
    console.log(result);
}
// $>
