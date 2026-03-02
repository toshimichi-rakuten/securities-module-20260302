var foreign_date = "2022/1/17";

var SearchString = "(.+?)\/(.+?)\/(.+)";
var RegularExp = new RegExp(SearchString,"g");
var ReplaceString = "$1年$2月$3日";
var foreign_date_top = foreign_date.replace(RegularExp , ReplaceString);

//米国銘柄
var us_num = "4,579";

//米国ADR銘柄
var usadr_num = "320";

//米国ETF銘柄
var usetf_num = 355;

//中国ETF銘柄
var chinaetf_num = 22;

//シンガポールETF銘柄
var aseanetf_num = 13;

//【概算】米国株式取扱銘柄
var ab_us_num = "4,600";

//【概算】中国株式銘柄
var ab_china_num = "920";

//【概算】ASEAN株式銘柄
var ab_asean_num = "250";

//ASEAN株式銘柄
var asean_num = "266";

//海外ETF銘柄
var etf_num = usetf_num + chinaetf_num + aseanetf_num ;
